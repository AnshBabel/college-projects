## 📂 Project 1: Online Complaint / Issue Tracker System

### 📌 Objective
To build a basic full-stack web application using HTML, CSS, JavaScript, Node.js, and Express.js without using any database.

---

## 🛠 Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express.js
- Database: Not Allowed (In-memory storage used)

---

## 🚀 Features

### 👤 User Module
- Submit complaint
- Auto-generated complaint ID
- Default status set to **Pending**

### 🛠 Admin Module
- View all complaints
- Update complaint status (Pending / Resolved / Rejected)
- Delete complaint

---

## 🔗 API Routes

- `GET /complaints` → Get all complaints  
- `GET /complaints/:id` → Get complaint by ID  
- `POST /complaints` → Add new complaint  
- `PUT /complaints/:id` → Update complaint status  
- `DELETE /complaints/:id` → Delete complaint  

---

## ⚙️ How To Run

1. Navigate to project folder:
cd online-complaint-tracker


2. Install dependencies:
npm install


3. Start server:
node server.js


4. Open browser:
http://localhost:3000


---

## 📌 Important Note

- Data is stored in an in-memory array.
- Data resets when the server restarts.
- No database is used as per project constraints.

---

### 👨‍💻 Developed By
Ansh Babel