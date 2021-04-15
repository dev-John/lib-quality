import { SearchPool } from "../models/searchPool";

export function registerSearch({ user, repository }) {
  return SearchPool.create({ user, repository }).catch((error) => {
    throw new Error("Falha ao registrar pesquisa");
  });
}
