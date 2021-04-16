import { std, sum, round } from "mathjs";
import { Octokit } from "@octokit/rest";
import { IRepository, Repository } from "../models/repository";
import { isLessThanAnHour } from "../utils";

export async function getIssuesInfo({
  owner,
  repo,
  authorization,
}): Promise<any> {
  const octokit = new Octokit({ auth: authorization });
  const concatedRepo = `${owner + "/" + repo}`;

  // first o all, we search on the db
  const dbRepo = await getRepoInfoFromDb(concatedRepo);

  // if it's less than an hour, then we send it to the user
  // otherwise we search for new data
  if (dbRepo && isLessThanAnHour(dbRepo.updatedAt)) {
    return {
      openIssues: dbRepo.issues,
      avgAge: round(dbRepo.avgAge, 2),
      stdAge: round(dbRepo.stdAge, 2),
    };
  } else {
    const result = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: "all",
    }); // if nothing is found, it throws

    const timeToClose: Array<number> = [];
    let openIssues: number = 0;

    result.data.forEach((issue) => {
      if (issue.state === "closed") {
        const creationDate = new Date(issue.created_at);
        const closingDate = new Date(issue.closed_at);
        const diffBetweenDates = closingDate.getTime() - creationDate.getTime();

        timeToClose.push(diffBetweenDates / (1000 * 3600 * 24));
      } else {
        // let's see the open ones
        openIssues++;
        const creationDate = new Date(issue.created_at);
        const closingDate = new Date(); // the only difference is the closing date, in this case it's still open, so we use current date
        const diffBetweenDates = closingDate.getTime() - creationDate.getTime();

        timeToClose.push(diffBetweenDates / (1000 * 3600 * 24));
      }
    });

    const avgAge = sum(timeToClose) / timeToClose.length || 0;
    const stdAge = std(timeToClose);

    await upsertRepository({
      repo: concatedRepo,
      openIssues,
      avgAge,
      stdAge,
    });

    return {
      openIssues: openIssues,
      avgAge: round(avgAge, 2),
      stdAge: round(stdAge, 2),
    };
  }
}

// creates or updates - 2 in 1
async function upsertRepository({
  repo,
  openIssues,
  avgAge,
  stdAge,
}): Promise<void> {
  let query = { name: repo };
  let update = { name: repo, issues: openIssues, avgAge, stdAge };
  let options = { upsert: true, new: true, setDefaultsOnInsert: true };

  await Repository.findOneAndUpdate(query, update, options);
}

async function getRepoInfoFromDb(repo): Promise<IRepository> {
  return Repository.findOne({ name: repo });
}
