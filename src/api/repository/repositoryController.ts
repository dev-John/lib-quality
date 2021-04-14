import * as Hapi from "@hapi/hapi";
import { Octokit } from "@octokit/rest";

import { IRepository } from "./repository";
import { IDatabase } from "../../db";
import { IServerConfigurations } from "../../config";
import { IRequest } from "../../interfaces/request";
import { HTTP_CODES, RESPONSE_STATUS } from "../../constants/index";

export default class RepositoryController {
  private database: IDatabase;
  private configs: IServerConfigurations;
  private octokit: Octokit;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
    this.octokit = new Octokit();
  }

  public async getRepository(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { owner, repo } = request.query;

      const orgs = await this.octokit.rest.issues.listForRepo({
        owner,
        repo,
      });

      return h.response({ status: RESPONSE_STATUS.SUCCESS, data: orgs });
    } catch (error) {
      return h
        .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
        .code(HTTP_CODES.FAIL_VALIDATION);
    }
  }
}
