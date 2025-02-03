import { Client } from "pg";
import { config } from "../config/env";

export const client = new Client({
  connectionString: config.databaseUrl,
});

export async function connectDB() {
  try {
    await client.connect();
    console.log("✅ PostgreSQL connecté !");
  } catch (err) {
    console.error("❌ Erreur connexion PostgreSQL :", err);
  }
}
