# 🧭 Wanderlust — Travel Booking Platform

Wanderlust is a full-stack travel booking app. Travelers can browse destinations, book trips, and manage their bookings. Logged-in users can also add, edit and delete destinations.

|                             | Link                                        |
| --------------------------- | ------------------------------------------- |
| 🌐 **Live site (frontend)** | https://wanderlust-client-xi-pi.vercel.app/ |
| ⚙️ **Live API (backend)**   | https://wanderlust-backend-xi.vercel.app/   |

## ✨ What it does

- Browse and search destinations, and filter them by category
- View a destination's full details and book it in one click
- See upcoming and past bookings, and cancel an upcoming one
- Sign up and sign in with email and password, Google or GitHub
- Add, edit and delete destinations (with a live card preview while adding)
- Edit your profile (name and photo) and send a message from the contact page

## 🏗️ How it fits together

```
 Browser ──► Next.js frontend (Vercel) ──► Express API (Vercel) ──► MongoDB
                │                              ▲
                │  Better Auth (sessions)      │ verifies the JWT
                └──────── JWT (Bearer) ────────┘ using the auth server's JWKS
```

1. The user signs in through **Better Auth** in the Next.js app.
2. For protected requests, the frontend asks for a **JWT** (`authClient.token()`) and sends it as `Authorization: Bearer <token>`.
3. The Express API verifies the token against the auth server's public keys (`/api/auth/jwks`) and then reads or writes **MongoDB**.

## 🧰 Tech stack

| Layer              | Tools                                                                          |
| ------------------ | ------------------------------------------------------------------------------ |
| Frontend           | Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui, lucide-react |
| Forms and feedback | react-hook-form, zod, sonner                                                   |
| Auth               | Better Auth (email and password, Google, GitHub)                               |
| Backend            | Node.js, Express, `cors`, `dotenv`, `jose`                                     |
| Database           | MongoDB                                                                        |
| Hosting            | Vercel (frontend and backend)                                                  |

## 🚀 Quick start

```bash
# 1. Backend
cd wanderlust-backend
npm install
npm start                # runs on http://localhost:5000

# 2. Frontend (new terminal)
cd wanderlust-client
npm install
# set NEXT_PUBLIC_API_URL=http://localhost:5000 in .env.local
npm run dev              # runs on http://localhost:3000
```

## 👩‍💻 Author

**Mahenaj Tabassum Powshi** · GitHub: [@mahenaj-tabassum](https://github.com/mahenaj-tabassum)

Built as part of the Programming Hero _AI-Driven Full Stack Web Engineering_ course.
