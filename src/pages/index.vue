<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppLayout from '@/shared/components/AppLayout.vue'

/* ── Fake streak grid (14 weeks × 7 days) ─────────────── */
const LEVELS = [0, 0, 0, 1, 2, 3, 2, 1, 0, 3, 3, 2, 0, 0,
                0, 1, 2, 2, 3, 3, 1, 0, 2, 3, 3, 3, 1, 0,
                0, 2, 3, 3, 2, 1, 0, 1, 3, 3, 2, 3, 2, 1,
                1, 3, 3, 2, 1, 0, 0, 2, 3, 3, 1, 2, 3, 0,
                2, 3, 2, 1, 0, 1, 2, 3, 3, 2, 0, 3, 3, 2,
                3, 3, 1, 0, 2, 3, 3, 3, 2, 1, 0, 2, 3, 3,
                2, 1, 0, 1, 3, 3, 2, 2, 1, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const grid = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 14 }, (_, col) => LEVELS[row * 14 + col] ?? 0)
)

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const features = [
  { icon: 'i-lucide-check-circle-2', label: 'Build streaks',     color: 'green',  desc: 'Positive habits with daily or custom frequencies. Each check-in builds momentum.' },
  { icon: 'i-lucide-shield-off',     label: 'Break bad ones',    color: 'red',    desc: 'Track relapses on habits you want to reduce. Awareness is the first step.' },
  { icon: 'i-lucide-trending-up',    label: 'See the trend',     color: 'blue',   desc: 'Weekly and monthly views show your real completion rate — not just today.' },
  { icon: 'i-lucide-repeat-2',       label: 'Flexible schedule', color: 'purple', desc: 'Daily, weekly, or N times per week. Works around life, not against it.' },
  { icon: 'i-lucide-wifi-off',       label: 'Offline-first',     color: 'amber',  desc: 'Full functionality without a connection. Changes sync when you\'re back online.' },
  { icon: 'i-lucide-smartphone',     label: 'Install it',        color: 'blue',   desc: 'PWA — add it to your home screen. No app store, no friction.' },
] as const

const steps = [
  { n: '01', label: 'Create a habit',      desc: 'Name it, set a type and a frequency. Takes 20 seconds.' },
  { n: '02', label: 'Check in daily',      desc: 'Tap once to mark it done. Or log a relapse if it\'s negative.' },
  { n: '03', label: 'Watch it compound',   desc: 'Streaks, rates, and history reveal patterns over time.' },
] as const
</script>

