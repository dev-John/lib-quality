import qs from "qs";
import { Server, Request, ResponseToolkit } from "@hapi/hapi";

import * as Repository from "./api/repository";
import { IServerConfigurations } from "./config";
import { IDatabase } from "./db";

export async function init(
  configs: IServerConfigurations,
  database: IDatabase
): Promise<Server> {
  // server.route({
  //   method: "GET",
  //   path: "/",
  //   handler: (request: Request, h: ResponseToolkit) => {
  //     return "Hello World!";
  //   },
  // });

  try {
    const server: Server = new Server({
      port: 3000,
      host: "localhost",
      query: { parser: (query) => qs.parse(query) },
      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });

    Repository.init(server, configs, database);

    await server.start();
    console.log("Server running on %s", server.info.uri);

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

// init();
