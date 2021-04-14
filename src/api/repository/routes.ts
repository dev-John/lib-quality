import * as Hapi from "hapi";
import RepositoryController from "./repositoryController";
import { IDatabase } from "../../db";
import { IServerConfigurations } from "../../config";
import { HTTP_VERBS } from "../../constants/index";

const { GET } = HTTP_VERBS;

export default function (
  server: Hapi.Server,
  serverConfigs: IServerConfigurations,
  database: IDatabase
) {
  const issueController = new RepositoryController(serverConfigs, database);
  server.bind(issueController);

  server.route({
    method: GET,
    path: "/get-repository",
    options: {
      handler: issueController.getRepository,
      tags: ["api", "users"],
      description: "Get user info.",
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User founded.",
            },
            "401": {
              description: "Please login.",
            },
          },
        },
      },
    },
  });
}
