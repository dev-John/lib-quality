import test from "ava";
import { connect } from "../../db/index";
import { registerSearch } from "../../services/serch";
import { SearchPool } from "../../models/searchPool";

let registers = [];

test.before(async () => {
  await connect();
});

test.after.always(async () => {
  await SearchPool.deleteMany({ _id: registers });
});

test("registerSearch | register a search on the searchPool | pass test", async (t) => {
  const register = await registerSearch({
    user: "testusertokenkskdjfaiahef",
    repository: "facebook/react",
  });

  registers.push(register._id);

  t.assert(register, "The register should have been created");
});
