# SkillLink Backend

> *Express.js REST API for the SkillLink services marketplace.*

This is the **backend API** for SkillLink, a marketplace platform connecting clients with service providers. It handles authentication, user management, service listings, messaging, and bookings.

---

## 📌 Features

- 🔐 JWT Authentication (sign up / login)
- 💬 Realtime messaging with Socket.IO
- 📊 REST API with structured responses
- 📝 Validation & error handling
- 🧪 Modular architecture for scalability

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB
- **Auth:** JWT
- **Environment:** dotenv
- **Testing:** Jest / Supertest

---

## 🚀 Getting Started

### 1️⃣ Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/) running locally or in the cloud

---
### 2️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/skilllink-backend.git
cd skilllink-backend
```

---
### 3️⃣ Install Dependencies

```
```bash
Copy code
npm install
```

---
### 4️⃣ Setup Environment Variables

Create a .env file in the root folder:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/skilllink
JWT_SECRET=supersecretkey
CLIENT_URL=http://localhost:8080```
```

---
### 5️⃣ Start the Server

```
```bash

# Development mode with auto-reload
npm run dev
```

---
## 📂 Project Structure

```
skilllink-backend/
│
├── src/
│   ├── config/         # DB connection, environment setup
│   ├── controllers/    # Route logic
│   ├── middleware/     # Auth, error handling, etc.
│   ├── models/         # Mongoose schemas
│   ├── routes/        # Express routes
│   ├── services/       # Business logic
│   ├── utils/          # Helpers
│   └── index.js        # Entry point
│
├── tests/              # Integration & unit tests
├── package.json
├── .env.example
└── README.md
```

---
## 🧪 Running Tests

```bash
npm test
```

---
