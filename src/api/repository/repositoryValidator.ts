import Joi from "joi";

export const repositoryParamsValidator = Joi.object({
  owner: Joi.string()
    .required()
    .error(new Error("'owner' is a required param")),
  repo: Joi.string().required().error(new Error("'repo' is a required param")),
});

export const repositoryHeadersValidator = Joi.object({
  authorization: Joi.string()
    .required()
    .error(
      new Error("It's necessary to pass a Github access token on the headers")
    ),
}).options({ allowUnknown: true });
