# 🎯 Smart Placement Portal

A full-stack **Smart Placement Preparation Portal** built with the MERN stack, designed to help students prepare for placements through structured aptitude practice, performance tracking, and curated resources — all in one place.

---

## 📖 Overview

Smart Placement Portal is a placement-readiness platform that enables students to practice quizzes, track their performance over time, explore hiring companies, and access curated preparation resources. The platform features secure JWT-based authentication, protected routes, and a fully responsive interface, making it accessible and secure across devices.

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure user registration and login using JSON Web Tokens
- 🛡️ **Protected Routes** — Role-based route protection to safeguard user data and restricted pages
- 📝 **Quiz Module** — Interactive aptitude and technical quizzes for placement preparation
- 📊 **Quiz Analytics** — Visual performance insights to track strengths and improvement areas
- 🕘 **Quiz History** — Complete record of past quiz attempts and scores
- 🏢 **Companies Module** — Browse companies with relevant placement information
- 📚 **Resources Module** — Curated study materials and preparation resources
- 📱 **Responsive UI** — Seamless experience across desktop, tablet, and mobile devices
- 💬 **Testimonials Section** — Showcases user feedback and success stories
- 📈 **Placement Dashboard** — Centralized dashboard summarizing user progress and activity
- ☁️ **MongoDB Atlas Integration** — Cloud-hosted, scalable database backend

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- CSS3

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- JWT (JSON Web Tokens)

---

## ⚙️ Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/VishakhaShree-07/Smart-Placement-Portal.git
   cd Smart-Placement-Portal
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file inside the `backend` folder:
   ```env
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Create a `.env` file inside the `frontend` folder:
   ```env
   VITE_API_URL=your_backend_api_url
   ```

5. **Run the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Run the frontend application**
   ```bash
   cd frontend
   npm run dev
   ```

7. **Open the app**

   Visit `http://localhost:5173` (or the port shown in your terminal) in your browser.

---

## 📁 Project Structure

```
Smart-Placement-Portal/
├── backend/
│   ├── config/          # Database and environment configuration
│   ├── controllers/     # Route logic and business logic
│   ├── middleware/      # JWT auth & route protection middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API route definitions
│   ├── server.js        # Entry point for the Express server
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages (Dashboard, Quiz, Companies, etc.)
│   │   ├── context/     # Auth context / global state
│   │   ├── services/    # API calls
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── .env
│
└── README.md
```

---

---

## 🚀 Future Enhancements

- 🔍 Company search functionality
- 🎚️ Filter quizzes by difficulty level
- 🌗 Dark/Light mode toggle
- 🌐 Integration with a real aptitude questions API
- 🛡️ Admin panel for managing content
- 🏆 Leaderboard for competitive practice
- 👤 Profile editing page

---

## 🔗 Live Demo

**Frontend:** [https://smart-placement-portal-gamma.vercel.app](https://smart-placement-portal-gamma.vercel.app)
**Backend API:** [https://smart-placement-portal-1-dzb9.onrender.com](https://smart-placement-portal-1-dzb9.onrender.com)

---

## 👩‍💻 Author

**Vishakha Shree**
[LinkedIn](https://www.linkedin.com/in/vishakha-shree-563727326/) • [GitHub](https://github.com/VishakhaShree-07)