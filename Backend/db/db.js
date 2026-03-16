const { Pool } = require("pg")

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "postgres",
  password: "Iloveawp781",
  port: 5432
})

module.exports = pool