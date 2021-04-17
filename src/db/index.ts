import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export function connect() {
  const localMongoDb = "mongodb://lib-quality-db:27017/lib-quality"; // only for local env, runs on docker

  return mongoose.connect(localMongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    connectTimeoutMS: 10000,
  });
}

export function disconnect() {
  return mongoose.disconnect();
}
