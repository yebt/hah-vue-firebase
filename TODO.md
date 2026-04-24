# TODO

Implementation backlog for `SPECS.md`, grouped by module and ordered for sequential delivery.

## 1. Project foundation

- [x] Set up Vue 3, file-based routing, Pinia, Pinia Colada, UnoCSS, Lucide icons, Wind4 / Tailwind 4, Firebase, VueFire, and Vite PWA.
- [x] Create the base app layout, navigation shell, and shared UI primitives.
- [x] Configure environment variables and Firebase app initialization.
- [x] Add shared state, query, and API/service conventions.

## 2. Authentication and access control

- [x] Configure email/password login.
- [x] Add an email/password sign-in page with auth-state feedback and sign-out.
- [x] Configure Google sign-in.
- [x] Implement self-registration.
- [x] Add a dedicated sign-up page with password confirmation and success state.
- [ ] Add auth state persistence and session restoration.
- [ ] Implement role-based access for admin and regular users.
- [ ] Add route guards and protected layouts.

## 3. Domain model and habit setup

- [ ] Define the data model for users, habits, entries, and sync metadata.
- [ ] Create habit CRUD for positive and negative habits.
- [ ] Add habit creation and editing forms.
- [ ] Add habit deletion and archive handling if needed by the spec.
- [ ] Normalize habit types, units, and frequency rules.

## 4. Positive habit tracking

- [ ] Implement simple habits with done / not done tracking.
- [ ] Implement countable habits with unit, minimum, goal, and progress states.
- [ ] Support multiple entries per period and sum them into a single progress value.
- [ ] Apply evaluation states for missed, partial, complete, and above-goal progress.
- [ ] Add GitHub-style highlight treatment when progress exceeds the goal.
- [ ] Track streaks for positive habits.

## 5. Frequency rules

- [ ] Implement preset frequencies: daily, weekly, monthly, 2 times a week, 3 times a week, 3 times in the day, and 1 time in the month.
- [ ] Add custom weekly and monthly schedule rules.
- [ ] Validate frequency compatibility per habit type.
- [ ] Compute current period boundaries for each schedule type.

## 6. Negative habit tracking

- [ ] Implement simple occurrence logging for negative habits.
- [ ] Track reductions over time for bad habits.
- [ ] Show negative-habit history and period summaries.

## 7. Dashboards and analytics

- [ ] Create the user dashboard.
- [ ] Add streak, progress, and history views.
- [ ] Build the full analytics dashboard.
- [ ] Add charts and summaries for positive and negative habits.
- [ ] Surface per-habit completion and trend metrics.

## 8. Admin dashboard

- [ ] Create a bootstrap root user with unrestricted admin access.
- [ ] Build the admin dashboard shell.
- [ ] List users and show activation status.
- [ ] Activate users.
- [ ] Deactivate users.
- [ ] Reflect user state changes in the app immediately.

## 9. Settings and registration controls

- [ ] Build a settings area for app-level access and registration policies.
- [ ] Add a toggle to enable or disable open self-registration.
- [ ] Generate shareable registration links when open self-registration is disabled.
- [ ] Validate registration links so invited users can still sign up when public registration is off.
- [ ] Show current registration mode and link status in the admin/settings UI.

## 10. Notifications

- [ ] Add push notification infrastructure.
- [ ] Request notification permission.
- [ ] Schedule or trigger habit reminders.
- [ ] Handle notification preferences per user.

## 11. Offline and sync

- [ ] Implement offline-first local persistence.
- [ ] Save habit actions locally before syncing.
- [ ] Add later sync flow for queued changes.
- [ ] Resolve sync conflicts and retries.
- [ ] Reflect online/offline status in the UI.

## 12. Polish and release readiness

- [x] Define and document the visual design system in `DESIGN.md`.
- [x] Build the unauthenticated landing page and responsive marketing navigation.
- [x] Refactor the current UI to Wind4 utility classes plus reusable components in `src/app/design_system/`.
- [ ] Improve loading, empty, and error states.
- [ ] Add accessibility and keyboard support checks.
- [ ] Polish app-wide UX and visual consistency.
- [ ] Review responsive behavior on mobile and desktop.
- [ ] Validate the full flow from signup to tracking and admin control.

## 13. Deferred access-control flow

- [ ] Persist auth user profiles with activation status in Firestore.
- [ ] Add post-signup admin activation flow.
- [ ] Handle inactive-user access so users can sign in but cannot use the app.
