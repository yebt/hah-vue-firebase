# WORK

Visual execution roadmap for the habit app. This file tracks the delivery path from the current foundation toward a complete product.

## Status legend

- [x] Done
- [~] In progress
- [ ] Pending

## Current roadmap view

### Phase 1 — Access foundation
**Goal:** make authentication, session restore, and access control reliable.

- [ ] Stabilize auth state boot, persistence, and session restoration on reload.
- [ ] Add auth-ready handling to avoid incorrect redirects or UI flashes while Firebase restores the session.
- [ ] Persist auth user profiles with role and activation status in Firestore.
- [ ] Implement role-based access for admin and regular users.
- [ ] Add route guards and protected layouts.
- [ ] Handle inactive-user access so users can sign in but cannot use the app.

**Exit criteria**
- Reloading the app does not flash the wrong auth state.
- Private routes are protected.
- Admin and regular users land in the correct areas.
- Inactive users can authenticate but cannot operate the app.

---

### Phase 2 — Admin operations
**Goal:** make user activation and access management operable from the UI.

- [ ] Build the admin dashboard shell.
- [ ] List users with role and activation status.
- [ ] Activate users.
- [ ] Deactivate users.
- [ ] Reflect user state changes in the app immediately.
- [ ] Add post-signup admin activation flow.

**Exit criteria**
- A root/admin user can manage activation without touching Firestore manually.

---

### Phase 3 — Domain model
**Goal:** define the product core before implementing tracking logic.

- [ ] Define the data model for users, habits, entries, computed progress, and sync metadata.
- [ ] Normalize habit types, units, and frequency rules.
- [ ] Define Firestore collections, ownership rules, and query strategy for habits and entries.

**Exit criteria**
- The domain model is stable enough to build CRUD and tracking without improvising structure.

---

### Phase 4 — Habit CRUD
**Goal:** let users manage the set of habits they want to track.

- [ ] Create habit CRUD for positive and negative habits.
- [ ] Add habit creation and editing forms.
- [ ] Add habit deletion and archive handling if needed by the spec.
- [ ] Validate habit type, unit, and frequency compatibility.

**Exit criteria**
- A user can create, edit, archive, and manage habits end-to-end.

---

### Phase 5 — Frequency and positive tracking engine
**Goal:** implement the main tracking loop for positive habits.

- [ ] Implement preset frequencies: daily, weekly, monthly, 2 times a week, 3 times a week, 3 times in the day, and 1 time in the month.
- [ ] Add custom weekly and monthly schedule rules.
- [ ] Compute current period boundaries for each schedule type.
- [ ] Implement simple habits with done / not done tracking.
- [ ] Implement countable habits with unit, minimum, goal, and progress states.
- [ ] Support multiple entries per period and sum them into a single progress value.
- [ ] Apply evaluation states for missed, partial, complete, and above-goal progress.
- [ ] Add GitHub-style highlight treatment when progress exceeds the goal.
- [ ] Track streaks for positive habits.

**Exit criteria**
- Positive habits can be tracked correctly across their active periods with valid evaluation states.

---

### Phase 6 — Negative habit tracking
**Goal:** support simple occurrence tracking for habits to avoid.

- [ ] Implement simple occurrence logging for negative habits.
- [ ] Track reductions over time for bad habits.
- [ ] Show negative-habit history and period summaries.

**Exit criteria**
- Negative habits provide useful logging and trend visibility.

---

### Phase 7 — Dashboard and analytics
**Goal:** replace placeholders with real product insights.

- [ ] Replace placeholder dashboard cards with live habit data.
- [ ] Add streak, progress, and history views.
- [ ] Build the full analytics dashboard.
- [ ] Add charts and summaries for positive and negative habits.
- [ ] Surface per-habit completion and trend metrics.

**Exit criteria**
- The dashboard reflects real user behavior and analytics rather than static placeholders.

---

### Phase 8 — Registration controls
**Goal:** allow the admin to control how new users can join.

- [ ] Build a settings area for app-level access and registration policies.
- [ ] Add a toggle to enable or disable open self-registration.
- [ ] Generate shareable registration links when open self-registration is disabled.
- [ ] Validate registration links so invited users can still sign up when public registration is off.
- [ ] Show current registration mode and link status in the admin/settings UI.

**Exit criteria**
- Registration can be operated from the app using either public signup or invite-only mode.

---

### Phase 9 — Notifications
**Goal:** add reminders that support the habit loop.

- [ ] Add push notification infrastructure.
- [ ] Request notification permission.
- [ ] Schedule or trigger habit reminders.
- [ ] Handle notification preferences per user.

**Exit criteria**
- Users can opt in and receive reminders based on their preferences.

---

### Phase 10 — Offline and sync
**Goal:** support the PWA/offline-first direction from the spec.

- [ ] Implement offline-first local persistence.
- [ ] Save habit actions locally before syncing.
- [ ] Add later sync flow for queued changes.
- [ ] Resolve sync conflicts and retries.
- [ ] Reflect online/offline status in the UI.

**Exit criteria**
- The app remains usable while offline and syncs safely once connectivity returns.

---

### Phase 11 — Polish and release validation
**Goal:** make the product feel complete and trustworthy.

- [ ] Improve loading, empty, and error states.
- [ ] Add accessibility and keyboard support checks.
- [ ] Polish app-wide UX and visual consistency.
- [ ] Review responsive behavior on mobile and desktop.
- [ ] Validate the full flow from signup to tracking and admin control.

**Exit criteria**
- The end-to-end flow works cleanly and is ready for release-quality review.

---

## Suggested execution order

1. Phase 1 — Access foundation
2. Phase 2 — Admin operations
3. Phase 3 — Domain model
4. Phase 4 — Habit CRUD
5. Phase 5 — Frequency and positive tracking engine
6. Phase 6 — Negative habit tracking
7. Phase 7 — Dashboard and analytics
8. Phase 8 — Registration controls
9. Phase 9 — Notifications
10. Phase 10 — Offline and sync
11. Phase 11 — Polish and release validation

## Current recommendation

**Start now with Phase 1.**

That is the highest-leverage work because it removes the session/auth instability and unlocks admin flow, protected navigation, and the rest of the product safely.
