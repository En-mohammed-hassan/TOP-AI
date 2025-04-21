# TOP-AI

A modern AI-powered web application built with **Next.js**, **React**, and **Tailwind CSS**, integrated with **Kinde authentication**, **Stripe payments**, and **OpenAI**.

---

## 🚀 Features

- 🔐 Kinde Authentication (login, logout, protected routes)
- 💡 OpenAI API integration
- 💳 Stripe Payments and Webhooks
- 🎨 Styled with Tailwind CSS
- 🧠 AI limits and image generation support
- ⚙️ Prisma + PostgreSQL database (via Prisma Accelerate)

---

## 🛠 Tech Stack

- **Framework**: Next.js (React)
- **Auth**: Kinde
- **Payments**: Stripe
- **AI**: OpenAI API
- **DB**: Prisma + PostgreSQL
- **Styling**: Tailwind CSS
- **Language**: TypeScript

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/En-mohammed-hassan/TOP-AI.git
cd TOP-AI
2. Install dependencies
bash
Copy
Edit
npm install
3. Set up environment variables
Create a .env file using the provided template:

bash
Copy
Edit
cp .env.example .env
Then fill in your actual API keys and config values.

4. Run the development server
bash
Copy
Edit
npm run dev
Visit http://localhost:3000

🧩 Project Structure
php
Copy
Edit
TOP-AI/
├── app/                 # App pages and layouts
├── components/          # Reusable UI components
├── constants/           # App-wide constants
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
├── prisma/              # DB schema and setup
├── public/              # Static files
├── styles/              # Tailwind and global CSS
├── .env.example         # Environment config template
├── LICENSE              # MIT License
├── README.md            # You are here
└── ...
🧪 Environment Variables
Set your variables in .env based on the structure in .env.example. Here's what's required:

KINDE_CLIENT_ID, KINDE_CLIENT_SECRET, etc.

OPENAI_KEY

STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET_KEY

DATABASE_URL

Other settings like limits and site URL

📦 Deployment
This app is ready to deploy on Vercel or any Next.js-supported platform.

To deploy on Vercel:

Connect your GitHub repo

Add environment variables in the Vercel dashboard

Done!

Live Demo: https://top-ai-psi.vercel.app

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgments
Kinde

Stripe

OpenAI

Prisma
