import { Server } from "@hapi/hapi";
import RepositoryController from "./repositoryController";
import { IServerConfigurations } from "../../config";
import { HTTP_VERBS } from "../../constants/index";

import * as validators from "./repositoryValidator";
import { failAction } from "../../utils";

const { GET } = HTTP_VERBS;

export default function (server: Server, serverConfigs: IServerConfigurations) {
  const issueController = new RepositoryController(serverConfigs);
  server.bind(issueController);

  server.route({
    method: GET,
    path: "/get-repository",
    options: {
      handler: issueController.getRepository,
      tags: ["api"], // to bind the route to SWAGGER!
      description:
        "Get informations about a repository on github, like openIssues, avgAge and stdAge.",
      validate: {
        query: validators.repositoryParamsValidator,
        headers: validators.repositoryHeadersValidator,

        failAction,
      },
    },
  });
}
