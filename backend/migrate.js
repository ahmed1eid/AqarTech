const pool = require('./src/db/db');

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Add missing columns to properties
    await client.query(`
      ALTER TABLE properties 
      ADD COLUMN IF NOT EXISTS type VARCHAR(50),
      ADD COLUMN IF NOT EXISTS location VARCHAR(255),
      ADD COLUMN IF NOT EXISTS rent_price NUMERIC
    `);

    // Add missing columns to tenants
    await client.query(`
      ALTER TABLE tenants 
      ADD COLUMN IF NOT EXISTS national_id VARCHAR(50),
      ADD COLUMN IF NOT EXISTS contract_start DATE,
      ADD COLUMN IF NOT EXISTS contract_end DATE,
      ADD COLUMN IF NOT EXISTS contract_value NUMERIC
    `);

    // Optional: Migrate existing data
    await client.query(`UPDATE properties SET rent_price = price WHERE rent_price IS NULL AND price IS NOT NULL`);
    await client.query(`UPDATE properties SET location = address WHERE location IS NULL AND address IS NOT NULL`);

    await client.query('COMMIT');
    console.log('Migration successful');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err);
  } finally {
    client.release();
    pool.end();
  }
}

migrate();
