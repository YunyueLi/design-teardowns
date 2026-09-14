import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
const load = file => parse(readFileSync(new URL(`../../${file}`, import.meta.url), 'utf8'));
const validate = load('.github/workflows/validate.yml');
const pages = load('.github/workflows/pages.yml');
const steps = validate.jobs.gallery.steps;

test('one stable check, no matrix or top-level path filters', () => {
  assert.deepEqual(Object.keys(validate.jobs), ['gallery']);
  assert.equal(validate.jobs.gallery.name, 'all-checks');
  assert.ok(!validate.jobs.gallery.strategy);
  assert.ok(!validate.on.pull_request.paths && !validate.on.pull_request['paths-ignore']);
  assert.ok(validate.on.pull_request.types.includes('ready_for_review'));
  assert.match(validate.jobs.gallery.if, /draft == false/);
});
test('policy is checked before classification or browser dependencies', () => {
  const policy = steps.findIndex(step => step.name === 'Validate workflow policy');
  const scope = steps.findIndex(step => step.id === 'scope');
  const browser = steps.findIndex(step => step.name === 'Install isolated browser test dependencies');
  assert.ok(policy < scope && scope < browser);
  assert.match(steps[policy].run, /npm test --prefix tools\/ci/);
  assert.match(steps[policy].run, /lint-workflows\.sh/);
});
test('catalogue and maintenance commands each execute once', () => {
  for (const command of ['node tools/build-gallery-featured.mjs --check', 'node tools/check-gallery.mjs',
    'node tools/test-gallery-maintenance.mjs', 'python3 tools/generate_index.py --check']) {
    const matches = steps.filter(step => step.run?.includes(command));
    assert.equal(matches.length, 1);
    assert.equal(matches[0].if, "steps.scope.outputs.catalogue == 'true' && steps.scope.outputs.reused != 'true'");
    assert.ok(!matches[0]['continue-on-error']);
  }
});
test('one browser install and all cases, without a test filter', () => {
  const install = steps.find(step => step.name === 'Install isolated browser test dependencies');
  const browser = steps.find(step => step.name === 'Check browser interactions');
  assert.match(install.run, /npm ci --ignore-scripts --prefix tools\/browser/);
  assert.equal(browser.env.BEAMLINE_SHARD, '1/1');
  assert.ok(!browser.env.BEAMLINE_TEST_FILTER);
  assert.equal(browser.run.trim().split('\n').at(-1), 'node tools/check-beamline.mjs');
  for (const step of [install, browser]) {
    assert.equal(step.if, "steps.scope.outputs.browser == 'true' && steps.scope.outputs.reused != 'true'");
    assert.ok(!step['continue-on-error']);
  }
});
test('only JSON results are retained on success; complete evidence is failure-only', () => {
  const result = steps.find(step => step.name === 'Save lightweight acceptance results');
  assert.equal(result.with.path, 'artifacts/ci/**/*.json');
  assert.equal(result.with['retention-days'], 3);
  assert.equal(result.if, '${{ !cancelled() }}');
  const failure = steps.find(step => step.name === 'Save failure diagnostics');
  assert.equal(failure.if, '${{ failure() && !cancelled() }}');
  assert.equal(failure.with['retention-days'], 1);
});
test('site deployment requires successful reusable validation and published changes', () => {
  assert.equal(pages.jobs.validate.uses, './.github/workflows/validate.yml');
  assert.equal(pages.jobs.deploy.needs, 'validate');
  assert.equal(pages.jobs.deploy.if, "needs.validate.outputs.publish == 'true'");
  assert.equal(validate.on.workflow_call.outputs.publish.value, '${{ jobs.gallery.outputs.publish }}');
  assert.equal(validate.jobs.gallery.outputs.publish, '${{ steps.scope.outputs.publish }}');
});
test('config pushes cannot cancel product validation or publication', () => {
  assert.ok(!pages.concurrency);
  assert.match(validate.jobs.gallery.concurrency.group, /github\.event\.pull_request\.number \|\| github\.run_id/);
  assert.equal(pages.jobs.deploy.concurrency.group, 'pages');
  assert.equal(pages.jobs.deploy.concurrency['cancel-in-progress'], false);
});
test('test permissions remain read-only even when called by publishing workflow', () => {
  assert.deepEqual(validate.permissions, { contents: 'read', 'pull-requests': 'read', actions: 'read' });
  assert.equal(pages.permissions.actions, 'read');
  assert.equal(pages.permissions['pull-requests'], 'read');
  assert.ok(validate.jobs.gallery['timeout-minutes'] <= 15);
  assert.ok(pages.jobs.deploy['timeout-minutes'] <= 10);
});

