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

export function getDatabaseConfig(): IDataConfiguration {
  return {
    connectionString: "mongodb://URL-PROVISORIA",
  }; // Configurar dados no .env
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
