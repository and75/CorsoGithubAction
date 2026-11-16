// Commenta la issue che ha avviato il workflow.
// Riceve github e context dallo step di GitHub Script: qui dentro non si possono importare.
module.exports = async ({ github, context }) => {
  await github.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: "Questo commento è scritto da `.github/scripts/benvenuto.js`.",
  });
};
