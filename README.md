# Ghosts of SRM — Student Team Members Management Application

> **Course:** 21CSS301T – Full Stack Development  
> **Assessment:** CLAT-2 (Online Assessment)  
> **Institute:** SRM Institute of Science and Technology, Kattankulathur  
> **Year/Sem:** III Year / VI Sem  

---

## Project Description

A full-stack web application to manage student team members. Built with **React.js** on the frontend and **Node.js + Express + MongoDB** on the backend. Users can add team members with profile photos, view all members in a card layout, and view detailed profiles for individual members.

---

## Tech Stack

| Layer      | Technology               |
|------------|--------------------------|
| Frontend   | React.js, React Router, Axios |
| Backend    | Node.js, Express.js      |
| Database   | MongoDB (via Mongoose)   |
| File Upload| Multer                   |
| Styling    | CSS3, Google Fonts       |

---

## Folder Structure

```
team-alpha/
├── backend/
│   ├── middleware/
│   │   └── upload.js         # Multer config for image uploads
│   ├── models/
│   │   └── Member.js         # Mongoose schema
│   ├── routes/
│   │   └── memberRoutes.js   # API routes
│   ├── uploads/              # Uploaded profile images
│   ├── server.js             # Express server entry point
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── AddMemberPage.js
│   │   │   ├── ViewMembersPage.js
│   │   │   └── MemberDetailsPage.js
│   │   ├── api.js            # Axios base config
│   │   ├── App.js            # Routes
│   │   └── App.css           # Global styles
│   └── package.json
├── .gitignore
└── README.md
```

---

## Installation Steps

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/swetsanjeev/GhostsOfSRM.git
cd GhostsOfSRM
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set your MongoDB URI if needed
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

The frontend runs on **http://localhost:3000**  
The backend runs on **http://localhost:5000**

---

## API Endpoints

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| GET    | `/api/members`      | Retrieve all team members    |
| GET    | `/api/members/:id`  | Retrieve a single member     |
| POST   | `/api/members`      | Add a new member (with image)|
| DELETE | `/api/members/:id`  | Delete a member              |

### Test GET endpoints in browser:
- All members: `http://localhost:5000/api/members`
- Single member: `http://localhost:5000/api/members/<member_id>`

---

## Features

- **Home Page** — Team introduction with navigation buttons
- **Add Member** — Form with validation, image upload (Multer), Axios POST
- **View Members** — Card grid fetched from backend via Axios GET
- **Member Details** — Full profile view fetched by ID via Axios GET

---

## How to Run the App

1. Start MongoDB locally (`mongod`) or use MongoDB Atlas
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm start`
4. Open `http://localhost:3000` in your browser