test('PR checks execute the exact head tree used by the reuse proof', () => {
  assert.equal(steps[0].with.ref, '${{ github.event.pull_request.head.sha || github.sha }}');
});

test('acceptance runs against the exact publication directory', () => {
  const build = steps.findIndex(step => step.name === 'Build publication directory');
  const browser = steps.findIndex(step => step.name === 'Check browser interactions');
  assert.ok(build < browser);
  assert.match(steps[build].run, /tools\/pages\/package.py --output _site/);
  assert.match(steps[browser].run, /http.server.*--directory _site/);
  const upload = pages.jobs.deploy.steps.find(step => step.id === 'upload');
  assert.equal(upload.with.path, '_site');
  assert.equal(upload.with['retention-days'], 1);
});

test('cleanup only runs after successful deployment and has isolated write permission', () => {
  assert.equal(pages.jobs.cleanup.needs, 'deploy');
  assert.equal(pages.jobs.cleanup.if, "needs.deploy.result == 'success' && needs.deploy.outputs.artifact_id != ''");
  assert.deepEqual(pages.jobs.cleanup.permissions, { actions: 'write' });
  assert.equal(pages.permissions.actions, 'read');
  assert.equal(pages.jobs.deploy.outputs.artifact_id, '${{ steps.upload.outputs.artifact_id }}');
});

const cleanupScript = pages.jobs.cleanup.steps[0].with.script;
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
async function cleanupFixture({ id = '123', artifact = { name: 'github-pages', workflow_run: { id: 456 } }, status } = {}) {
  const calls = [];
  const actions = {
    getArtifact: async args => { calls.push(['get', args]); if (status) throw Object.assign(new Error('API failure'), { status }); return { data: artifact }; },
    deleteArtifact: async args => { calls.push(['delete', args]); },
  };
  await new AsyncFunction('github', 'context', 'core', 'process', cleanupScript)(
    { rest: { actions } }, { repo: { owner: 'fixture', repo: 'site' }, runId: 456 },
    { info() {} }, { env: { ARTIFACT_ID: id } });
  return calls;
}
test('cleanup deletes only the verified artifact ID from this run', async () => {
  assert.deepEqual(await cleanupFixture(), [
    ['get', { owner: 'fixture', repo: 'site', artifact_id: 123 }],
    ['delete', { owner: 'fixture', repo: 'site', artifact_id: 123 }],
  ]);
});
test('cleanup refuses malformed IDs, other runs, and other artifact types', async () => {
  for (const id of ['', 'NaN', '1;delete', '9007199254740992']) await assert.rejects(cleanupFixture({ id }));
  await assert.rejects(cleanupFixture({ artifact: { name: 'github-pages', workflow_run: { id: 999 } } }));
  await assert.rejects(cleanupFixture({ artifact: { name: 'test-report', workflow_run: { id: 456 } } }));
  await assert.rejects(cleanupFixture({ artifact: { name: 'github-pages' } }));
});
test('already removed packages are harmless; other API failures stay visible', async () => {
  assert.equal((await cleanupFixture({ status: 404 })).length, 1);
  await assert.rejects(cleanupFixture({ status: 403 }));
});
