# ACK Indoor Cricket

ACK Indoor Cricket is a mobile app project for indoor cricket booking and management.

The project contains an Expo React Native frontend and a Node.js/Express backend. It is prepared as a group project setup so team members can continue development from the same structure.

## Overview

This project is planned as a single-stadium indoor cricket booking management application. Users will be able to book cricket sessions, manage bookings, view promotions, and receive notifications.

The system can also include admin features for managing bookings, promotions, stadium details, payment status, and analytics.

## Planned Features

User features:

- User registration and login
- Profile management
- Booking history
- Indoor cricket session booking
- Available time slot viewing
- Booking cancellation or rescheduling
- Promotion and discount viewing
- Ratings and reviews

Admin features:

- Admin dashboard
- Booking management
- Payment status management
- Promotion management
- Stadium details management
- Time slot and pricing management
- Reports and analytics

Booking features:

- Select date and time slot
- Select number of players
- Select nets
- Track booking status

Possible notification features:

- Booking confirmations
- Booking reminders
- Payment status notifications
- Promotion alerts

## Tech Stack

- Frontend: Expo, React Native
- Backend: Node.js, Express.js
- Database: MongoDB

## Project Structure

```text
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
  .env.example
  package.json
  server.js

frontend/
  src/
    assets/
    components/
    config/
    context/
    navigation/
    screens/
    services/
    theme/
    utils/
  .env.example
  App.js
  package.json

.gitignore
README.md
package-lock.json
render.yaml
results.txt
```

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- Expo Go mobile app or an Android/iOS emulator
- MongoDB connection string

## Backend Setup

```sh
cd backend
npm install
copy .env.example .env
npm run dev
```

For production start:

```sh
npm start
```

## Frontend Setup

```sh
cd frontend
npm install
copy .env.example .env
npm start
```

## Environment Files

Do not push real `.env` files to GitHub.

Use these files as templates:

```text
backend/.env.example
frontend/.env.example
```

Each developer should create their own local `.env` file from the example file.

## Theme Files

Frontend colors, fonts, and spacing are stored here:

```text
frontend/src/theme/
```

Use them in frontend screens and components:

```js
import { colors, fonts, spacing } from '../theme';
```

## Git Notes

Before starting work:

```sh
git pull origin main
```

After making changes:

```sh
git add .
git commit -m "Describe your changes"
git push
```

## Future Improvements

- Online payment gateway
- WhatsApp notifications
- Push notifications
- Membership subscriptions
- Loyalty rewards
- Tournament booking system
- Multi-stadium support
