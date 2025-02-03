import { client } from "../database/postgresClient";

async function insertFakeData() {
  const queries = [
    `INSERT INTO europarl (title) VALUES ('Fake news Europarl') RETURNING *;`,
    `INSERT INTO eurostat (title) VALUES ('Fake statistics Eurostat') RETURNING *;`,
    `INSERT INTO federalreserve (title) VALUES ('Fake announcement Fed') RETURNING *;`,
    `INSERT INTO us_bea (title) VALUES ('Fake report BEA') RETURNING *;`
  ];

  for (let query of queries) {
    const res = await client.query(query);
    console.log("Inserted:", res.rows[0]);
  }
}

// Lancer le cron toutes les 10 minutes
setInterval(insertFakeData, 10 * 60 * 1000);

console.log("Cron job démarré...");
