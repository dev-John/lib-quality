import { Octokit } from "@octokit/rest";
import { Repository } from "../models/repository";

export async function getIssuesInfo({ owner, repo, authorization }) {
  const octokit = new Octokit({ auth: authorization });

  const result = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    state: "open",
  }); // if nothing is found, it throws

  const openIssues = result.data.length;

  await upsertRepository({ repo: `${owner + "/" + repo}`, openIssues });

  return {
    openIssues,
  };
}

async function upsertRepository({ repo, openIssues }) {
  let query = { name: repo };
  let update = { issues: openIssues };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };

  return Repository.findOneAndUpdate(query, update, options);
}
