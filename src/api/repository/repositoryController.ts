import * as Hapi from "@hapi/hapi";

import { IRepository } from "./repository";
import { IDatabase } from "../../db";
import { IServerConfigurations } from "../../config";
import { IRequest } from "../../interfaces/request";

export default class RepositoryController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  public async getRepository(request: IRequest, h: Hapi.ResponseToolkit) {
    return h.response({ status: "success", data: "It works!" });
  }
}
