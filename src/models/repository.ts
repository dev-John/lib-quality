import * as Mongoose from "mongoose";

export interface IRepository extends Mongoose.Document {
  name: string;
  issues: number;
  avgAge: number;
  stdAge: number;
}

export const RepositorySchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    issues: { type: String, required: true },
    avgAge: { type: String, required: true },
    stdAge: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Repository = Mongoose.model<IRepository>(
  "repositories",
  RepositorySchema
);
