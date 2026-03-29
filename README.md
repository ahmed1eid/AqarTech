# 🏢 Sity Expert - Property Management System

> 🚀 A modern full-stack property management system to manage properties, tenants, and contracts بسهولة وكفاءة.

---

## 📌 Overview

**Sity Expert** هو نظام متكامل لإدارة العقارات، بيقدم لوحة تحكم تفاعلية تساعدك تتابع:

* العقارات
* المستأجرين
* الإيرادات
* العقود

المشروع معمول باستخدام **Full-Stack Architecture** وبيوفر تجربة استخدام سلسة واحترافية.

---

## 🎯 Features

### 📊 Dashboard

* عرض إحصائيات لحظية
* عدد العقارات
* عدد المستأجرين
* الإيرادات الشهرية

### 🏘️ Property Management

* إضافة / تعديل / حذف العقارات
* متابعة حالة الوحدة (Available / Occupied)

### 👤 Tenant Management

* ربط المستأجر بالعقار
* إدارة بيانات المستأجرين

### ⏰ Contract Alerts

* تنبيه تلقائي للعقود التي تنتهي خلال 30 يوم

### 🔒 Data Integrity

* استخدام SQL Transactions لضمان دقة البيانات

---

## 🛠️ Tech Stack

### Frontend

* Next.js 14 (App Router)
* TypeScript
* Material UI (MUI)
* Lucide React

### Backend

* Node.js
* Express.js
* PostgreSQL
* node-postgres (pg)

---

## 🏗️ Project Structure

```
├── backend/
│   ├── db/
│   ├── app.js
│   └── .env
│
├── frontend/
│   ├── app/
│   ├── components/
│   └── types/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Backend

```bash
cd backend
npm install
```

أنشئ ملف `.env`:

```env
PORT=5000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=property_db
DB_PORT=5432
```

تشغيل السيرفر:

```bash
npm start
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ Database

* PostgreSQL Database
* تحتوي على:

  * Properties
  * Tenants
  * Contracts

---

## 🔮 Future Improvements

* إضافة نظام Login (JWT)
* تحسين الـ UI/UX
* إضافة Charts للإحصائيات
* Deploy المشروع

---

## 👨‍💻 Author

Ahmed Eid
Software Engineering Student @ Nile University
GPA: 3.7

Full-Stack Developer (Next.js & Node.js)

---

## 📄 License

MIT License

---

## 💡 Notes

* تأكد من إضافة `.env` إلى `.gitignore`
* لا ترفع بيانات حساسة على GitHub
* استخدم Password قوي لقاعدة البيانات 🔐

---
