import test from "ava";
import * as inMemoryDb from "../_in-memory-db";
import { getIssuesInfo, getRepoInfoFromDb } from "../../services/repository";

import dotenv from "dotenv";

dotenv.config();

test.before(async () => {
  await inMemoryDb.connect();
});

test.after.always(async () => {
  await inMemoryDb.clearDatabase();
  await inMemoryDb.disconnect();
});

// I used a repo of mine to test...
const owner = "dev-John";
const repo = "solid-api";
const authorization = process.env.GITHUB_ACCESS_TOKEN;

test.serial("getIssuesInfo | get issues info | pass test", async (t) => {
  const { openIssues, avgAge, stdAge } = await getIssuesInfo({
    owner,
    repo,
    authorization,
  });

  t.assert(Number.isInteger(openIssues), "openIssues should have been brought");
  t.assert(Number.isInteger(avgAge), "avgAge should have been brought");
  t.assert(Number.isInteger(stdAge), "stdAge should have been brought");
});

test.serial(
  "getRepoInfoFromDb | register a search on the searchPool | pass test",
  async (t) => {
    const register = await getRepoInfoFromDb(owner + "/" + repo);

    t.assert(register, "The register should have been found");
  }
);
