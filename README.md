# Tutoring Booking Backend API

This is the backend API for a tutoring booking platform built with Express.js and MongoDB. It supports Admin, Teacher, and User roles with secured routes and image upload functionality.

---

## Features

- User registration & login with JWT authentication  
- Role-based access control (Admin, Teacher, User)  
- Manage teachers, appointments, and profiles  
- Image upload support via Cloudinary  
- Security features: rate limiting, helmet, data sanitization (NoSQL, XSS), HPP






## Admin Routes (`/api/admin`)

| Method | Endpoint               | Description                         | Auth Required |
|--------|------------------------|-----------------------------------|---------------|
| `POST` | `/login-admin`         | Admin login                       | ❌ No         |
| `POST` | `/add-teacher`         | Add a new teacher (with image)    | ✅ Yes        |
| `GET`  | `/all-teachers`        | Retrieve all teachers              | ✅ Yes        |
| `GET`  | `/appointments`        | Retrieve all appointments          | ✅ Yes        |
| `POST` | `/cancel-appointment`  | Cancel an appointment              | ✅ Yes        |
| `GET`  | `/dashboard`           | Get admin dashboard statistics     | ✅ Yes        |

---

## 👨‍🏫 Teacher Routes (`/api/teacher`)


| Method | Endpoint                | Description                         | Auth Required         |
|--------|-------------------------|-----------------------------------|-----------------------|
| `POST` | `/login-teacher`        | Teacher login                     | ❌ No                 |
| `POST` | `/change-availablity`   | Change availability status        |  ❌                   |
| `GET`  | `/list-teachers`        | List all teachers                 | ❌ No                 |
| `POST` | `/appointments`         | Retrieve teacher's appointments   | ✅ Yes                |
| `POST` | `/complete-appointments`| Mark appointment as completed     | ✅ Yes                |
| `POST` | `/cancel-appointments`  | Cancel an appointment             | ✅ Yes                |
| `GET`  | `/dashboard`            | Get teacher dashboard statistics  | ✅ Yes                |
| `GET`  | `/profile`              | Get teacher profile               | ✅ Yes                |
| `POST` | `/update-profile`       | Update teacher profile            | ✅ Yes                |

---

##  👨‍🎓 User Routes (`/api/user`)

| Method | Endpoint                | Description                      | Auth Required |
|--------|-------------------------|--------------------------------|---------------|
| `POST` | `/register`             | Register a new user             | ❌ No         |
| `POST` | `/login`                | User login                     | ❌ No         |
| `GET`  | `/get-profile`          | Retrieve user profile           | ✅ Yes        |
| `POST` | `/updateProfile`        | Update user profile (with image)| ✅ Yes        |
| `POST` | `/book-appointment`     | Book an appointment            | ✅ Yes        |
| `GET`  | `/appointments`         | Retrieve user's appointments    | ✅ Yes        |
| `POST` | `/cancel-appointment`   | Cancel an appointment          | ✅ Yes        |
| `POST` | `/forget-password`      | Request password reset         | ❌ No         |
| `PATCH`| `/resetPassword/:token` | Reset password using token      | ❌ No         |

---



### ✅ Prerequisites

Before you begin, make sure you have the following installed:

- 🟢 **Node.js** (v14 or above)  
- 📦 **npm** (comes with Node.js)  
- 🍃 **MongoDB** (local or Atlas cloud instance)  
- ☁️ **Cloudinary Account** (for uploading and hosting images)




