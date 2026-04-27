<script setup lang="ts">
import { computed } from 'vue'
import DsButton from '@/app/design_system/DsButton.vue'
import DsSectionEyebrow from '@/app/design_system/DsSectionEyebrow.vue'
import AppLayout from '@/shared/components/AppLayout.vue'
import { useAuthSessionStore } from '@/modules/auth/stores/auth-session'

const authSession = useAuthSessionStore()
authSession.ensureInitialized()

const levelClasses = {
  0: '[background:rgba(255,255,255,0.06)]',
  1: '[background:#166534]',
  2: '[background:#15803d]',
  3: '[background:#22c55e]',
} as const

const featureToneClasses = {
  amber: '[background:var(--amber-bg)] [color:var(--amber)] [border-color:var(--amber-mid)]',
  blue: '[background:var(--blue-bg)] [color:var(--blue)] [border-color:var(--blue-mid)]',
  green: '[background:var(--green-bg)] [color:var(--green)] [border-color:var(--green-mid)]',
  purple: '[background:var(--purple-bg)] [color:var(--purple)] [border-color:var(--purple-mid)]',
  red: '[background:var(--red-bg)] [color:var(--red)] [border-color:var(--red-mid)]',
} as const

const LEVELS = [
  0, 0, 0, 1, 2, 3, 2, 1, 0, 3, 3, 2, 0, 0,
  0, 1, 2, 2, 3, 3, 1, 0, 2, 3, 3, 3, 1, 0,
  0, 2, 3, 3, 2, 1, 0, 1, 3, 3, 2, 3, 2, 1,
  1, 3, 3, 2, 1, 0, 0, 2, 3, 3, 1, 2, 3, 0,
  2, 3, 2, 1, 0, 1, 2, 3, 3, 2, 0, 3, 3, 2,
  3, 3, 1, 0, 2, 3, 3, 3, 2, 1, 0, 2, 3, 3,
  2, 1, 0, 1, 3, 3, 2, 2, 1, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
] as const

const grid = Array.from({ length: 7 }, (_, row) =>
  Array.from({ length: 14 }, (_, col) => LEVELS[row * 14 + col] ?? 0)
)

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const features = [
  {
    color: 'green',
    desc: 'Positive habits with daily or custom frequencies. Each check-in builds momentum.',
    icon: 'i-lucide-check-circle-2',
    label: 'Build streaks',
  },
  {
    color: 'red',
    desc: 'Track relapses on habits you want to reduce. Awareness is the first step.',
    icon: 'i-lucide-shield-off',
    label: 'Break bad ones',
  },
  {
    color: 'blue',
    desc: 'Weekly and monthly views show your real completion rate — not just today.',
    icon: 'i-lucide-trending-up',
    label: 'See the trend',
  },
  {
    color: 'purple',
    desc: 'Daily, weekly, or N times per week. Works around life, not against it.',
    icon: 'i-lucide-repeat-2',
    label: 'Flexible schedule',
  },
  {
    color: 'amber',
    desc: "Full functionality without a connection. Changes sync when you're back online.",
    icon: 'i-lucide-wifi-off',
    label: 'Offline-first',
  },
  {
    color: 'blue',
    desc: 'PWA — add it to your home screen. No app store, no friction.',
    icon: 'i-lucide-smartphone',
    label: 'Install it',
  },
] as const

const steps = [
  { desc: 'Name it, set a type and a frequency. Takes 20 seconds.', label: 'Create a habit', n: '01' },
  { desc: "Tap once to mark it done. Or log a relapse if it's negative.", label: 'Check in daily', n: '02' },
  { desc: 'Streaks, rates, and history reveal patterns over time.', label: 'Watch it compound', n: '03' },
] as const

const primaryCtaTo = computed(() => (authSession.isAuthenticated ? '/dashboard' : '/signup'))
const primaryCtaLabel = computed(() => (authSession.isAuthenticated ? 'Open dashboard' : 'Create account'))
const secondaryHeroCopy = computed(() =>
  authSession.isAuthenticated
    ? authSession.isRootUser
      ? 'Your dashboard is ready and this session is already bootstrapped as root for the upcoming admin shell.'
      : 'Your signed-in dashboard is ready. Root bootstrap and the admin shell are the next modules.'
    : 'Email registration is live. Google and sign-in are available too.'
)
</script>

