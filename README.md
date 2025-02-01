# Supadata

## 🚀 Overview
Supadata is a web application for creating **digital business cards**. It allows users to design and share their business cards with a QR code.

---

## 🏗️ Project Structure
This project consists of two main parts:

- **Backend (Laravel )**
  - Located in the `supadata_api/` folder.
  - Manages authentication, database, and API.
  
- **Frontend (React)**
  - Located in the `supadata/` folder.
  - Provides a user-friendly interface for managing digital cards.

---

## ⚡ Features
✅ User authentication (Registration/Login)  
✅ Profile management  
✅ Digital business card creation  
✅ QR code generation  
✅ responsive UI  

---

## 🔧 Installation Guide

### **1️⃣ Clone the Repository**

git clone https://github.com/your-username/supadata.git 
cd supadata

### **2️⃣ Backend (Laravel) Setup**

cd supadata_api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

### **3️⃣ Frontend (React) Setup**

cd ../supadata
npm install
npm start

Now, visit http://localhost:3000 to see the frontend and http://127.0.0.1:8000 for the API.
