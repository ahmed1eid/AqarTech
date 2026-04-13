const pool = require('./src/db/db');

async function run() {
  try {
    const stats = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM properties) as total_properties,
        (SELECT COUNT(*) FROM tenants) as active_tenants,
        (SELECT COALESCE(SUM(contract_value), 0) FROM tenants) as total_revenue,
        (SELECT COUNT(*) FROM tenants WHERE contract_end <= CURRENT_DATE + INTERVAL '30 days') as expiring_soon
    `);
    console.log(stats.rows);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

run();
