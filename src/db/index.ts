import * as Mongoose from "mongoose";
import { IDataConfiguration } from "../config";
import { IRepository, RepositoryModel } from "../api/repository/repository";

export interface IDatabase {
  repositoryModel: Mongoose.Model<IRepository>;
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>Mongoose).Promise = Promise;
  Mongoose.connect(process.env.MONGO_URL || config.connectionString);

  let mongoDb = Mongoose.connection;

  mongoDb.on("error", () => {
    console.log(`Unable to connect to database: ${config.connectionString}`);
  });

  mongoDb.once("open", () => {
    console.log(`Connected to database: ${config.connectionString}`);
  });

  return {
    repositoryModel: RepositoryModel,
  };
}
