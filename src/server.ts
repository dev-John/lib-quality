import qs from "qs";
import { Server } from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import HapiSwagger from "hapi-swagger";

import * as Repository from "./api/repository";
import { IServerConfigurations } from "./config";
import { swaggerOptions } from "./config/swagger";

export async function init(configs: IServerConfigurations): Promise<Server> {
  try {
    const server: Server = new Server({
      port: 3000,
      host: "0.0.0.0",
      query: { parser: (query) => qs.parse(query) },
      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });

    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions,
      },
    ]);

    Repository.init(server, configs);

    return server;
  } catch (error) {
    console.log("Error starting server: ", error);
    throw error;
  }
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
