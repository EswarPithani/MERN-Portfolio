# 🧑‍🚀 Terminal-Themed 3D Portfolio

A sci-fi-inspired personal portfolio website built using React, Three.js, Tailwind CSS, and Framer Motion. The design mimics a retro terminal interface with floating HUD panels, typewriter effects, interactive commands, and animated starfield background.

Hosted with Vercel for continuous deployment and optionally integrated with a Node.js backend for contact form handling.

---

## 🚀 Live Demo

🔗 [Visit My Portfolio](https://evsportfolio.vercel.app/)

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **3D Animation:** Three.js, @react-three/fiber, @react-three/drei
- **UI/UX:** Typewriter effect, scanline overlay, holographic HUD, retro terminal
- **Deployment:** Vercel (CI/CD)
- **Backend (Optional):** Node.js, Express, Render.com

---

## ✨ Features

- 🎯 Terminal-style UI with blinking cursor and retro scanline effects
- 🌌 Real-time animated starfield using Three.js
- 💡 Floating HUD panels showing system status
- ⌨️ Typeable terminal commands (e.g. `help`, `about`, `projects`, `contact`)
- 📨 Contact form with status feedback (connected to backend API)
- ⚙️ Vercel CI/CD: auto-deploys on each push to `main`
- 📱 Fully responsive and dark-mode ready

---

## 📁 Project Structure
my-portfolio/
├── client/ # React frontend (main focus)
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── sections/
│ │ └── App.js
│ └── package.json
├── server/ (optional) # Express backend for contact API
├── .gitignore
└── README.md


## 💬 Terminal Commands (Live)

Users can type commands in the portfolio's terminal to navigate:

| Command    | Action                          |
|------------|----------------------------------|
| `help`     | Show all available commands      |
| `about`    | Scroll to "About Me" section     |
| `projects` | Scroll to "Projects" section     |
| `contact`  | Scroll to contact form           |
| `github`   | Open GitHub in new tab           |
| `clear`    | Clear terminal history           |


## 📦 Getting Started (Dev)

# clone the repo
git clone https://github.com/EswarPithani/MERN-Portfolio.git
cd my-portfolio/client

# install dependencies
npm install

# start development server
npm start
