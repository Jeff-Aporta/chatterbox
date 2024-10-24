const { Pool } = require('pg');

async function CREATE_DATABASE({ DATABASE }) {
  DATABASE = DATABASE.snake_case();
  const query = `SELECT 1 FROM pg_database WHERE datname='${DATABASE}'`;
  const result = await global.mypgsql.query(query);

  if (result.rows.length === 0) {
    await global.mypgsql.query(`CREATE DATABASE ${DATABASE}`);
    console.log(`Database created: ${DATABASE}`);
  } else {
    console.log(`Database already exists: ${DATABASE}`);
  }
}

async function CREATE_TABLE({ TABLE, IDTYPE = "SERIAL" }) {
  TABLE = TABLE.snake_case();
  const query = `CREATE TABLE IF NOT EXISTS ${TABLE} (ID ${IDTYPE} PRIMARY KEY);`;
  await EXEC_QUERY({ QUERY: query, MSG: `Table created: ${TABLE}` });
}

function CHANGE_DATABASE({ DATABASE }) {
  global.mypgsql = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.db,
    password: process.env.password,
    port: 5432,
  });
  console.log(`Connected to database: ${DATABASE}`);
}

async function EXEC_QUERY({ QUERY, MSG }) {
  try {
    const results = await global.mypgsql.query(QUERY);
    console.log(MSG);
    return results.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = () => {
  return {
    CREATE_DATABASE,
    CREATE_TABLE,
    CHANGE_DATABASE,
    EXEC_QUERY,
  };
};