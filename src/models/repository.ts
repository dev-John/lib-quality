import * as Mongoose from "mongoose";

export interface IRepository extends Mongoose.Document {
  name: string;
  issues: number;
  avgAge: number;
  stdAge: number;
  createdAt: Date;
  updatedAt: Date; // necessary to declare even with timestamps: true ... Ts Requirement
}

export const RepositorySchema = new Mongoose.Schema(
  {
    name: { type: String, required: true },
    issues: { type: Number, required: true },
    avgAge: { type: Number, required: true },
    stdAge: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const Repository = Mongoose.model<IRepository>(
  "repositories",
  RepositorySchema
);
