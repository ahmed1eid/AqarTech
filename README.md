# 🏢 Property Management System

> 🚀 A modern, responsive, and full-stack property management system designed to seamlessly manage properties, tenants, and contracts.

🔗 **Live Demo:** [https://aqar-tech.vercel.app/](https://aqar-tech.vercel.app/)

---

## 📌 Overview

**AqarTech** is an integrated and advanced property management system that provides an interactive, easy-to-use dashboard to help you manage:

* 🏘️ **Properties and Residential/Commercial Units**
* 👥 **Tenants and their data**
* 💰 **Contracts and Rental Values**
* 📈 **Revenues and Statistics**

Built with the **latest Full-Stack technologies** (Next.js 14+ and Node.js), this project is fully responsive and designed to work efficiently across all devices (Mobile & Desktop).

---

## 🎯 Features

### 📊 Interactive Dashboard
* Real-time statistics displaying:
  * Total Properties
  * Active Tenants
  * Total Revenues
* Fully responsive interface (Mobile Responsive).

### 🏘️ Property Management
* Seamlessly Add, Edit, and Delete properties.
* Track the status of each unit (Available / Occupied / Maintenance).
* Detailed property data viewing.

### 👤 Tenant Management
* Register tenant details (Name, National ID, Phone).
* Automatically assign tenants to available residential units.
* Update or delete tenant data and automatically vacate the property.

### ⏰ Contract Follow-ups
* Track contract start and end dates.
* **Smart Alerts** for contracts that are about to expire (within 30 days).

### 🔒 Security & Data Integrity
* Relies on **SQL Transactions** to guarantee data accuracy and integrity (e.g., booking an apartment concurrently with adding a tenant).

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

\`\`\`
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
\`\`\`

---

## ⚙️ Setup Instructions

### 1️⃣ Database Setup
You can use a local PostgreSQL database or a cloud-hosted one like [Neon.tech](https://neon.tech/).
Make sure to execute the `migrate.js` script to create all the required tables and columns.

### 2️⃣ Backend Initialization

\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file in the backend directory:
\`\`\`env
# Database connection string
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
PORT=5000
\`\`\`

Start the server:
\`\`\`bash
node ./src/app.js
# Or using nodemon for development:
# npm run dev 
\`\`\`

### 3️⃣ Frontend Initialization

\`\`\`bash
cd frontend
npm install
\`\`\`

Create a `.env.local` file in the frontend directory:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

Run the frontend app:
\`\`\`bash
npm run dev
\`\`\`

---

## 🔮 Future Improvements

* [ ] Add an Authentication System (Login via JWT)
* [ ] Add Charts for financial statistics
* [ ] Generate reports in PDF and Excel formats
* [x] Improve UI/UX and make it fully mobile responsive (Completed ✅)

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

* Always make sure to add sensitive files like `.env` to `.gitignore`.
* **Deployment:** You can easily deploy the backend on Render or Railway, and the frontend on Vercel.
