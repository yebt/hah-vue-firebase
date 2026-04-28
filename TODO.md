# TODO

Implementation backlog for `SPECS.md`, reordered by delivery dependency so the next steps follow the real gaps in the current codebase.

## Recommended execution path

1. Close auth/session boot, guards, roles, and activation flow.
2. Build the admin surface needed to operate user activation and registration policy.
3. Define the domain model for habits, entries, frequencies, and sync metadata.
4. Implement habit CRUD and the tracking engine before expanding dashboards.
5. Add analytics, notifications, offline sync, and final polish once the core loop works.

## 1. Project foundation

- [x] Set up Vue 3, file-based routing, Pinia, Pinia Colada, UnoCSS, Lucide icons, Wind4 / Tailwind 4, Firebase, VueFire, and Vite PWA.
- [x] Create the base app layout, navigation shell, and shared UI primitives.
- [x] Configure environment variables and Firebase app initialization.
- [x] Add shared state, query, and API/service conventions.
- [x] Define and document the visual design system in `DESIGN.md`.
- [x] Build the unauthenticated landing page and responsive marketing navigation.
- [x] Refactor the current UI to Wind4 utility classes plus reusable components in `src/app/design_system/`.

## 2. Authentication, session boot, and access control

- [x] Configure email/password login.
- [x] Add an email/password sign-in page with auth-state feedback and sign-out.
- [x] Configure Google sign-in.
- [x] Implement self-registration.
- [x] Add a dedicated sign-up page with password confirmation and success state.
- [ ] Stabilize auth state boot, persistence, and session restoration on reload.
- [ ] Add auth-ready handling to avoid incorrect redirects or UI flashes while Firebase restores the session.
- [ ] Persist auth user profiles with role and activation status in Firestore.
- [ ] Implement role-based access for admin and regular users.
- [ ] Add route guards and protected layouts.
- [ ] Handle inactive-user access so users can sign in but cannot use the app.

## 3. Admin access-control operations

- [x] Create a bootstrap root user with unrestricted admin access.
- [ ] Build the admin dashboard shell.
- [ ] List users and show role and activation status.
- [ ] Activate users.
- [ ] Deactivate users.
- [ ] Reflect user state changes in the app immediately.
- [ ] Add post-signup admin activation flow.

## 4. Settings and registration controls

- [ ] Build a settings area for app-level access and registration policies.
- [ ] Add a toggle to enable or disable open self-registration.
- [ ] Generate shareable registration links when open self-registration is disabled.
- [ ] Validate registration links so invited users can still sign up when public registration is off.
- [ ] Show current registration mode and link status in the admin/settings UI.

## 5. Domain model and habit setup

- [ ] Define the data model for users, habits, entries, computed progress, and sync metadata.
- [ ] Normalize habit types, units, and frequency rules.
- [ ] Define Firestore collections, ownership rules, and query strategy for habits and entries.
- [ ] Create habit CRUD for positive and negative habits.
- [ ] Add habit creation and editing forms.
- [ ] Add habit deletion and archive handling if needed by the spec.

## 6. Frequency rules engine

- [ ] Implement preset frequencies: daily, weekly, monthly, 2 times a week, 3 times a week, 3 times in the day, and 1 time in the month.
- [ ] Add custom weekly and monthly schedule rules.
- [ ] Validate frequency compatibility per habit type.
- [ ] Compute current period boundaries for each schedule type.

## 7. Positive habit tracking

- [ ] Implement simple habits with done / not done tracking.
- [ ] Implement countable habits with unit, minimum, goal, and progress states.
- [ ] Support multiple entries per period and sum them into a single progress value.
- [ ] Apply evaluation states for missed, partial, complete, and above-goal progress.
- [ ] Add GitHub-style highlight treatment when progress exceeds the goal.
- [ ] Track streaks for positive habits.

## 8. Negative habit tracking

- [ ] Implement simple occurrence logging for negative habits.
- [ ] Track reductions over time for bad habits.
- [ ] Show negative-habit history and period summaries.

## 9. User dashboard and analytics

- [x] Create the initial user dashboard shell.
- [ ] Replace placeholder dashboard cards with live habit data.
- [ ] Add streak, progress, and history views.
- [ ] Build the full analytics dashboard.
- [ ] Add charts and summaries for positive and negative habits.
- [ ] Surface per-habit completion and trend metrics.

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

- [ ] Improve loading, empty, and error states.
- [ ] Add accessibility and keyboard support checks.
- [ ] Polish app-wide UX and visual consistency.
- [ ] Review responsive behavior on mobile and desktop.
- [ ] Validate the full flow from signup to tracking and admin control.
