import * as Mongoose from "mongoose";

export interface IRepository extends Mongoose.Document {
  name: string;
  issues: number;
  avgAge: number;
  stdAge: number;
  createdAt: Date;
  updateAt: Date;
}

export const RepositorySchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    issues: { type: String, required: true },
    avgAge: { type: String, required: true },
    stdAge: { type: String, required: true },
    createdAt: { type: String, required: true },
    updateAt: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const RepositoryModel = Mongoose.model<IRepository>(
  "repositories",
  RepositorySchema
);
