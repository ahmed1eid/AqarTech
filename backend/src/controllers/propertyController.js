const pool = require('../db/db');

const propertyController = {
    // جلب كل العقارات
    getAllProperties: async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM properties ORDER BY id DESC');
            res.json(result.rows);
        } catch (err) {
            res.status(500).json({ error: 'حدث خطأ أثناء جلب البيانات' });
        }
    },

    // إضافة عقار جديد
    createProperty: async (req, res) => {
        const { name, type, location, status } = req.body;
        try {
            const result = await pool.query(
                'INSERT INTO properties (name, type, location, status) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, type, location, status]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: 'فشل في إضافة العقار' });
        }
    },

    // تحديث عقار (لربطه مع زر التعديل في الفرونت)
    updateProperty: async (req, res) => {
        const { id } = req.params;
        const { name, type, location, status } = req.body;
        try {
            const result = await pool.query(
                'UPDATE properties SET name=$1, type=$2, location=$3, status=$4 WHERE id=$5 RETURNING *',
                [name, type, location, status, id]
            );
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: 'فشل في تحديث البيانات' });
        }
    },

    // حذف عقار
    deleteProperty: async (req, res) => {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM properties WHERE id = $1', [id]);
            res.json({ message: 'تم الحذف بنجاح' });
        } catch (err) {
            res.status(500).json({ error: 'فشل في عملية الحذف' });
        }
    }
};

module.exports = propertyController;