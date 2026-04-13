const pool = require('./src/db/db');

async function run() {
  try {
    const res = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'tenants'");
    console.log("Tenants columns:", res.rows);
    const res2 = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'properties'");
    console.log("Properties columns:", res2.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
