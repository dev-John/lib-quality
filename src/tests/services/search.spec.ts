import test from "ava";
import * as inMemoryDb from "../_in-memory-db";
import { registerSearch } from "../../services/serch";

test.before(async () => {
  await inMemoryDb.connect();
});

test.after.always(async () => {
  await inMemoryDb.clearDatabase();
  await inMemoryDb.disconnect();
});

test("registerSearch | register a search on the searchPool | pass test", async (t) => {
  const register = await registerSearch({
    user: "testusertokenkskdjfaiahef",
    repository: "facebook/react",
  });

  t.assert(register, "The register should have been created");
});
