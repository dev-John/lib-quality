import dotenv from "dotenv";

dotenv.config();

export interface IServerConfigurations {
  port: number;
  plugins: Array<string>;
  jwtSecret: string;
  jwtExpiration: string;
  routePrefix: string;
}

export interface IDataConfiguration {
  connectionString: string;
}

export function getServerConfigs(): IServerConfigurations {
  return {
    // temporario
    port: 5000,
    jwtSecret: "random-secret-password",
    jwtExpiration: "1h",
    routePrefix: "",
    plugins: ["jwt-auth", "swagger"],
  };
}
