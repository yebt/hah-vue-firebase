<script setup lang="ts">
import AppLayout from '@/shared/components/AppLayout.vue'

const features = [
  {
    icon: 'i-lucide-check-circle',
    title: 'Positive habits',
    description: 'Track simple or countable habits with streaks and goal highlights.',
    accent: 'emerald',
  },
  {
    icon: 'i-lucide-shield-off',
    title: 'Negative habits',
    description: 'Log occurrences of habits you want to reduce over time.',
    accent: 'rose',
  },
  {
    icon: 'i-lucide-bar-chart-2',
    title: 'Analytics',
    description: 'Full dashboard with progress, history, and trend summaries.',
    accent: 'sky',
  },
  {
    icon: 'i-lucide-wifi-off',
    title: 'Offline-first',
    description: 'Works without a connection and syncs changes when back online.',
    accent: 'amber',
  },
] as const
</script>

<template>
  <AppLayout>
    <!-- Hero -->
    <section class="hero">
      <div class="hero__inner">
        <span class="hero__badge">
          <i class="i-lucide-construction mr-1" />
          Work in progress
        </span>

        <h1 class="hero__title">Build momentum,<br />one habit at a time.</h1>

        <p class="hero__subtitle">
          HAH is a personal habit tracker. Create positive and negative habits, set frequencies, and
          watch your streaks grow — with full offline support and real-time sync via Firebase.
        </p>

        <div class="hero__cta">
          <button class="btn btn--primary" disabled title="Auth coming in the next slice">
            <i class="i-lucide-log-in mr-1.5" />
            Get started
          </button>
          <span class="hero__cta-note">Authentication coming soon</span>
        </div>
      </div>
    </section>

    <!-- Feature grid -->
    <section class="features">
      <div class="features__inner">
        <h2 class="features__heading">What's planned</h2>
        <ul class="features__grid" role="list">
          <li v-for="f in features" :key="f.title" class="feature-card" :class="`feature-card--${f.accent}`">
            <span class="feature-card__icon" aria-hidden="true">
              <i :class="f.icon" />
            </span>
            <h3 class="feature-card__title">{{ f.title }}</h3>
            <p class="feature-card__desc">{{ f.description }}</p>
          </li>
        </ul>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
/* Hero */
.hero {
  @apply py-20 px-4;
}

.hero__inner {
  @apply max-w-2xl mx-auto flex flex-col items-center text-center gap-6;
}

.hero__badge {
  @apply inline-flex items-center text-xs font-medium px-3 py-1 rounded-sm
    bg-amber-100 text-amber-800 border border-amber-300 font-mono tracking-wide;
}

.hero__title {
  @apply text-4xl sm:text-5xl font-bold text-slate-900 leading-tight;
}

.hero__subtitle {
  @apply text-lg text-slate-600 max-w-xl;
}

.hero__cta {
  @apply flex flex-col items-center gap-2 mt-2;
}

.hero__cta-note {
  @apply text-xs text-slate-500 font-mono;
}

/* Shared button */
.btn {
  @apply inline-flex items-center px-5 py-2.5 rounded-sm font-semibold text-sm
    transition-colors focus-visible:outline-none focus-visible:ring-2;
}

.btn--primary {
  @apply bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-400
    disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Features */
.features {
  @apply pb-24 px-4;
}

.features__inner {
  @apply max-w-5xl mx-auto;
}

.features__heading {
  @apply text-center text-sm font-semibold uppercase tracking-widest text-slate-500 mb-8 font-mono;
}

.features__grid {
  @apply grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0;
}

/* Feature card */
.feature-card {
  @apply bg-white rounded-sm border border-slate-200 p-5 flex flex-col gap-3
    shadow-sm hover:shadow-md transition-shadow;
}

.feature-card__icon {
  @apply w-9 h-9 rounded-sm flex items-center justify-center text-xl border;
}

.feature-card__title {
  @apply font-semibold text-slate-900 text-sm font-mono;
}

.feature-card__desc {
  @apply text-sm text-slate-600 leading-relaxed;
}

.feature-card--emerald .feature-card__icon {
  @apply bg-emerald-100 text-emerald-700 border-emerald-300;
}

.feature-card--rose .feature-card__icon {
  @apply bg-rose-100 text-rose-700 border-rose-300;
}

.feature-card--sky .feature-card__icon {
  @apply bg-sky-100 text-sky-700 border-sky-300;
}

.feature-card--amber .feature-card__icon {
  @apply bg-amber-100 text-amber-700 border-amber-300;
}
</style>
