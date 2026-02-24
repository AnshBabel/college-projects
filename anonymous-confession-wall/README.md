# 📝 Anonymous Confession Wall

A full-stack web application that allows users to post anonymous confessions securely.  
Users can view, create, and manage confessions while authentication is handled using Google OAuth.

---

## 🚀 Features

- 🔐 Google OAuth Authentication
- 📝 Post Anonymous Confessions
- 📜 View All Confessions
- 🗑 Delete Own Confession (Protected Route)
- 🔒 Secure Backend with JWT & Passport
- 🌐 REST API Architecture

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js (Google OAuth)
- JWT Authentication

---

## 📁 Project Structure


anonymous-confession-wall/
│
├── client/ # React Frontend
└── server/ # Express Backend


---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:


PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret


---

## ▶️ Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/YOUR_USERNAME/college-projects.git


### 2️⃣ Install Backend Dependencies

cd anonymous-confession-wall/server
npm install


### 3️⃣ Install Frontend Dependencies

cd ../client
npm install


### 4️⃣ Run Backend

npm start


### 5️⃣ Run Frontend

npm start


---

## 🎓 Learning Outcomes

- Implemented OAuth 2.0 authentication
- Designed RESTful APIs
- Applied JWT-based route protection
- Managed MongoDB schemas using Mongoose
- Structured full-stack project architecture

---

## 👨‍💻 Developed By

Ansh Babel