# ACK - Indoor Cricket Booking Mobile App

A React Native mobile application built with Expo for managing indoor cricket stadium bookings, time slots, promotions, payment tracking, WhatsApp notifications, reviews, and admin operations.

---

# Overview

This project is a single-stadium indoor cricket booking management mobile application where users can book cricket sessions, manage bookings, receive WhatsApp notifications, and view promotions.

The system also includes an admin panel for managing bookings, promotions, stadium details, payment tracking, and analytics.

The app is built with:

* Expo
* React Native
* React Navigation
* Axios
* AsyncStorage
* Node.js
* Express.js
* MongoDB

---

# Key Features

## User Features

* User registration and login
* JWT authentication
* Profile management
* Booking history
* Book indoor cricket sessions
* View available time slots
* Cancel/reschedule bookings
* Apply promo codes
* View promotions and discounts
* Receive WhatsApp booking notifications
* Receive push notifications
* Submit ratings and reviews

---

## Admin Features

* Admin dashboard
* Manage bookings
* Approve/reject bookings
* Update payment status
* Manage promotions and offers
* Edit stadium details
* Manage time slots and pricing
* View analytics and reports
* Moderate reviews

---

## Booking Features

* Select date and time slot
* Select number of players
* Select nets
* Booking lifecycle management:

  * Pending
  * Confirmed
  * Completed
  * Cancelled

---

## Notification Features

* WhatsApp notifications
* Push notifications
* Booking reminders
* Promotion alerts
* Payment status notifications

---

## Promotions System

* Promo code support
* Percentage discounts
* Fixed discounts
* Weekend offers
* Seasonal promotions
* First-time user discounts

---

# Tech Stack

## Frontend

* expo
* react-native
* react
* react-navigation
* axios
* @react-native-async-storage/async-storage

---

## Backend

* node.js
* express.js
* mongodb
* mongoose
* jsonwebtoken
* bcryptjs
* dotenv
* cors
* nodemon

---

# Prerequisites

Make sure the following are installed:

* Node.js
* MongoDB
* Expo CLI

Install Expo CLI globally:

```bash
npm install -g expo-cli
```

You also need:

* Expo Go mobile app OR Android/iOS emulator
* Git installed
* VS Code installed

---

# Project Structure

```text
ACK-Indoor-Cricket-Booking-App/
│
├── frontend/
│   ├── .env
│   ├── App.js
│   ├── package.json
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── screens/
│       ├── navigation/
│       ├── services/
│       ├── context/
│       ├── utils/
│       └── config/
│
├── backend/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
│
└── README.md
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

---

## Install dependencies

```bash
npm install
```

---

## Create frontend .env

Create:

```text
frontend/.env
```

Example:

```env
API_BASE_URL=http://localhost:5000/api

GOOGLE_MAPS_API_KEY=your_google_maps_key

APP_ENV=development
```

---

## Run frontend

```bash
npx expo start
```

OR

```bash
npm start
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

---

## Install dependencies

```bash
npm install
```

---

## Create backend .env

Create:

```text
backend/.env
```

Example:

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/ack_cricket_db

JWT_SECRET=your_jwt_secret

WHATSAPP_TOKEN=your_whatsapp_token

GOOGLE_MAPS_API_KEY=your_google_maps_key

NODE_ENV=development
```

---

## Run backend

```bash
npm run dev
```

OR

```bash
npm start
```

---

# Running the Full Project

## Terminal 1 — Backend

```bash
cd backend
npm run dev
```

---

## Terminal 2 — Frontend

```bash
cd frontend
npx expo start
```

---

# GitHub Setup

## Initialize Git

```bash
git init
```

---

## Connect GitHub Repository

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_LINK
```

Example:

```bash
git remote add origin https://github.com/yourname/ACK-Indoor-Cricket-Booking-App.git
```

---

# Push Project to GitHub

## Add files

```bash
git add .
```

---

## Commit changes

```bash
git commit -m "Initial project setup"
```

---

## Push to GitHub

```bash
git push -u origin main
```

---

# Pull Latest Changes

```bash
git pull origin main
```

---

# Important Files

## Frontend

* App.js → Root component
* src/navigation/ → Navigation flow
* src/services/api.js → Axios configuration
* src/context/ → Authentication context
* src/screens/ → Application screens

---

## Backend

* server.js → Entry point
* config/db.js → MongoDB connection
* models/ → MongoDB schemas
* controllers/ → Business logic
* routes/ → API routes
* middleware/ → Authentication middleware

---

# Authentication Flow

The app uses JWT token authentication.

Process:

1. User logs in/registers
2. Backend generates JWT token
3. Token stored in AsyncStorage
4. Axios attaches token automatically
5. Protected routes require authentication

---

# Main Screens

## User Screens

* LoginScreen
* RegisterScreen
* HomeScreen
* BookingScreen
* ProfileScreen
* PromotionsScreen
* ReviewsScreen

---

## Admin Screens

* AdminDashboardScreen
* BookingManagementScreen
* PromotionManagementScreen
* AnalyticsScreen
* PaymentManagementScreen

---

# Backend API Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

---

## Bookings

```text
GET /api/bookings
POST /api/bookings
PUT /api/bookings/:id
DELETE /api/bookings/:id
```

---

## Promotions

```text
GET /api/promotions
POST /api/promotions
PUT /api/promotions/:id
DELETE /api/promotions/:id
```

---

## Reviews

```text
GET /api/reviews
POST /api/reviews
DELETE /api/reviews/:id
```

---

## Admin

```text
GET /api/admin/dashboard
PUT /api/admin/payment-status/:id
PUT /api/admin/booking-status/:id
```

---

# WhatsApp Notification System

The backend integrates with:

* Meta WhatsApp Cloud API
  OR
* Twilio WhatsApp API

Notifications sent for:

* Booking confirmations
* Booking cancellations
* Payment updates
* Session reminders

---

# Analytics Features

The admin dashboard includes:

* Total bookings
* Revenue tracking
* Peak booking hours
* Most booked slots
* Promotion performance
* User activity reports

---

# Future Improvements

Possible future upgrades:

* Online payment gateway
* AI booking suggestions
* Membership subscriptions
* Loyalty rewards
* Tournament booking system
* Multi-stadium support

---

# Troubleshooting

## MongoDB connection issue

Check:

```env
MONGODB_URI
```

Make sure MongoDB service is running.

---

## Expo not starting

Clear cache:

```bash
npx expo start --clear
```

---

## Backend connection issue

Check:

```env
API_BASE_URL
```

Make sure backend runs on port 5000.

---

## Git push rejected

Pull latest changes first:

```bash
git pull origin main
```

Then push again.

---

# .gitignore

Create:

```text
.gitignore
```

Add:

```text
node_modules
.env
.expo
dist
build
```

---

# License

This project is developed for educational and academic purposes and can also be extended into a real-world commercial indoor cricket booking platform.
