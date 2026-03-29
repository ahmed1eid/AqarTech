const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// تشغيل السيرفر
const server = app.listen(PORT, () => {
    console.log(`
    =============================================
    🚀 Server is running on: http://localhost:${PORT}
    📡 Environment: ${process.env.NODE_ENV || 'development'}
    ✅ Press CTRL+C to stop
    =============================================
    `);
});

// التعامل مع أخطاء التشغيل غير المتوقعة (لضمان استقرار السيرفر)
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
    server.close(() => process.exit(1));
});