import Database, { Database as DatabaseType } from "better-sqlite3";
import createOrganizations from "./tables/organizations";
import createAccounts from "./tables/accounts";
import createDeals from "./tables/deals";

function initializeDatabase(): DatabaseType {
  const db = new Database("./database.sqlite", { verbose: console.log });
  db.pragma('foreign_keys = ON');
  
  createOrganizations(db);
  createAccounts(db);
  createDeals(db);

  return db;
}

export default initializeDatabase;