<template>
  <AppLayout>

    <!-- Hero (dark) -->
    <section class="hero">
      <div class="hero-inner wrap">

        <div class="hero-copy">
          <h1 class="hero-title">Build habits.<br />Break patterns.<br />See the data.</h1>
          <p class="hero-desc">
            HAH is a no-nonsense habit tracker built for people who want data, not dopamine loops.
            Positive habits, negative habits, flexible schedules — all offline-ready.
          </p>
          <div class="hero-actions">
            <RouterLink to="/signup" class="btn-white">
              Create account <i class="i-lucide-arrow-right" />
            </RouterLink>
            <span class="hero-note">Email registration is live. Google and sign-in are available too.</span>
          </div>
        </div>

        <div class="hero-visual">
          <div class="streak-panel">
            <div class="streak-header">
              <span class="streak-title">exercise · 14-week streak</span>
              <span class="streak-chip">demo</span>
            </div>
            <div class="streak-grid">
              <div v-for="(row, ri) in grid" :key="ri" class="streak-row">
                <span class="streak-day">{{ days[ri] }}</span>
                <div
                  v-for="(level, ci) in row"
                  :key="ci"
                  class="streak-cell"
                  :class="`streak-cell--${level}`"
                />
              </div>
            </div>
            <div class="streak-legend">
              <span>less</span>
              <div class="streak-cell streak-cell--0" />
              <div class="streak-cell streak-cell--1" />
              <div class="streak-cell streak-cell--2" />
              <div class="streak-cell streak-cell--3" />
              <span>more</span>
            </div>
          </div>

          <div class="hero-stats">
            <div class="hero-stat">
              <span class="hero-stat-value mono">87%</span>
              <span class="hero-stat-label">completion this month</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value mono">14</span>
              <span class="hero-stat-label">day streak</span>
            </div>
            <div class="hero-stat">
              <span class="hero-stat-value mono">3</span>
              <span class="hero-stat-label">habits active</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Tech ribbon -->
    <div class="ribbon">
      <div class="ribbon-inner wrap">
        <span class="ribbon-item"><i class="i-lucide-wifi-off" /> Offline-first</span>
        <span class="ribbon-dot" />
        <span class="ribbon-item"><i class="i-lucide-flame" /> Firebase sync</span>
        <span class="ribbon-dot" />
        <span class="ribbon-item"><i class="i-lucide-smartphone" /> PWA installable</span>
        <span class="ribbon-dot" />
        <span class="ribbon-item"><i class="i-lucide-user-plus" /> Self-registration</span>
        <span class="ribbon-dot" />
        <span class="ribbon-item"><i class="i-lucide-code-2" /> Vue 3 + TypeScript</span>
      </div>
    </div>

    <!-- How it works -->
    <section class="section-steps">
      <div class="wrap">
        <div class="section-eyebrow mono">How it works</div>
        <div class="steps">
          <div v-for="s in steps" :key="s.n" class="step">
            <div class="step-number mono">{{ s.n }}</div>
            <div class="step-body">
              <div class="step-label">{{ s.label }}</div>
              <div class="step-desc">{{ s.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="section-features">
      <div class="wrap">
        <div class="section-eyebrow mono">What's included</div>
        <div class="features-grid">
          <div v-for="f in features" :key="f.label" class="feature">
            <span class="feature-icon" :class="`feature-icon--${f.color}`">
              <i :class="f.icon" />
            </span>
            <div class="feature-body">
              <div class="feature-label">{{ f.label }}</div>
              <div class="feature-desc">{{ f.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="wrap cta-inner">
        <div>
          <div class="cta-title mono">Start building momentum today.</div>
          <div class="cta-sub">
            Free, offline-first, and yours to own.
            <span class="chip-wip">
              <i class="i-lucide-circle-alert" /> work in progress
            </span>
          </div>
        </div>
        <RouterLink to="/signup" class="btn-cta">
          <i class="i-lucide-user-plus" />
          Create account
        </RouterLink>
      </div>
    </section>

  </AppLayout>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────── */
.wrap {
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

.mono { font-family: var(--mono); }

/* ── Hero ────────────────────────────────────────────── */
.hero {
  background: var(--ink);
  padding: 72px 0 64px;
  border-bottom: 1px solid #2a2a28;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 64px;
  align-items: center;
}

@media (max-width: 860px) {
  .hero-inner { grid-template-columns: 1fr; }
}

.hero-label {
  display: inline-block;
  font-family: var(--mono);
  font-size: var(--text-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 20px;
}

.hero-title {
  font-family: var(--mono);
  font-size: var(--text-6xl);
  line-height: var(--text-6xl--line-height);
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}

.hero-desc {
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.75;
  max-width: 420px;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-white {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 36px;
  padding: 0 18px;
  font-family: var(--mono);
  font-size: var(--text-sm);
  font-weight: 500;
  background: #fff;
  border: 1px solid #fff;
  color: var(--ink);
  border-radius: 2px;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn-white:disabled { opacity: 0.35; cursor: not-allowed; }

.hero-note {
  font-family: var(--mono);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.25);
}

/* ── Streak visual ───────────────────────────────────── */
.streak-panel {
  background: #1a1a18;
  border: 1px solid #2e2e2b;
  border-radius: 3px;
  overflow: hidden;
}

.streak-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid #2e2e2b;
}

.streak-title {
  font-family: var(--mono);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
}

.streak-chip {
  font-family: var(--mono);
  font-size: var(--text-xs);
  padding: 1px 7px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.streak-grid {
  padding: 14px 14px 10px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.streak-row {
  display: flex;
  align-items: center;
  gap: 3px;
}

.streak-day {
  font-family: var(--mono);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.2);
  width: 22px;
  text-align: right;
  margin-right: 4px;
  flex-shrink: 0;
}

.streak-cell {
  width: 14px;
  height: 14px;
  border-radius: 1px;
  flex-shrink: 0;
}

.streak-cell--0 { background: rgba(255, 255, 255, 0.06); }
.streak-cell--1 { background: #166534; }
.streak-cell--2 { background: #15803d; }
.streak-cell--3 { background: #22c55e; }

.streak-legend {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 14px 12px;
  font-family: var(--mono);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.2);
}

.streak-legend span { padding: 0 2px; }

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
  border: 1px solid #2e2e2b;
  border-radius: 2px;
  overflow: hidden;
}

.hero-stat {
  padding: 12px 14px;
  border-right: 1px solid #2e2e2b;
  background: #1a1a18;
}

.hero-stat:last-child { border-right: none; }

.hero-stat-value {
  display: block;
  font-size: var(--text-xl);
  font-weight: 600;
  color: #fff;
  letter-spacing: -0.02em;
}

.hero-stat-label {
  display: block;
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.3);
  margin-top: 2px;
}

/* ── Tech ribbon ─────────────────────────────────────── */
.ribbon {
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
}

.ribbon-inner {
  height: 44px;
  display: flex;
  align-items: center;
  gap: 16px;
  overflow-x: auto;
  scrollbar-width: none;
}

.ribbon-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--mono);
  font-size: var(--text-xs);
  color: var(--ink2);
  white-space: nowrap;
}

.ribbon-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--border2);
  flex-shrink: 0;
}

/* ── Section eyebrow ─────────────────────────────────── */
.section-eyebrow {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ink3);
  margin-bottom: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

/* ── Steps ───────────────────────────────────────────── */
.section-steps {
  padding: 56px 0;
  border-bottom: 1px solid var(--border);
  background: var(--bg2);
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 640px) {
  .steps { grid-template-columns: 1fr; gap: 32px; }
  .step { padding: 0 !important; border-right: none !important; border-bottom: 1px solid var(--border); padding-bottom: 24px !important; }
  .step:last-child { border-bottom: none; }
}

.step {
  display: flex;
  gap: 20px;
  padding: 0 32px 0 0;
  border-right: 1px solid var(--border);
}

.step:first-child { padding-left: 0; }
.step:last-child  { border-right: none; padding-right: 0; padding-left: 32px; }
.step:nth-child(2) { padding-left: 32px; }

.step-number {
  font-size: var(--text-4xl);
  line-height: var(--text-4xl--line-height);
  font-weight: 600;
  color: var(--border2);
  flex-shrink: 0;
  padding-top: 2px;
}

.step-label {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 6px;
}

.step-desc {
  font-size: var(--text-sm);
  color: var(--ink2);
  line-height: 1.65;
}

/* ── Features ────────────────────────────────────────── */
.section-features {
  padding: 56px 0;
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px 40px;
}

@media (max-width: 768px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .features-grid { grid-template-columns: 1fr; } }

.feature {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 2px;
  font-size: var(--text-base);
  flex-shrink: 0;
  border: 1px solid;
  margin-top: 1px;
}

.feature-icon--green  { background: var(--green-bg);  color: var(--green);  border-color: var(--green-mid); }
.feature-icon--red    { background: var(--red-bg);    color: var(--red);    border-color: var(--red-mid); }
.feature-icon--blue   { background: var(--blue-bg);   color: var(--blue);   border-color: var(--blue-mid); }
.feature-icon--purple { background: var(--purple-bg); color: var(--purple); border-color: var(--purple-mid); }
.feature-icon--amber  { background: var(--amber-bg);  color: var(--amber);  border-color: var(--amber-mid); }

.feature-label { font-size: var(--text-sm); font-weight: 600; color: var(--ink); margin-bottom: 4px; }
.feature-desc  { font-size: var(--text-sm); color: var(--ink2); line-height: 1.65; }

/* ── CTA ─────────────────────────────────────────────── */
.cta {
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  padding: 56px 0;
}

.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

@media (max-width: 640px) {
  .cta-inner { flex-direction: column; align-items: flex-start; }
}

.cta-title {
  font-size: var(--text-2xl);
  line-height: var(--text-2xl--line-height);
  font-weight: 600;
  color: var(--ink);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.cta-sub {
  font-size: var(--text-sm);
  color: var(--ink2);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.chip-wip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--mono);
  font-size: var(--text-xs);
  font-weight: 500;
  padding: 2px 8px;
  background: var(--amber-bg);
  border: 1px solid var(--amber-mid);
  color: var(--amber);
  border-radius: 2px;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 38px;
  padding: 0 20px;
  font-family: var(--mono);
  font-size: var(--text-sm);
  font-weight: 500;
  background: var(--ink);
  border: 1px solid var(--ink);
  color: #fff;
  border-radius: 2px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.15s;
}

.btn-cta:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
