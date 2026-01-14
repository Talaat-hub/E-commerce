
# 🛒 **Kaufra - Modern Full-Stack E-Commerce Platform**

Kaufra is a high-performance full-stack, modern, and production-ready **E-Commerce Web Application** built using the latest **Next.js 16** framework with **React 19**,It leverages a robust stack including Prisma, PostgreSQL, and Auth.js, secure authentication, integrated payments, admin dashboard, and a highly customizable UI toolkit.

Designed with scalability, developer experience, and real-world e-commerce flows in mind.

---

# 📁 **Folder Structure**

Your project uses the **Next.js App Router**, structured for clarity between **public**, **protected**, and **admin** spaces.

```txt
Kaufra/
├── app/                          # NEXT.JS 16 APP ROUTER
│   ├── (auth)/                   # Authentication Group
│   │   ├── sign-in/              # Login Page
│   │   └── sign-up/              # Registration Page
│   ├── (root)/                   # Main Application Group
│   │   ├── cart/                 # Shopping Cart UI
│   │   ├── order/                # Order Details & Summary
│   │   ├── payment-method/       # Payment Selection logic
│   │   ├── product/              # Dynamic [slug] Product Pages
│   │   ├── shipping-address/     # Checkout Shipping Step
│   │   └── page.tsx              # Home Page (Featured/New Arrivals)
│   ├── admin/                    # PROTECTED ADMIN PANEL
│   │   ├── main-nav.tsx          # Dashboard Navigation
│   │   ├── orders/               # Order Management (CRUD)
│   │   ├── products/             # Inventory Management
│   │   ├── users/                # User Permissions/Management
│   │   └── overview/             # Recharts Analytics Dashboard
│   ├── api/                      # BACKEND API ENDPOINTS
│   │   ├── auth/[...nextauth]/   # Auth.js Config
│   │   ├── uploadthing/          # Image Upload Handlers
│   │   └── webhooks/             # Stripe/PayPal Webhook Listeners
│   ├── user/                     # PROTECTED USER DASHBOARD
│   │   ├── profile/              # Account Settings
│   │   └── orders/               # Personal Order History
│   └── layout.tsx                # Global Layout (Navbar/Footer)
├── components/                   # REUSABLE UI SYSTEM
│   ├── admin/                    # Admin-specific UI (Product Forms)
│   ├── shared/                   # Business Logic Components
│   │   ├── header/               # Navbar, Search, User Button
│   │   ├── product/              # Product Cards, Lists, Images
│   │   ├── checkout/             # Checkout Progress Stepper
│   │   └── cart/                 # Cart Table and Sidebars
│   ├── ui/                       # ShadCN UI Primitives (Button, Input, etc)
│   └── footer.tsx                # Global Footer
├── db/                           # DATABASE LAYER
│   ├── prisma.ts                 # Prisma Client Initialization
│   ├── schema.prisma             # PostgreSQL Models (Neon)
│   └── seed.ts                   # Sample Data for Testing
├── email/                        # REACT-EMAIL TEMPLATES
│   └── index.tsx                 # Purchase Receipts & Welcome Emails
├── hooks/                        # CUSTOM REACT HOOKS (use-cart, etc)
├── lib/                          # CORE UTILITIES & ACTIONS
│   ├── actions/                  # SERVER ACTIONS (No API fetch needed)
│   │   ├── product.actions.ts    # CRUD for Products
│   │   ├── cart.actions.ts       # Cart Management Logic
│   │   ├── order.actions.ts      # Order Processing
│   │   └── user.actions.ts       # Profile & Role Updates
│   ├── validators/               # ZOD SCHEMAS (Type-safe validation)
│   ├── constants/                # Global Config (App Name, etc)
│   └── utils.ts                  # Tailwind Merge & Formatting
├── public/                       # STATIC ASSETS (Logo, Images)
├── types/                        # GLOBAL TYPES & INTERFACES
├── middleware.ts                 # NEXT AUTH ROUTE PROTECTION
└── tailwind.config.ts            # THEME & DARK MODE CONFIG

```

- **Public store pages are inside** `(root)` 👍
- **Auth pages live in** `(auth)`👍
- **Admin section has its dedicated layout, routes & navigation** 👍
- **API routes handle auth, uploads, & webhooks server-side** 👍

---

# 🧩 **Main Features**

### 🏬 **Storefront**

- Featured products & categories
- Product detail pages with image gallery & inventory
- Search & filters
- Product slug routing (via Slugify)
- Cart with quantities and dynamic totals
- Shipping address & payment workflow
- Fully responsive UX

### 🔐 **Authentication (NextAuth)**

