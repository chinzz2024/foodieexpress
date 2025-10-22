# 🍔 Food Delivery App (Swiggy / Zomato Clone)

A full-featured **food delivery platform** where users can explore restaurants, order meals online, and track their deliveries in real time.  
Built with modern technologies for speed, scalability, and a smooth user experience.
live:https://foodieexpress-ipb8.vercel.app/

---

## 🧩 Description

**Food Delivery App** is a multi-restaurant delivery system inspired by popular apps like **Swiggy** and **Zomato**.  
It allows customers to browse restaurants, add meals to their cart, place orders, and track deliveries live.  
The system also includes **Admin** and **Delivery Partner** dashboards for complete management.

---

## ⚙️ Core Features

### 🍴 User Features
- 🔍 Browse restaurants and menus  
- 🧾 Add items to cart & checkout securely  
- 💳 Payment integration (Stripe / Razorpay ready)  
- 🚴 Live order tracking with **Socket.io**  
- 👤 User authentication (Signup / Login / Logout)

### 🏪 Restaurant Dashboard
- 📋 Manage restaurant details  
- 🧑‍🍳 Add or edit menu items  
- 📦 Track incoming orders  
- 💰 View daily sales and revenue

### 🚗 Delivery Partner Dashboard
- 📍 View assigned deliveries  
- 🔔 Real-time order updates  
- ✅ Mark orders as delivered

### 🛠️ Admin Panel
- 👑 Manage restaurants & delivery partners  
- 📊 Monitor orders and revenue  
- 🧹 Remove inactive users or listings  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React, TypeScript, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB / Firebase |
| Real-time | Socket.io |
| Authentication | JWT / Firebase Auth |
| Deployment | Vercel / Netlify (Frontend), Render / Railway (Backend) |

---

## 🚀 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- MongoDB database (local or cloud)

### Steps

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/food-delivery-app.git

# 2️⃣ Navigate into the project folder
cd food-delivery-app

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
