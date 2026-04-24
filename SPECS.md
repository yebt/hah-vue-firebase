# TODO

Project requirements for the habit app.

## Goal

Build a habit tracking app for regular users, with an admin panel to activate or deactivate accounts.

## Authentication

- Support email/password login.
- Support Google login.
- Users can self-register.
- After signup, an admin activates the account.
- If an admin deactivates a user, the user can still sign in but cannot use the app.

## User roles

- **Admin**
  - Access the dashboard.
  - Activate or deactivate users.
- **Regular user**
  - Access the main app.
  - Create and track habits.

## Habits

The app supports positive and negative habits.

### Positive habits

- Track good habits and streaks.
- Habit types:
  - Simple habit: done or not done.
  - Countable habit.

### Countable habits

- Have a unit, for example: km, min, times.
- Have a minimum value.
- Have a goal value.
- If progress goes above the goal, show it with a stronger highlight color, like GitHub-style progress.
- Countable habits are tracked with multiple entries that are summed per period.
- Evaluation rules:
  - Below minimum: missed.
  - From minimum to near the goal: partial.
  - At goal: complete.
  - Above goal: complete and highlighted.

### Negative habits

- Negative habits are things to avoid, like junk food or smoking.
- Track each time the bad habit happens.
- Negative habits are simple occurrence tracking only.

## Frequency

Habits can use preset frequency rules and custom weekly/monthly rules.

Supported examples:

- Daily
- Weekly
- Monthly
- 2 times a week
- 3 times a week
- 3 times in the day
- 1 time in the month

## Metrics and analytics

- Show full analytics dashboard for habits.
- Include progress and history views for users.

## Notifications

- Include push notifications.

## PWA and offline

- App should be installable as a PWA.
- Prepare offline-first support.
- Save locally first and sync later.

## Technology stack

- Vue 3
- File-based router
- Pinia
- Pinia Colada
- UnoCSS
- Lucide icons
- Wind4 / Tailwind 4
- Firebase
- VueFire
- Vite PWA
