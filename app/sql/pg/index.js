const { Client } = require("pg");
const test = !global.runPrototypes;

if (test) {
  const path = require("path");
  require(path.resolve(__dirname, "../../prototypes"));
  require("dotenv").config();
}

(async () => {
  if (process.env.connectionString) {
    global.mypgsql = new Pool({
      connectionString: process.env.connectionString,
    });
  } else {
    global.mypgsql = new Client({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      port: 5432,
    });
    await global.mypgsql.connect();
  }
  console.log("PostgreSQL Connected!");
})();

const [
  { CREATE_DATABASE, CREATE_TABLE, CHANGE_DATABASE, EXEC_QUERY },
  {
    GET_COLUMNS,
    GET_COLUMNS_TYPE,
    ADD_COLUMN,
    INSERT_OBJECT,
    EXISTS,
    CALC_TYPE,
    DELETE_ROW,
    READ_ROW,
  },
] = ["PG", "TABLE"].map((n) => require(`./${n}`)());

(async () => {
  try {
    if (test) {
      await _test_();
      setTimeout(() => {
        console.log("Prueba terminada");
        global.mypgsql.end();
      }, 1000);
    }
  } catch (err) {
    console.error(err);
  }
})();

async function _test_() {
  await CREATE_DATABASE({ DATABASE: process.env.db });
  await CHANGE_DATABASE({ DATABASE: process.env.db });
  await CREATE_TABLE({ TABLE: "usuarios" });
  await INSERT_OBJECT({
    TABLE: "usuarios",
    OBJECT: {
      nombre: "jeffrey",
    },
  });
}

module.exports = {
  // SQL
  CREATE_DATABASE,
  CREATE_TABLE,
  CHANGE_DATABASE,
  EXEC_QUERY,
  // TABLE
  DELETE_ROW,
  GET_COLUMNS,
  READ_ROW,
  GET_COLUMNS_TYPE,
  ADD_COLUMN,
  INSERT_OBJECT,
  EXISTS,
  CALC_TYPE,
};
