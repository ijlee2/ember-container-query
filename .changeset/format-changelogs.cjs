const { getInfo } = require('@changesets/get-github-info');

const repo = 'ijlee2/ember-container-query';

async function analyze(changeset) {
  const { links: info } = await getInfo({
    commit: changeset.commit,
    repo,
  });

  const contributor = info.user ? `(${info.user})` : undefined;
  const link = info.pull ?? info.commit ?? undefined;
  const summary = (changeset.summary ?? '').split('\n')[0].trim();

  return {
    contributor,
    link,
    summary,
  };
}

async function summarize(changeset) {
  const { contributor, link, summary } = await analyze(changeset);

  const line = [link, summary, contributor].filter(Boolean).join(' ');

  return `- ${line}`;
}

async function getDependencyReleaseLine(changesets) {
  try {
    const lines = await Promise.all(changesets.map(summarize));

    return lines.join('\n');
  } catch (error) {
    console.error(`ERROR: getDependencyReleaseLine (${error.message})`);

    return '';
  }
}

async function getReleaseLine(changeset) {
  try {
    return summarize(changeset);
  } catch (error) {
    console.error(`ERROR: getReleaseLine (${error.message})`);

    return '';
  }
}

module.exports = {
  getDependencyReleaseLine,
  getReleaseLine,
};
