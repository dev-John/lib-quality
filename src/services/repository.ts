import { Octokit } from "@octokit/rest";
import { IRepository, Repository } from "../models/repository";
import { isLessThanAnHour } from "../utils";

export async function getIssuesInfo({ owner, repo, authorization }): Promise<any> {
  const octokit = new Octokit({ auth: authorization });
  const concatedRepo = `${owner + "/" + repo}`;

  // first o all, we search on the db

  const dbRepo = await getRepoInfoFromDb(concatedRepo);

  // if it's less than an hour, then we send it to the user
  // otherwise we search for new data
  if (dbRepo && isLessThanAnHour(dbRepo.updatedAt)) {
    return {
      openIssues: dbRepo.issues
    }
  } else {
    const result = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: "open",
    }); // if nothing is found, it throws
  
    const openIssues = result.data.length;
  
    await upsertRepository({ repo: concatedRepo, openIssues });
  
    return {
      openIssues,
    };
  }
}

async function upsertRepository({ repo, openIssues }): Promise<IRepository> {
  let query = { name: repo };
  let update = { issues: openIssues };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };

  return Repository.findOneAndUpdate(query, update, options);
}

async function getRepoInfoFromDb(repo): Promise<IRepository> {
  return Repository.findOne({ name: repo });
}