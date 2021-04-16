import * as Hapi from "@hapi/hapi";

import { IServerConfigurations } from "../../config";
import { IRequest } from "../../interfaces/request";
import { HTTP_CODES, RESPONSE_STATUS } from "../../constants/index";
import { registerSearch } from "../../services/serch";
import { getIssuesInfo } from "../../services/repository";

export default class RepositoryController {
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations) {
    this.configs = configs;
  }

  public async getRepository(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { owner, repo } = request.query;
      const { authorization } = request.headers;

      const data = await getIssuesInfo({
        owner,
        repo,
        authorization,
      });

      await registerSearch({
        user: authorization,
        repository: `${owner + "/" + repo}`,
      });

      return h.response({ status: RESPONSE_STATUS.SUCCESS, data });
    } catch (error) {
      return h
        .response({ status: RESPONSE_STATUS.FAIL, message: error.message })
        .code(HTTP_CODES.FAIL_VALIDATION);
    }
  }
}
