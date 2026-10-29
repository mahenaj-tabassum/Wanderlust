# 🧭 Wanderlust — Frontend

The Next.js client for **Wanderlust**, a travel booking platform. It has a bright, energetic design and covers browsing, booking, auth and profile management.

### 🌐 **Live:** https://wanderlust-client-xi-pi.vercel.app/

### ⚙️ **API:** https://wanderlust-backend-xi.vercel.app/

---

## ✨ Features

- **Home:** full-screen hero, a swipeable featured-destinations carousel, "Why choose us", testimonials and a call to action
- **Destinations:** live search, category filters, skeleton loading, error and empty states
- **Destination details:** photo header, trip info, sticky price card and one-click booking
- **Manage destinations:** add (with live preview), edit and delete (with confirmation dialogs)
- **My bookings:** upcoming and past tabs with countdown rings, and booking cancellation
- **Auth:** email and password, Google and GitHub sign-in, with a password-strength hint
- **Profile:** edit your name and photo, with a live photo preview
- **Contact:** message form, FAQ and contact details
- Responsive layout, light visual style and accessible controls

## 🧰 Tech stack

- [Next.js](https://nextjs.org/) (App Router), React, TypeScript
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [Better Auth](https://www.better-auth.com/) for sessions and JWTs
- react-hook-form and zod for forms and validation
- react-toastify for toasts, lucide-react and react-icons for icons

## 🗺️ Pages

| Route                  | Description                                   | Login needed                  |
| ---------------------- | --------------------------------------------- | ----------------------------- |
| `/`                    | Home page                                     | No                            |
| `/destinations`        | All destinations with search and filters      | Yes (the page requests a JWT) |
| `/destinations/[id]`   | Destination details, edit, delete and booking | Yes                           |
| `/addPackage`          | Add a new destination                         | Yes                           |
| `/my-booking`          | My upcoming and past bookings                 | Yes                           |
| `/profile`             | Edit profile and sign out                     | Yes                           |
| `/contact`             | Contact form and FAQ                          | No                            |
| `/sign-in`, `/sign-up` | Authentication                                | No                            |

## 🚀 Getting started

**Requirements:** Node.js 20 or newer, and the [backend](../backend/README.md) running (or use the live API).

```bash
# install dependencies
npm install

# start the dev server (http://localhost:3000)
npm run dev
```

### Environment variables

| Variable              | Description                                     | Example                 |
| --------------------- | ----------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the Express API (no trailing slash) | `http://localhost:5000` |

You also need the settings for your **Better Auth** setup (for example its secret, base URL, database and the Google and GitHub client keys). Use the names from your auth config.

For production, set `NEXT_PUBLIC_API_URL=https://wanderlust-backend-xi.vercel.app`.

### Scripts

| Command         | What it does                 |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm start`     | Run the production build     |

## 🔐 How auth works

1. Better Auth manages the session (`authClient.useSession()`).
2. Requests to the API ask for a short-lived JWT with `authClient.token()`.
3. The token is sent as `Authorization: Bearer <token>`, and the backend verifies it.


---

## 🎨 Color palette

Colors come from the default Tailwind palette, so no custom config is needed. Hex values are the standard Tailwind equivalents.

### Core colors

| Role             | Tailwind              | Hex                   | Used for                                 |
| ---------------- | --------------------- | --------------------- | ---------------------------------------- |
| **Primary**      | `cyan-500`            | `#06b6d4`             | Links, active states, focus rings        |
| Primary light    | `cyan-400`            | `#22d3ee`             | Gradients, icon tiles                    |
| Primary deep     | `cyan-700`            | `#0e7490`             | Text on light cyan, hover titles         |
| **Sky**          | `sky-500` / `sky-600` | `#0ea5e9` / `#0284c7` | Gradient partner, banners                |
| **Accent (CTA)** | `orange-500`          | `#f97316`             | Main buttons, prices, highlights         |
| Accent warm      | `amber-400`           | `#fbbf24`             | Gradient partner, sun and stars          |
| Accent soft      | `amber-200`           | `#fde68a`             | Sun, highlighted words on dark gradients |

### Backgrounds and text

| Role                | Tailwind     | Hex              |
| ------------------- | ------------ | ---------------- |
| Page tint (cool)    | `cyan-50`    | `#ecfeff`        |
| Field and chip fill | `cyan-50/70` | `#ecfeff` at 70% |
| Borders and rings   | `cyan-100`   | `#cffafe`        |
| Page tint (warm)    | `orange-50`  | `#fff7ed`        |
| Cards               | `white`      | `#ffffff`        |
| Headings            | `slate-900`  | `#0f172a`        |
| Body text           | `slate-500`  | `#64748b`        |
| Hints and labels    | `slate-400`  | `#94a3b8`        |

### Status colors

| Meaning                      | Tailwind      | Hex       |
| ---------------------------- | ------------- | --------- |
| Success, confirmed, verified | `emerald-500` | `#10b981` |
| Warning, coming up soon      | `orange-500`  | `#f97316` |
| Error, delete, cancel        | `rose-500`    | `#f43f5e` |
| Completed, disabled          | `slate-400`   | `#94a3b8` |



### Signature gradients

| Name               | Classes                                     | Where                              |
| ------------------ | ------------------------------------------- | ---------------------------------- |
| Golden-hour banner | `from-sky-600 via-cyan-500 to-orange-400`   | Page headers, CTA, auth panel      |
| Action             | `from-orange-500 to-amber-400`              | Primary buttons and prices         |
| Sky                | `from-cyan-400 to-sky-500`                  | Logo tile, icon tiles, active tabs |
| Top strip          | `from-cyan-400 via-amber-300 to-orange-400` | Navbar and dialog accent line      |
| Page wash          | `from-cyan-50/60 via-white to-orange-50/40` | Page backgrounds                   |

> **Tailwind note:** the gradients use Tailwind v4 syntax (`bg-linear-to-*`). On Tailwind v3, use `bg-gradient-to-*`.
