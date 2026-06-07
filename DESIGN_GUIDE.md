# ACK Indoor Cricket Design Guide

This document describes the visual direction, app flow, theme usage, and special product details for the ACK Indoor Cricket mobile app.

ACK Indoor Cricket is an Expo React Native app for single-stadium indoor cricket booking and management. The frontend should feel clear, fast, and practical because users will mainly use it to book sessions, check available time slots, manage bookings, view promotions, and receive booking notifications.

## Tech And Theme Source

The app uses:

- Frontend: Expo and React Native
- Backend: Node.js and Express.js
- Database: MongoDB

Frontend theme values are stored in:

```text
frontend/src/theme/
```

Use shared theme values in screens and components:

```js
import { colors, fonts, spacing } from '../theme';
```

Do not hard-code repeated colors, font styles, or spacing values inside screens. Add or update shared theme values first, then reuse them across the app.

## Colors

Color values should be managed through `frontend/src/theme/`. The palette should support a booking and management app, so colors need to be readable, consistent, and useful for status-heavy screens.

| Purpose | Recommended Usage |
| --- | --- |
| Primary color | Main actions such as booking a session, saving changes, logging in, or confirming a selection |
| Secondary color | Supporting actions, secondary buttons, and less prominent navigation states |
| Background color | Main screen background for mobile views |
| Surface color | Cards, forms, dashboards, booking summaries, and admin panels |
| Text primary | Main headings, labels, booking details, and important values |
| Text secondary | Helper text, timestamps, booking notes, and less important metadata |
| Border color | Inputs, dividers, cards, time slot blocks, and dashboard sections |
| Success color | Confirmed bookings, successful payments, active promotions, and completed actions |
| Warning color | Pending bookings, unpaid payment status, reminders, and attention states |
| Error color | Cancelled bookings, failed payments, invalid forms, and destructive actions |

  primary: #166534
  primary dark: #14532D
  secondary: #FACC15
  background: #F8FAFC
  surface: #FFFFFF
  text: #111827
  muted text: #6B7280
  border: #E5E7EB
  success: #16A34A
  warning: #F59E0B
  danger: #DC2626


### Color Rules

- Use the primary color for the main action on each screen.
- Use status colors consistently for booking status, payment status, notifications, and admin analytics.
- Keep booking information easy to read on mobile screens.
- Avoid creating one-off colors in individual screens or components.
- Promotions and discounts may use accent styling, but they should not overpower booking actions.

## Fonts

Font values should also come from `frontend/src/theme/`. Typography should make mobile booking tasks quick to scan.

| Text Role | Usage |
| --- | --- |
| App title | ACK Indoor Cricket branding and main app title areas |
| Screen heading | Login, profile, booking, history, promotions, admin dashboard, and reports screens |
| Section heading | Grouped content such as booking details, time slots, players, payment status, and stadium details |
| Body text | Standard screen content, booking instructions, descriptions, and review text |
| Label text | Form labels, filters, time slot labels, player count labels, and settings labels |
| Metadata text | Booking dates, notification times, promotion expiry dates, and status details |
| Number text | Player count, pricing, analytics values, and report totals |

### Font Rules

- Keep headings short and useful.
- Use clear labels for booking date, time slot, number of players, selected nets, and booking status.
- Make prices, player counts, booking status, and analytics numbers easy to scan.
- Keep long descriptions for promotions, reviews, or notifications readable on small screens.

## Spacing And Layout

Spacing values should be shared from `frontend/src/theme/`.

- Use consistent screen padding across all mobile screens.
- Group related booking fields together: date, time slot, player count, nets, and status.
- Keep primary booking actions close to the booking form.
- Use clear separation between upcoming bookings, past bookings, promotions, and notifications.
- Admin screens should be denser than user screens because they need to support booking management, reports, payment status, and analytics.
- Avoid overcrowding mobile screens. Break complex admin or booking flows into clear sections.

## App Flow

The planned user flow should support:

1. Register or log in.
2. Manage the user profile.
3. View available indoor cricket time slots.
4. Select booking date and time slot.
5. Select number of players.
6. Select nets.
7. Confirm the booking.
8. Track booking status.
9. View booking history.
10. Cancel or reschedule bookings when allowed.
11. View promotions and discounts.
12. Receive booking confirmations, reminders, payment updates, and promotion alerts.
13. Add ratings and reviews.

## Admin Flow

The planned admin flow should support:

1. Open the admin dashboard.
2. Manage bookings.
3. Update payment status.
4. Manage promotions.
5. Manage stadium details.
6. Manage time slots and pricing.
7. Review reports and analytics.

Admin interfaces should prioritize clarity, status visibility, and fast management actions.

## Booking Screens

Booking screens are the core user experience. They should make these details visible and easy to change:

- Selected date
- Selected time slot
- Number of players
- Selected nets
- Booking status
- Payment status when available
- Promotion or discount applied when available

Booking status should be shown consistently across booking history, booking details, admin booking management, and notifications.

## Notifications

The app may include notifications for:

- Booking confirmations
- Booking reminders
- Payment status notifications
- Promotion alerts

Notification UI should clearly show the type of notification, the related booking or promotion, and the time or status.

## Promotions And Reviews

Promotion screens should show:

- Promotion title
- Discount or offer details
- Validity period when available
- Terms or conditions when needed

Ratings and reviews should be simple, readable, and connected to the user's booking or stadium experience.

## Special Product Rules

- The app is currently planned for a single stadium, so avoid designing multi-stadium flows as the default experience.
- Multi-stadium support is a future improvement, so keep structures flexible without making current screens more complex.
- Booking, cancellation, rescheduling, payment status, and notification states should use consistent wording across the frontend and backend.
- Do not commit real `.env` files. Use `backend/.env.example` and `frontend/.env.example` as templates.
- Keep group project work easy to continue by using the existing project structure and shared theme files.

## Future Design Considerations

Future improvements may add:

- Online payment gateway
- WhatsApp notifications
- Push notifications
- Membership subscriptions
- Loyalty rewards
- Tournament booking system
- Multi-stadium support

When these features are added, update this guide with any new colors, components, flows, or status rules.
