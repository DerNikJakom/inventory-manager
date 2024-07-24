import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "device-manager",
  password: "postgres",
  port: 5432,
});
