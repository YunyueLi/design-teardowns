import { readFileSync, appendFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { planChanges, pullRequestPaths, findValidatedPullRequest } from './scope.mjs';

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
const repo = process.env.GITHUB_REPOSITORY;
if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) throw new Error('Invalid repository identity');
const api = async path => {
  if (!process.env.GH_TOKEN) throw new Error('GitHub token unavailable');
  const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
    headers: { authorization: `Bearer ${process.env.GH_TOKEN}`, accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`GitHub API HTTP ${response.status}`);
  return response.json();
};
let paths = [], forceFull = process.env.GITHUB_EVENT_NAME === 'workflow_dispatch';
if (!forceFull) {
  if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
    const number = event.pull_request?.number;
    if (!Number.isInteger(number)) throw new Error('Invalid PR number');
    paths = await pullRequestPaths({ changedFiles: event.pull_request.changed_files,
      getPage: page => api(`/pulls/${number}/files?per_page=100&page=${page}`) });
    forceFull = paths === null;
  } else if (process.env.GITHUB_EVENT_NAME === 'push') {
    const { before, after } = event;
    if (![before, after].every(sha => /^[a-f0-9]{40}$/.test(sha))) throw new Error('Invalid push revisions');
    if (/^0+$/.test(before)) forceFull = true;
    else {
      execFileSync('git', ['fetch', '--no-tags', '--depth=1', 'origin', before], { stdio: 'inherit' });
      paths = execFileSync('git', ['diff', '--name-only', '-z', '--no-renames', before, after], { maxBuffer: 32 * 1024 * 1024 })
        .toString().split('\0').filter(Boolean);
    }
  } else throw new Error('Unsupported workflow event');
}
const plan = planChanges(paths ?? [], { forceFull });
plan.reused = false;
if (process.env.GITHUB_EVENT_NAME === 'push' && (plan.catalogue || plan.browser)) {
  try {
    const tree = execFileSync('git', ['rev-parse', 'HEAD^{tree}'], { encoding: 'utf8' }).trim();
    const run = await findValidatedPullRequest({ api, repo, after: event.after, tree });
    if (run) { plan.reused = true; plan.validated_run = run; }
  } catch (error) {
    // Failed evidence lookup is a cache miss, never permission to skip validation.
    console.log(`Cannot reuse PR evidence; running validation: ${error.message}`);
  }
}
for (const [key, value] of Object.entries(plan)) {
  if (typeof value === 'boolean') appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
}
console.log(JSON.stringify(plan, null, 2));
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY,
  `## Check scope\n\n\`\`\`json\n${JSON.stringify(plan, null, 2)}\n\`\`\`\n`);
