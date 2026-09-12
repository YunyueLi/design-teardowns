import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { planChanges, pullRequestPaths, reusableRun, findValidatedPullRequest } from './scope.mjs';

const quiet = { catalogue: false, browser: false, publish: false };
const tests = { catalogue: true, browser: true, publish: false };
const full = { catalogue: true, browser: true, publish: true };
for (const [name, paths, expected] of [
  ['workflow-only', ['.github/workflows/pages.yml'], quiet],
  ['policy and engineering docs', ['tools/ci/scope.mjs', 'tools/ci/package-lock.json', 'CONTRIBUTING.md', '.gitignore'], quiet],
  ['browser dependency change', ['tools/browser/package-lock.json'], tests],
  ['browser test', ['tools/check-beamline.mjs'], tests],
  ['generator change', ['tools/build-gallery-featured.mjs'], tests],
  ['homepage', ['teardowns/index.html'], full],
  ['runtime', ['teardowns/_gallery/beamline.js'], full],
  ['catalogue', ['teardowns/_gallery/catalogue.js'], full],
  ['published Markdown', ['teardowns/pear/出处与方法.md'], full],
  ['legal notice', ['NOTICE'], full],
  ['downloadable skill', ['skills/design-teardown/SKILL.md'], full],
  ['new unknown directory', ['new-site/index.html'], full],
  ['mixed changes', ['README.md', 'teardowns/index.html'], full],
]) test(name, () => assert.deepEqual(planChanges(paths), expected));
test('manual or incomplete diff keeps full coverage', () => assert.deepEqual(planChanges([], { forceFull: true }), full));
test('malformed paths fail instead of silently skipping tests', () => {
  for (const path of ['', null, '/README.md', 'a/../README.md', 'a\\README.md']) assert.throws(() => planChanges([path]));
});
test('pagination discovers a website change beyond file 300', async () => {
  const files = Array.from({ length: 401 }, () => ({ filename: 'README.md' }));
  files[400] = { filename: 'teardowns/index.html' };
  const paths = await pullRequestPaths({ changedFiles: files.length, getPage: async page => files.slice((page - 1) * 100, page * 100) });
  assert.deepEqual(planChanges(paths), full);
});
test('renaming a site file into docs still republishes its deletion', async () => {
  const paths = await pullRequestPaths({ changedFiles: 1, getPage: async () => [{ filename: 'README.md', previous_filename: 'index.html' }] });
  assert.deepEqual(planChanges(paths), full);
});
test('incomplete and capped lists request full validation', async () => {
  assert.equal(await pullRequestPaths({ changedFiles: 3001 }), null);
  assert.equal(await pullRequestPaths({ changedFiles: undefined }), null);
  assert.equal(await pullRequestPaths({ changedFiles: 2, getPage: async () => [] }), null);
});
test('API errors never yield an empty successful diff', async () => {
  await assert.rejects(pullRequestPaths({ changedFiles: 1, getPage: async () => { throw new Error('HTTP 403'); } }), /403/);
});

const head = 'a'.repeat(40), tree = 'b'.repeat(40), after = 'c'.repeat(40), repo = 'fixture/gallery';
const proof = () => ({
  head, tree, repo,
  run: { id: 123, event: 'pull_request', status: 'completed', conclusion: 'success', head_sha: head,
    head_commit: { tree_id: tree }, repository: { full_name: repo }, path: '.github/workflows/validate.yml' },
  jobs: [{ name: 'all-checks', conclusion: 'success', steps: ['Validate catalogue and maintenance', 'Check browser interactions']
    .map(name => ({ name, status: 'completed', conclusion: 'success' })) }],
});
test('reuse an identical tree with both suites actually executed', () => assert.equal(reusableRun(proof()), true));
for (const [name, change] of [
  ['different tree', x => x.run.head_commit.tree_id = 'd'.repeat(40)],
  ['different revision', x => x.run.head_sha = after],
  ['different repository', x => x.run.repository.full_name = 'other/gallery'],
  ['wrong workflow', x => x.run.path = '.github/workflows/other.yml'],
  ['manual run', x => x.run.event = 'workflow_dispatch'],
  ['running', x => x.run.status = 'in_progress'],
  ['failed', x => x.run.conclusion = 'failure'],
  ['cancelled', x => x.jobs[0].conclusion = 'cancelled'],
  ['config-only success', x => x.jobs[0].steps[1].conclusion = 'skipped'],
  ['missing catalogue check', x => x.jobs[0].steps.shift()],
]) test(`reject ${name} as reusable evidence`, () => {
  const value = proof(); change(value); assert.equal(reusableRun(value), false);
});
test('only reuse a merged same-repository PR associated with this main commit', async () => {
  const value = proof(), calls = [];
  const api = async path => {
    calls.push(path);
    if (path.startsWith('/commits/')) return [
      { merged_at: '2026-09-12', merge_commit_sha: after, base: { ref: 'main', repo: { full_name: repo } }, head: { sha: head, repo: { full_name: repo } } },
    ];
    if (path.startsWith('/actions/workflows/')) return { workflow_runs: [value.run] };
    return { jobs: value.jobs };
  };
  assert.equal(await findValidatedPullRequest({ api, repo, after, tree }), 123);
  assert.equal(calls.length, 3);
});
test('direct pushes and unproven forks fall back to validation', async () => {
  assert.equal(await findValidatedPullRequest({ api: async () => [], repo, after, tree }), null);
  assert.equal(await findValidatedPullRequest({ api: async () => [{ merged_at: 'today', merge_commit_sha: after,
    base: { ref: 'main', repo: { full_name: repo } }, head: { sha: head, repo: { full_name: 'other/repo' } } }], repo, after, tree }), null);
});
test('real multi-commit push detects renamed test inputs before the final docs commit', () => {
  const dir = mkdtempSync(join(tmpdir(), 'design-ci-policy-'));
  const git = (...args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8', stdio: 'pipe' }).trim();
  try {
    git('init', '-q'); git('config', 'user.name', 'CI fixture'); git('config', 'user.email', 'fixture@example.com');
    git('config', 'commit.gpgsign', 'false');
    mkdirSync(join(dir, 'tools/browser'), { recursive: true });
    writeFileSync(join(dir, 'tools/browser/package-lock.json'), '{}'); git('add', '.'); git('commit', '-qm', 'base');
    const before = git('rev-parse', 'HEAD');
    git('mv', 'tools/browser/package-lock.json', 'README.md'); git('commit', '-qm', 'rename test dependency');
    writeFileSync(join(dir, 'CONTRIBUTING.md'), '# documentation'); git('add', '.'); git('commit', '-qm', 'docs');
    const last = git('rev-parse', 'HEAD'); git('remote', 'add', 'origin', dir);
    const event = join(dir, 'event.json'), output = join(dir, 'output');
    writeFileSync(event, JSON.stringify({ before, after: last })); writeFileSync(output, '');
    execFileSync(process.execPath, [fileURLToPath(new URL('./plan.mjs', import.meta.url))], {
      cwd: dir, env: { ...process.env, GH_TOKEN: '', GITHUB_REPOSITORY: repo, GITHUB_EVENT_NAME: 'push',
        GITHUB_EVENT_PATH: event, GITHUB_OUTPUT: output, GITHUB_STEP_SUMMARY: '' }, stdio: 'pipe',
    });
    assert.match(readFileSync(output, 'utf8'), /browser=true/);
    assert.match(readFileSync(output, 'utf8'), /publish=false/);
    assert.match(readFileSync(output, 'utf8'), /reused=false/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
