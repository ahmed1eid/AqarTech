# 🏢 Property Management System

> 🚀 A modern, responsive, and full-stack property management system designed to seamlessly manage properties, tenants, and contracts.

🔗 **Live Demo:** [https://aqar-tech.vercel.app/](https://aqar-tech.vercel.app/)

---

## 📌 Overview

**Sity Expert** هو نظام متكامل ومتقدم لإدارة العقارات، يوفر لوحة تحكم تفاعلية وسهلة الاستخدام لمساعدتك على إدارة:

* 🏘️ **العقارات والوحدات السكنية/التجارية**
* 👥 **المستأجرين وبياناتهم**
* 💰 **العقود والقيمة الإيجارية**
* 📈 **الإيرادات والإحصائيات**

المشروع مبني باستخدام **أحدث تقنيات Full-Stack** (Next.js 14+ و Node.js) ومصمم ليكون متجاوباً (Responsive) للعمل بكفاءة على جميع الأجهزة (الموبايل والكمبيوتر).

---

## 🎯 Features

### 📊 Interactive Dashboard
* عرض إحصائيات لحظية لـ:
  * إجمالي العقارات
  * المستأجرين النشطين
  * الإيرادات الإجمالية
* واجهة متجاوبة بالكامل (Mobile Responsive).

### 🏘️ Property Management
* إضافة وتعديل وحذف العقارات بسلاسة.
* متابعة حالة كل وحدة (متاح / مشغول / صيانة).
* نظام عرض تفصيلي لبيانات العقار.

### 👤 Tenant Management
* تسجيل بيانات المستأجرين (الاسم، الهوية، الجوال).
* ربط المستأجرين آلياً بالوحدات السكنية المتاحة.
* تحديث وحذف بيانات المستأجر وإخلاء الوحدة تلقائياً.

### ⏰ Contract Follow-ups
* تتبع تواريخ بداية ونهاية العقود.
* **تنبيه ذكي** للعقود التي تقترب من الانتهاء (خلال 30 يوم).

### 🔒 Security & Data Integrity
* الاعتماد على تقنيات **SQL Transactions** لضمان دقة وتكامل العمليات في قاعدة البيانات (مثل حجز الشقة بالتزامن مع إضافة المستأجر).

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **UI/Styling:** Material UI (MUI v5) 
* **Icons:** Lucide React

### Backend
* **Environment:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL (Neon DB Cloud)
* **Connector:** node-postgres (pg)

---

## 🏗️ Project Structure

```bash

├── backend/
│   ├── src/
│   │   ├── app.js         # API Routes & Express Server
│   │   └── db/db.js       # PostgreSQL Pool connection
│   ├── migrate.js         # Database migrations logic
│   └── .env               # Backend Environment variables
│
├── frontend/
│   ├── app/               # Next.js Pages & Layout
│   ├── components/        # Reusable UI Components
│   ├── types/             # TypeScript Types/Interfaces
│   └── .env.local         # Frontend Environment variables
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Database Setup
يمكنك استخدام قاعدة بيانات محلية (PostgreSQL) أو سحابية مثل [Neon.tech](https://neon.tech/).
تأكد من تشغيل ملف `migrate.js` بالخلفية لإنشاء كافة الأعمدة والجداول المطلوبة.

### 2️⃣ Backend Initialization

```bash
cd backend
npm install
```

قم بإنشاء ملف `.env` داخل مجلد الـ backend:
```env
# Database connection string
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
PORT=5000
```

ابدأ السيرفر:
```bash
node ./src/app.js
# أو باستخدام nodemon للتطوير:
# npm run dev 
```

### 3️⃣ Frontend Initialization

```bash
cd frontend
npm install
```

قم بإنشاء ملف `.env.local` داخل مجلد الـ frontend:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

ابدأ تطبيق الواجهة الأمامية:
```bash
npm run dev
```

---

## 🔮 Future Improvements

* [ ] إضافة نظام تسجيل الدخول والمصادقة (Authentication via JWT)
* [ ] إضافة رسوم بيانية (Charts) للإحصائيات المالية
* [ ] توليد التقارير في صيغة PDF و Excel
* [x] تحسين الـ UI/UX وجعله متجاوبًا للهواتف الذكية (تم الإنجاز ✅)

---

## 👨‍💻 Author

**Ahmed Eid**
*Software Engineering Student @ Nile University*
GPA: 3.7
Full-Stack Developer (Next.js & Node.js)

---

## 📄 License

MIT License

---

## 💡 Notes

* تأكد من إضافة الملفات السرية زي `.env` إلى `.gitignore` دائماً.
* للرفع (Deploy): يمكنك رفع الـ backend على Render أو Railway، والـ frontend على Vercel بسهولة.