You are using **NextAuth** with:

- **Credentials Provider** (Email + Password)

- **Encrypted passwords via bcrypt**

- **Sessions handled using Cookies + JWT**

- **Role-based Authorization (Admin/User)**

Additional future-ready providers supported in codebase:

- ⚡ Google OAuth
- ✨ Magic Link

### 👤 **User Dashboard**

- Profile management
- Order history
- Saved shipping addresses
- Saved payment methods (optional)

### 🧑‍💼 **Admin Dashboard**

Protected via roles & middleware with capabilities:

- **Manage Orders & Status**

- **Manage Products (CRUD)**

- **Manage Users & Roles**

- **Admin Analytics + Revenue Charts** (Recharts)

- **Upload product images via UploadThing**

### 💳 **Payments**

Supports multiple payment gateways:

🔹 **PayPal**

- React SDK
- Token generation
- Order capture

🔹 **Stripe**

- Server-side Payment Intents
- Webhooks for verification

### ✉️ **Email System**

Using **React Email + Resend** for transactional emails:

- Order confirmations
- User authentication flows
- Future: password reset & email verification

### 🎨 **UI/UX**

Built with modern UI tooling:

- **ShadCN UI** (Composable components)

- **Tailwind CSS**

- **Lucide Icons**

- **Embla Carousel** (Featured products slider)

---

# 🌗 **Theming — Dark & Light Mode**

The platform uses **Next Themes** to support:

- System theme sync
- Smooth toggling
- SSR-friendly hydration

The UI stays consistent across:

- Storefront pages
- Admin dashboard
- Auth pages

---

# 🔐 **Route Protection & Authorization**

Authorization uses **NextAuth + Middleware** enforcing:

| Route Type      | Requirements                     |
| --------------- | -------------------------------- |
| Public          | None                             |
| User Protected  | Valid session                    |
| Admin Protected | Session **AND** `role = "ADMIN"` |

Examples:

| Path     | Access     |
| -------- | ---------- |
| `/cart`  | Public     |
| `/order` | User       |
| `/admin` | Admin only |

If unauthorized, users are:

- Redirected to sign-in
- Or given 403 pages (for admin access)

---

# 🏗️ **Tech Stack**

### **Frontend**

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- ShadCN UI
- Embla Carousel
- Lucide Icons
- Next Themes (dark/light mode)

### **Backend**

- Next.js Server Actions
- Route Handlers (`app/api`)
- NextAuth (Credentials Provider)
- Cookies + JWT Sessions
- Zod Validation
- Prisma ORM

### **Database**

- PostgreSQL via Vercel (Neon)
- Prisma migrations & seeders

### **Payments**

- PayPal React SDK
- Stripe Checkout & Webhooks
- cash on delivery COD

### **Storage**

- UploadThing (Product images)

### **Email**

- Resend
- React Email Templates

---

# 🗄️ **Database & Schema**

Managed via **Prisma**, featuring models such as:

- `User` (with role field)
- `Product`
- `Category`
- `Order`
- `OrderItem`
- `Payment`
- `Address`

Supports migrations & seeding for development.

---

# 🧰 **Developer Experience**

- TypeScript-first codebase

- Prisma type-safety to DB layer

- Zod validation on inputs

- ESLint formatting & linting

- RHF for form management

- Strict mode compliant

---

# 🛠️ **Environment Variables**

Standard `.env` example:

```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
PAYPAL_CLIENT_ID=
PAYPAL_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
UPLOADTHING_SECRET=
```

---

# 🚀 **Achievements**

This project successfully demonstrates:

- Full-stack ecommerce architecture

- Real authentication & authorization

- Modern SSR/ISR patterns via Next.js 16

- Admin dashboard with real CRUD flows

- Stripe + PayPal payment integration

- Dark/Light theme capabilities

- Transactional email system

- Cloud Postgres setup via Vercel/Neon

- Type-safe development environment

---

# ⚠️ **Challenges & Insights**

While building this platform, notable challenges included:

🧩 **Dependency Compatibility**

- React 19 & Next 16 adoption required using `--legacy-peer-deps` due to missing peer updates.

🔐 **Credential Flow with NextAuth**

- Balancing cookie sessions + JWT-based flows required thoughtful config.

🗃️ **Database Modeling**

- Handling order → items → payments relationships required multi-step transactions.

💰 **Payment Webhooks**

- Stripe webhook handling had to respect edge/server limitations.

📦 **File Uploads**

- UploadThing + server actions coordination took careful setup.

💅 **Admin UX**

- Creating reusable admin UI patterns while remaining flexible.

Each challenge contributed to a more polished and production-ready result.

---