<template>
  <AppLayout>
    <section
      id="overview"
      class="border-b py-[72px] [border-color:#2a2a28] [background:var(--ink)] max-sm:py-14"
    >
      <div
        class="mx-auto grid w-full max-w-[var(--max)] grid-cols-[1fr_380px] items-center gap-16 px-[var(--gutter)] max-[860px]:grid-cols-1"
      >
        <div>
          <h1
            class="[font-family:var(--mono)] [font-size:var(--text-6xl)] [line-height:var(--lh-6xl)] font-semibold tracking-[-0.03em] text-white max-sm:[font-size:var(--text-4xl)] max-sm:[line-height:var(--lh-4xl)]"
          >
            Build habits.<br />
            Break patterns.<br />
            See the data.
          </h1>

          <p
            class="mt-5 max-w-[420px] [font-size:var(--text-base)] [line-height:1.75] [color:rgba(255,255,255,0.5)]"
          >
            HAH is a no-nonsense habit tracker built for people who want data, not dopamine loops.
            Positive habits, negative habits, flexible schedules — all offline-ready.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-4">
            <DsButton size="md" :to="primaryCtaTo" variant="light">
              {{ primaryCtaLabel }}
              <i class="i-lucide-arrow-right" />
            </DsButton>
            <span
              class="[font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [color:rgba(255,255,255,0.25)]"
            >
              {{ secondaryHeroCopy }}
            </span>
          </div>
        </div>

        <div>
          <div class="overflow-hidden rounded-[3px] border [border-color:#2e2e2b] [background:#1a1a18]">
            <div class="flex items-center justify-between border-b px-[14px] py-[10px] [border-color:#2e2e2b]">
              <span
                class="[font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:rgba(255,255,255,0.4)]"
              >
                exercise · 14-week streak
              </span>
              <span
                class="rounded-[2px] border px-[7px] py-[1px] [border-color:rgba(255,255,255,0.1)] [background:rgba(255,255,255,0.06)] [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] [color:rgba(255,255,255,0.3)]"
              >
                demo
              </span>
            </div>

            <div class="flex flex-col gap-[3px] px-[14px] pb-[10px] pt-[14px]">
              <div v-for="(row, ri) in grid" :key="ri" class="flex items-center gap-[3px]">
                <span
                  class="mr-1 w-[22px] shrink-0 text-right [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] [color:rgba(255,255,255,0.2)]"
                >
                  {{ days[ri] }}
                </span>
                <div
                  v-for="(level, ci) in row"
                  :key="ci"
                  class="h-[14px] w-[14px] shrink-0 rounded-[1px]"
                  :class="levelClasses[level]"
                />
              </div>
            </div>

            <div
              class="flex items-center gap-1 px-[14px] pb-3 pt-2 [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] [color:rgba(255,255,255,0.2)]"
            >
              <span class="px-[2px]">less</span>
              <div class="h-[14px] w-[14px] rounded-[1px]" :class="levelClasses[0]" />
              <div class="h-[14px] w-[14px] rounded-[1px]" :class="levelClasses[1]" />
              <div class="h-[14px] w-[14px] rounded-[1px]" :class="levelClasses[2]" />
              <div class="h-[14px] w-[14px] rounded-[1px]" :class="levelClasses[3]" />
              <span class="px-[2px]">more</span>
            </div>
          </div>

          <div
            class="mt-[10px] grid grid-cols-3 overflow-hidden rounded-[2px] border [border-color:#2e2e2b]"
          >
            <div class="border-r px-[14px] py-3 [border-color:#2e2e2b] [background:#1a1a18]">
              <span
                class="block [font-family:var(--mono)] [font-size:var(--text-xl)] [line-height:var(--lh-xl)] font-semibold tracking-[-0.02em] text-white"
              >
                87%
              </span>
              <span
                class="mt-0.5 block [font-size:var(--text-xs)] [line-height:var(--lh-xs)] [color:rgba(255,255,255,0.3)]"
              >
                completion this month
              </span>
            </div>
            <div class="border-r px-[14px] py-3 [border-color:#2e2e2b] [background:#1a1a18]">
              <span
                class="block [font-family:var(--mono)] [font-size:var(--text-xl)] [line-height:var(--lh-xl)] font-semibold tracking-[-0.02em] text-white"
              >
                14
              </span>
              <span
                class="mt-0.5 block [font-size:var(--text-xs)] [line-height:var(--lh-xs)] [color:rgba(255,255,255,0.3)]"
              >
                day streak
              </span>
            </div>
            <div class="px-[14px] py-3 [background:#1a1a18]">
              <span
                class="block [font-family:var(--mono)] [font-size:var(--text-xl)] [line-height:var(--lh-xl)] font-semibold tracking-[-0.02em] text-white"
              >
                3
              </span>
              <span
                class="mt-0.5 block [font-size:var(--text-xs)] [line-height:var(--lh-xs)] [color:rgba(255,255,255,0.3)]"
              >
                habits active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="border-b [border-color:var(--border)] [background:var(--bg2)]">
      <div
        class="mx-auto flex h-11 max-w-[var(--max)] items-center gap-4 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none]"
      >
        <span
          class="inline-flex items-center gap-1.5 whitespace-nowrap [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [color:var(--ink2)]"
        >
          <i class="i-lucide-wifi-off" />
          Offline-first
        </span>
        <span class="h-[3px] w-[3px] shrink-0 rounded-full [background:var(--border2)]" />
        <span
          class="inline-flex items-center gap-1.5 whitespace-nowrap [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [color:var(--ink2)]"
        >
          <i class="i-lucide-flame" />
          Firebase sync
        </span>
        <span class="h-[3px] w-[3px] shrink-0 rounded-full [background:var(--border2)]" />
        <span
          class="inline-flex items-center gap-1.5 whitespace-nowrap [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [color:var(--ink2)]"
        >
          <i class="i-lucide-smartphone" />
          PWA installable
        </span>
        <span class="h-[3px] w-[3px] shrink-0 rounded-full [background:var(--border2)]" />
        <span
          class="inline-flex items-center gap-1.5 whitespace-nowrap [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [color:var(--ink2)]"
        >
          <i class="i-lucide-user-plus" />
          Self-registration
        </span>
        <span class="h-[3px] w-[3px] shrink-0 rounded-full [background:var(--border2)]" />
        <span
          class="inline-flex items-center gap-1.5 whitespace-nowrap [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] [color:var(--ink2)]"
        >
          <i class="i-lucide-code-2" />
          Vue 3 + TypeScript
        </span>
      </div>
    </div>

    <section id="habits" class="border-b [border-color:var(--border)] [background:var(--bg2)]">
      <div class="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-14">
        <DsSectionEyebrow>How it works</DsSectionEyebrow>

        <div class="grid grid-cols-3 max-sm:grid-cols-1 max-sm:gap-8">
          <div
            v-for="(step, index) in steps"
            :key="step.n"
            class="flex gap-5 pr-8 border-r [border-color:var(--border)] last:border-r-0 last:pr-0 nth-[2]:pl-8 last:pl-8 max-sm:border-r-0 max-sm:border-b max-sm:pb-6 max-sm:pl-0 max-sm:pr-0 max-sm:last:border-b-0 max-sm:last:pb-0"
            :class="index === 1 ? 'pl-8 max-sm:pl-0' : ''"
          >
            <div
              class="shrink-0 pt-0.5 [font-family:var(--mono)] [font-size:var(--text-4xl)] [line-height:var(--lh-4xl)] font-semibold [color:var(--border2)]"
            >
              {{ step.n }}
            </div>
            <div>
              <div class="mb-1.5 [font-size:var(--text-base)] [line-height:var(--lh-base)] font-semibold [color:var(--ink)]">
                {{ step.label }}
              </div>
              <div class="[font-size:var(--text-sm)] [line-height:1.65] [color:var(--ink2)]">
                {{ step.desc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="analytics" class="border-b [border-color:var(--border)] [background:var(--bg)]">
      <div class="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-14">
        <DsSectionEyebrow>What's included</DsSectionEyebrow>

        <div class="grid grid-cols-3 gap-x-10 gap-y-7 max-md:grid-cols-2 max-sm:grid-cols-1">
          <div v-for="feature in features" :key="feature.label" class="flex items-start gap-3.5">
            <span
              class="mt-[1px] flex h-[30px] w-[30px] shrink-0 items-center justify-center border rounded-[2px] [font-size:var(--text-base)]"
              :class="featureToneClasses[feature.color]"
            >
              <i :class="feature.icon" />
            </span>

            <div>
              <div class="mb-1 [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-semibold [color:var(--ink)]">
                {{ feature.label }}
              </div>
              <div class="[font-size:var(--text-sm)] [line-height:1.65] [color:var(--ink2)]">
                {{ feature.desc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b py-14 [border-color:var(--border)] [background:var(--bg2)]">
      <div class="mx-auto flex max-w-[var(--max)] items-center justify-between gap-8 px-[var(--gutter)] max-sm:flex-col max-sm:items-start">
        <div>
          <div
            class="[font-family:var(--mono)] [font-size:var(--text-2xl)] [line-height:var(--lh-2xl)] font-semibold tracking-[-0.02em] [color:var(--ink)]"
          >
            Start building momentum today.
          </div>
          <div class="mt-2 flex flex-wrap items-center gap-3 [font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]">
            <span>Free, offline-first, and yours to own.</span>
            <span
              class="inline-flex items-center gap-1 rounded-[2px] border px-2 py-[2px] [border-color:var(--amber-mid)] [background:var(--amber-bg)] [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-medium [color:var(--amber)]"
            >
              <i class="i-lucide-circle-alert" />
              work in progress
            </span>
          </div>
        </div>

        <DsButton :to="primaryCtaTo">
          <i :class="authSession.isAuthenticated ? 'i-lucide-layout-dashboard' : 'i-lucide-user-plus'" />
          {{ primaryCtaLabel }}
        </DsButton>
      </div>
    </section>
  </AppLayout>
</template>
