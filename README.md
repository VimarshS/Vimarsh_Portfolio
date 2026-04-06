# Vimarsh Srivastava – Portfolio Website (MERN Stack)

A full-stack, dark-editorial portfolio website built with **React.js**, **Node.js**, **Express**, and **MongoDB**.

---

## 📂 Project Structure

```
portfolio/
├── server/
│   ├── server.js              # Express app entry-point
│   ├── routes/
│   │   └── contact.js         # POST /api/contact  (save + email)
│   └── config/
│       └── contactModel.js    # Mongoose schema for messages
├── client/
│   ├── public/
│   │   └── index.html         # Google Fonts + meta tags
│   └── src/
│       ├── App.js             # Root component
│       ├── App.css            # Global styles & CSS variables
│       ├── index.js           # ReactDOM entry
│       ├── hooks/
│       │   └── useReveal.js   # IntersectionObserver scroll-reveal hook
│       └── components/
│           ├── Navbar          # Fixed glassmorphism nav + mobile menu
│           ├── Hero            # Typing animation, CTAs, decorative orbs
│           ├── About           # Bio + education table
│           ├── Skills          # Animated progress bars by category
│           ├── Projects        # Card grid with tech tags
│           ├── Experience      # Timeline-style internship card
│           ├── Achievements    # Icon badge cards
│           ├── Contact         # Axios form → Express API
│           └── Footer          # Social links + copyright
├── package.json               # Root scripts (dev, start)
├── .env.example               # Environment variables template
└── README.md
```

---

## 🚀 Quick Start

### 1. Install root dependencies
```bash
cd portfolio
npm install
```

### 2. Install client dependencies
```bash
cd client
npm install
```

### 3. Configure environment variables
```bash
# Back in the root folder
cp .env.example .env
# Edit .env and fill in your MongoDB URI and SMTP credentials
```

### 4. Run everything
```bash
# From the root folder – starts both server & client simultaneously
npm run dev
```

| Service        | URL                        |
|----------------|----------------------------|
| React client   | http://localhost:3000      |
| Express server | http://localhost:5000      |

---

## 🌐 Deployment

| Layer    | Recommended Service         |
|----------|-----------------------------|
| Client   | **Vercel** or Netlify       |
| Server   | **Railway**, Render, or Fly |
| Database | **MongoDB Atlas** (free tier)|

> When deploying the client, set the environment variable `REACT_APP_API_URL` to your deployed Express server URL.

---

## ✏️ Customisation Checklist

- [ ] Replace placeholder GitHub repo URLs in `Projects.js` with your real links.
- [ ] Add live-demo URLs to the `live` field in `Projects.js` once deployed.
- [ ] Update contact email (`RECIPIENT_EMAIL`) in `.env`.
- [ ] Swap in your own LeetCode profile link (currently in the resume only).
- [ ] Adjust skill percentages in `Skills.js` as needed.
