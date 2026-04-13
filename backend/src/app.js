const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db/db');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://aqar-tech.vercel.app', 'http://localhost:3000'], // رابط موقعك و الرابط المحلي للتجربة
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// --- الروابط (Routes) ---

// 1. جلب كل العقارات
app.get('/api/properties', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM properties ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. إضافة عقار جديد
app.post('/api/properties', async (req, res) => {
  const { name, type, location, status, rent_price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO properties (name, type, location, status, rent_price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, type, location, status, rent_price || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. تحديث عقار
app.put('/api/properties/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type, location, status, rent_price } = req.body;
  try {
    const result = await pool.query(
      'UPDATE properties SET name=$1, type=$2, location=$3, status=$4, rent_price=$5 WHERE id=$6 RETURNING *',
      [name, type, location, status, rent_price, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "العقار غير موجود" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. حذف عقار
app.delete('/api/properties/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM properties WHERE id = $1', [id]);
    res.json({ message: 'تم الحذف بنجاح' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- روابط المستأجرين (Tenants Routes) ---

// 1. جلب كل المستأجرين مع اسم العقار (Join)
app.get('/api/tenants', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, p.name as property_name 
      FROM tenants t 
      LEFT JOIN properties p ON t.property_id = p.id 
      ORDER BY t.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. إضافة مستأجر جديد
app.post('/api/tenants', async (req, res) => {
  const { full_name, national_id, property_id, contract_start, contract_end, contract_value } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // إضافة المستأجر
    const tenantResult = await client.query(
      `INSERT INTO tenants (full_name, national_id, property_id, contract_start, contract_end, contract_value) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [full_name, national_id, property_id, contract_start, contract_end, contract_value]
    );
    // تحديث حالة العقار ليصبح مشغولاً
    await client.query('UPDATE properties SET status = $1 WHERE id = $2', ['occupied', property_id]);
    
    await client.query('COMMIT');
    res.status(201).json(tenantResult.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// 3. تحديث مستأجر
app.put('/api/tenants/:id', async (req, res) => {
  const { id } = req.params;
  const { full_name, national_id, property_id, contract_start, contract_end, contract_value } = req.body;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Check old property_id
    const oldTenantRes = await client.query('SELECT property_id FROM tenants WHERE id = $1', [id]);
    if (oldTenantRes.rows.length === 0) {
      return res.status(404).json({ error: "المستأجر غير موجود" });
    }
    const oldPropertyId = oldTenantRes.rows[0].property_id;

    // Update tenant
    const result = await client.query(
      'UPDATE tenants SET full_name=$1, national_id=$2, property_id=$3, contract_start=$4, contract_end=$5, contract_value=$6 WHERE id=$7 RETURNING *',
      [full_name, national_id, property_id, contract_start, contract_end, contract_value || 0, id]
    );

    // If property changed, update statuses
    if (oldPropertyId !== property_id) {
      if (oldPropertyId) {
        await client.query('UPDATE properties SET status = $1 WHERE id = $2', ['available', oldPropertyId]);
      }
      if (property_id) {
        await client.query('UPDATE properties SET status = $1 WHERE id = $2', ['occupied', property_id]);
      }
    }

    await client.query('COMMIT');
    res.json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// 4. حذف مستأجر وكل الشقق المحجوزة منه
app.delete('/api/tenants/:id', async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // 1. جلب رقم الهوية للمستأجر قبل الحذف
    const tenantResult = await client.query('SELECT national_id, property_id FROM tenants WHERE id = $1', [id]);
    
    if (tenantResult.rows.length > 0) {
      const nationalId = tenantResult.rows[0].national_id;
      
      if (nationalId) {
        // 2. إعادة جميع العقارات الخاصة به لحالة "متاح"
        await client.query(`
          UPDATE properties 
          SET status = 'available' 
          WHERE id IN (SELECT property_id FROM tenants WHERE national_id = $1)
        `, [nationalId]);

        // 3. حذف جميع السجلات المتعلقة بهذا المستأجر
        await client.query('DELETE FROM tenants WHERE national_id = $1', [nationalId]);
      } else {
        // احتياطي في حال عدم وجود رقم هوية (السجلات القديمة مثلاً)
        const propertyId = tenantResult.rows[0].property_id;
        await client.query('DELETE FROM tenants WHERE id = $1', [id]);
        await client.query('UPDATE properties SET status = $1 WHERE id = $2', ['available', propertyId]);
      }
    }

    await client.query('COMMIT');
    res.json({ message: 'تم حذف المستأجر وإخلاء جميع عقاراته بنجاح' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

app.get('/api/stats/summary', async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM properties) as total_properties,
        (SELECT COUNT(*) FROM tenants) as active_tenants,
        (SELECT COALESCE(SUM(contract_value), 0) FROM tenants) as total_revenue,
        (SELECT COUNT(*) FROM tenants WHERE contract_end <= CURRENT_DATE + INTERVAL '30 days') as expiring_soon
    `);
    res.json(stats.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;