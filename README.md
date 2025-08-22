# PhoneMarket

A modern e-commerce web application for smartphones, built with Next.js, MongoDB, and Tailwind CSS. Features include product browsing, filtering, authentication (email/password & Google), user dashboards, cart, checkout, and role-based access for customers, sellers, deliverymen, and admins.

---

## 🚀 Setup & Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/phone-market.git
   cd phone-market
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local` (or edit existing).
   - Fill in your MongoDB URI, NextAuth secrets, Google OAuth credentials, and other required keys.

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Route Summary

| Route                        | Description                                 | Access         |
|------------------------------|---------------------------------------------|----------------|
| `/`                          | Home page with hero & featured products     | Public         |
| `/products`                  | Product listing & filtering                 | Public         |
| `/products/[id]`             | Product details page                        | Public         |
| `/login`                     | Login page (email/password, Google)         | Public         |
| `/register`                  | Registration page                           | Public         |
| `/cart`                      | Shopping cart                               | Authenticated  |
| `/dashboard`                 | User dashboard (role-based)                 | Authenticated  |
| `/dashboard/addProduct`      | Add new product (customer/seller)           | Authenticated  |
| `/dashboard/customer/*`      | Customer dashboard routes                   | Customer only  |
| `/dashboard/seller/*`        | Seller dashboard routes                     | Seller only    |
| `/dashboard/deliveryman/*`   | Deliveryman dashboard routes                | Deliveryman    |
| `/dashboard/admin/*`         | Admin dashboard routes                      | Admin only     |
| `/deals`                     | Deals & discounts                           | Public         |
| `/wishlist`                  | Wishlist                                    | Authenticated  |
| `/community`                 | Community page                              | Public         |
| `/about`                     | About us                                    | Public         |
| `/contact`                   | Contact page                                | Public         |
| `/unauthorized`              | Unauthorized access page                    | Public         |
| `/api/*`                     | REST API endpoints (products, auth, cart)   | Internal/API   |

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **MongoDB** (Atlas)
- **Tailwind CSS**
- **NextAuth.js** (Credentials & Google)
- **Lucide Icons**
- **Framer Motion** (animations)
- **Role-based middleware**

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
