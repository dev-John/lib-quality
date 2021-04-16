import { Server } from "@hapi/hapi";
import RepositoryController from "./repositoryController";
import { IServerConfigurations } from "../../config";
import { HTTP_VERBS } from "../../constants/index";
import Joi from "joi";

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
        query: Joi.object({
          owner: Joi.string()
            .required()
            .error(new Error("'owner' is a required param")),
          repo: Joi.string()
            .required()
            .error(new Error("'repo' is a required param")),
        }),
        headers: Joi.object({
          authorization: Joi.string()
            .required()
            .error(
              new Error(
                "It's necessary to pass a Github access token on the headers"
              )
            ),
        }).options({ allowUnknown: true }),
      },
    },
  });
}
