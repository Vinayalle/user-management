# 👥 Simple User Management System

A full-stack web application built for managing user records, featuring a Next.js frontend, Node.js API routes, and Prisma ORM.

## 🎯 Assignment Objective

Build a full-stack web application using Next.js, Node.js API, and Prisma ORM where users can be created, viewed, updated, and deleted.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14+ (App Router), React, Tailwind CSS, React icons
- **Backend:** Node.js (Next.js API Routes)
- **Database:** Prisma ORM with PostgreSQL
- **Language:** TypeScript
- **State Management:** React Hooks (useState, useEffect)

---

## 🚀 Features

- **Dashboard:** Display a list of users in a responsive table.
- **🔍 Advanced Search:** Filter users in real-time by **Name**, **Email**, or **Role**.
- **Add User:** Form to create new users with Name, Email, and Role (Admin/User).
- **Edit User:** Prefilled form to update existing user information.
- **Delete User:** Remove users from the database with a single click.
- **Validation:** Basic form validation for user inputs.
- **Responsive UI:** Modern design optimized for all screen sizes.

---

## 🔧 Installation & Setup

Follow these exact steps to set up the project on your local machine:

### 1. Clone the Repository

````bash
git clone [https://github.com/Vinayalle/user-management.git](https://github.com/Vinayalle/user-management.git)
cd user-management

npm install

# Create the file
touch .env

# For PostgreSQL:
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Generate the Prisma Client
npx prisma generate

# Push the schema to your local database
npx prisma db push

npm run dev

Note: Open http://localhost:3000 to see the result.

# 👥 User Management Dashboard

A professional, high-performance administrative interface built with **Next.js 14**, **Tailwind CSS**, and **TypeScript**.

---

## 🚀 API Reference

Use these endpoints to manage the user lifecycle. All requests and responses use `application/json`.

### Endpoints Overview

| Method | Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| ![POST](https://img.shields.io/badge/POST-22c55e?style=flat-square) | `/api/users` | Create a new user account | ✅ Active |
| ![GET](https://img.shields.io/badge/GET-3b82f6?style=flat-square) | `/api/users` | Fetch all registered users | ✅ Active |
| ![PUT](https://img.shields.io/badge/PUT-f59e0b?style=flat-square) | `/api/users/:id` | Update existing user details | ✅ Active |
| ![DELETE](https://img.shields.io/badge/DELETE-ef4444?style=flat-square) | `/api/users/:id` | Permanent user removal | ✅ Active |

### Request Body Schema
For **POST** and **PUT** requests:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin"
}


## 📸 Preview

### Dashboard View
![User Dashboard](C:\Users\vinay\OneDrive\Desktop\vinay-resumes\Frontend-tasks\Nextjs\user-management\public\userdashboard.jpeg)

### Add/Edit User Form
![User Form](C:\Users\vinay\OneDrive\Desktop\vinay-resumes\Frontend-tasks\Nextjs\user-management\public\adduser.jpeg)

### Mobile Responsive View
![Mobile View](C:\Users\vinay\OneDrive\Desktop\vinay-resumes\Frontend-tasks\Nextjs\user-management\public\mobile-view.png)

````
