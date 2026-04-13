const pool = require('./src/db/db');

async function run() {
  try {
    const res = await pool.query("SELECT table_schema, table_name, column_name, data_type FROM information_schema.columns WHERE table_name = 'tenants' OR table_name = 'properties'");
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
