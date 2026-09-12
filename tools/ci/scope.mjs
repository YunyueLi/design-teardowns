const documentation = new Set([
  'README.md', 'CONTRIBUTING.md', 'ACCEPTANCE.md', 'DESIGN.md', 'PRODUCT.md',
  'CODE_OF_CONDUCT.md', 'CITATION.cff', 'AGENTS.md', '.gitignore',
]);

export function planChanges(paths, { forceFull = false } = {}) {
  const plan = { catalogue: forceFull, browser: forceFull, publish: forceFull };
  for (const path of paths) {
    if (typeof path !== 'string' || !path || path.includes('\\') ||
        path.split('/').some(part => !part || part === '.' || part === '..')) {
      throw new Error('Invalid repository-relative changed path');
    }
    if (/^(\.github\/|tools\/ci\/)/.test(path) || documentation.has(path)) continue;
    // Tools are not site inputs. Generated site changes are classified separately.
    if (path.startsWith('tools/')) {
      plan.catalogue = plan.browser = true;
      continue;
    }
    // Research Markdown, licensing, downloads and new directories may be linked
    // from the site. Never classify them as engineering documentation by suffix.
    plan.catalogue = plan.browser = plan.publish = true;
  }
  return plan;
}

export async function pullRequestPaths({ changedFiles, getPage }) {
  if (!Number.isInteger(changedFiles) || changedFiles < 0 || changedFiles > 3000) return null;
  const files = [];
  for (let page = 1; page <= 30 && files.length < changedFiles; page++) {
    const batch = await getPage(page);
    if (!Array.isArray(batch) || batch.length === 0) break;
    files.push(...batch);
  }
  if (files.length !== changedFiles) return null;
  return files.flatMap(file => [file.filename, ...(file.previous_filename ? [file.previous_filename] : [])]);
}

// Only reuse a complete successful run, with the exact tree that will deploy.
// Checking executed steps prevents a successful config-only run from qualifying.
export function reusableRun({ run, jobs, head, tree, repo }) {
  if (run.event !== 'pull_request' || run.status !== 'completed' || run.conclusion !== 'success' ||
      run.head_sha !== head || run.head_commit?.tree_id !== tree ||
      run.repository?.full_name !== repo || run.path?.split('@')[0] !== '.github/workflows/validate.yml') return false;
  const job = jobs.find(job => job.name === 'all-checks' && job.conclusion === 'success');
  return !!job && ['Validate catalogue and maintenance', 'Check browser interactions'].every(name =>
    job.steps?.some(step => step.name === name && step.status === 'completed' && step.conclusion === 'success'));
}

export async function findValidatedPullRequest({ api, repo, after, tree }) {
  const pulls = await api(`/commits/${after}/pulls?per_page=100`);
  for (const pull of pulls) {
    if (!pull.merged_at || pull.merge_commit_sha !== after || pull.base?.ref !== 'main' ||
        pull.base?.repo?.full_name !== repo || pull.head?.repo?.full_name !== repo ||
        !/^[a-f0-9]{40}$/.test(pull.head?.sha)) continue;
    const head = pull.head.sha;
    const { workflow_runs: runs = [] } = await api(`/actions/workflows/validate.yml/runs?event=pull_request&head_sha=${head}&status=success&per_page=20`);
    for (const run of runs) {
      if (run.head_commit?.tree_id !== tree || !Number.isSafeInteger(run.id)) continue;
      const { jobs = [] } = await api(`/actions/runs/${run.id}/jobs?filter=latest&per_page=100`);
      if (reusableRun({ run, jobs, head, tree, repo })) return run.id;
    }
  }
  return null;
}
