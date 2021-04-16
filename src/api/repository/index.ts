import { Server } from "@hapi/hapi";
import Routes from "./routes";

import { IServerConfigurations } from "../../config";

export function init(server: Server, configs: IServerConfigurations) {
  Routes(server, configs);
}
