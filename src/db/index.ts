import mongoose from "mongoose";
import dotenv from "dotenv";
import { IDataConfiguration } from "../config";
import { IRepository, RepositoryModel } from "../api/repository/repository";

dotenv.config();

export interface IDatabase {
  repositoryModel: mongoose.Model<IRepository>;
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>mongoose).Promise = Promise;
  mongoose.connect(process.env.MONGO_URL || config.connectionString);

  let mongoDb = mongoose.connection;

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
