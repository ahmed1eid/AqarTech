const express = require('express');
const router = express.Router();
const pool = require('../db/db'); 

// جلب جميع المستأجرين
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT t.*, p.name as property_name 
            FROM tenants t 
            LEFT JOIN properties p ON t.property_id = p.id
            ORDER BY t.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'خطأ في جلب بيانات المستأجرين' });
    }
});

// إضافة مستأجر جديد
router.post('/', async (req, res) => {
    const { full_name, national_id, phone_number, email, property_id, contract_start, contract_end } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO tenants (full_name, national_id, phone_number, email, property_id, contract_start, contract_end) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [full_name, national_id, phone_number, email, property_id, contract_start, contract_end]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'خطأ في إضافة المستأجر' });
    }
});

module.exports = router;