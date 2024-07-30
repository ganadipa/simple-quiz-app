# Description

This is a web apps that simulates how a quiz with timer works.

# Deployments

To access the app, you can go to one of the links:

- [sea-salon-application.vercel.app](https://sea-salon-application.vercel.app/)

- Or you can clone the repository, make .env file at the root containing:

```bash
DATABASE_URL = "postgresql://MinichSalon_owner:BgEPM94tfjvp@ep-bold-term-a1okqswl.ap-southeast-1.aws.neon.tech/MinichSalon?sslmode=require"
AUTH_SECRET="Ro5S+k6+BPdRm/J1TA3WJwDL1JYX5m/Ml2d4lJy3NWM="
```

then do

```bash
pnpm i
pnpm run dev
```

# 🛠️ Frameworks/Tools Used

- NextJS App Router (Fullstack Framework)
- React (JS Library)
- TailwindCSS (CSS Framework)
- Typescript (Typesafe for JavaScript)
- NextAuth (Authentication)
- NeonDB (Database Provider)
- Drizzle (Object Relational Mapper)
- React Hot Toast (Toasts)
- bcrypt (Hashing Passwords)
- ShadCN UI (UI Component Templates)

# 🌐 Pages

## Authentication

- Only unsigned in user can access this page.
- The sign up page includes a form consisting of name, phone number, email, and password.
- An error toast will appear if some of the form is empty or email already exists.
- After all validation is passed, the filled password is first hashed using bcrypt then the app add a user data to the database.
- After sign up is success, a success toast appear and the user will immediately get signed in as that new signed up user.

## Landing Page

- Everyone can access this page.
- The Landing Page consist of Hero section, list of services, and reviews.
- Everyone can share their review!

## Dashboard Page (Customer)

This page is only accessible for the signed up user.

The Dashboard Page is a dedicated section where users can view their future schedules and make new reservations. This page includes two main components:

- Reserved Schedules Table
- Reservation Form

Where Reserved Schedule Table section contains all your reservations in the future.
It provides the name, pnumber, service, datetime, and duration.

And Reservation Form section which allows you to create a reservation.
You must include name, phone number, service, branch name, date, and start time.

## Dashboard Page (Admin)

This page is only accessible to signed-in administrators.

The Dashboard Page for admins is designed to manage both user reservations and branch services. It includes three main components:

- Reserved Schedules Table
- Add New Service Form
- Add New Branch Form

Where:

1. Reserved Schedules Table displays a list of all upcoming appointments for all users.
   It includes columns for: Name, Number, Service, Date and Time, Duration.

2. Add New Service Form
   allows administrators to add new services to any branch.
3. Add New Branch Form
   This form allows administrators to add new branches.

## 404 Page

- When page is not found, user is redirected to the Error 404 not found page. Which has a button for them to return to th home page (alias for landing page).
