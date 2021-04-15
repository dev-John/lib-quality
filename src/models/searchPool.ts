import * as Mongoose from "mongoose";

export interface ISearchPool extends Mongoose.Document {
  user: string;
  repository: string;
}

export const SearchPoolSchema = new Mongoose.Schema(
  {
    user: { type: String, required: true },
    repository: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const SearchPool = Mongoose.model<ISearchPool>(
  "searchPool",
  SearchPoolSchema
);
