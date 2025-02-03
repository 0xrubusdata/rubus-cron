import dotenv from "dotenv";
dotenv.config();

export const config = {
  databaseUrl: process.env.DATABASE_URL || "",
  postgresUser: process.env.POSTGRES_USER || "",
  postgresPassword: process.env.POSTGRES_PASSWORD || "",
  postgresDb: process.env.POSTGRES_DB || "",
};
