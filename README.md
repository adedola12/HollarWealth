# Horlawealth Gadget

A full-stack e-commerce + inventory management platform for gadgets and tech retail.
Customer storefront, admin dashboard, inventory, logistics, sales, blog, and a full
user-access-control (roles & permissions) system.

Blue brand theme with full **light / dark mode**.

## Tech stack

- **Frontend:** React 19 + Vite, Tailwind CSS v4, React Router 7, Recharts, Axios
- **Backend:** Node.js, Express 5 (ESM), MongoDB / Mongoose
- **Auth:** JWT (cookie + bearer), role & permission based access control
- **Media:** Cloudinary uploads
- **Email / messaging:** Nodemailer (SMTP), WhatsApp Cloud API (optional)

## Features

- **Storefront:** product catalogue, search, filtering, cart, wishlist, checkout, order tracking
- **Inventory:** add / edit / delete products, bulk add, stock management, product transfer between locations
- **Categories & brands:** derived and managed through products
- **Admin dashboard:** sales analytics, order management, customer accounts, logistics & shipments
- **UAC:** roles, granular permissions, access policies, user management
- **Blog:** admin authoring + public reading
- **Theming:** blue accent, persistent light/dark mode toggle (system-preference aware)

## Project structure

```
Horlawealth-Gadget/
├── backend/     Express + MongoDB API
└── frontend/    React + Vite client
```

## Getting started

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in real values
npm run dev            # starts on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL
npm run dev            # starts on http://localhost:5173
```

### Seed an admin (first run)

The database starts empty. Create an initial Admin user, a Store, and default UAC
roles (safe & idempotent — re-running won't duplicate data):

```bash
cd backend
npm run seed
```

Default credentials (override via `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` env vars):

```
email:    admin@horlawealthgadget.com
password: Admin@12345
```

Change the password after first login.

## Theming

Dark mode is class-based (`<html class="dark">`), toggled via the sun/moon button in
both the storefront navbar and the admin top bar. The choice persists in
`localStorage` and falls back to the OS preference on first load. Blue (`blue-600`)
is the accent throughout.

## Deployment

- Frontend → Vercel
- Backend → Render

Set the production `VITE_API_URL` and backend env vars in each platform's dashboard.
