<script setup lang="ts">
import { computed } from 'vue'
import DsButton from '@/app/design_system/DsButton.vue'
import DsPanel from '@/app/design_system/DsPanel.vue'
import AppLayout from '@/shared/components/AppLayout.vue'
import { useAuthSessionStore } from '@/modules/auth/stores/auth-session'

const authSession = useAuthSessionStore()
authSession.ensureInitialized()

const accountLabel = computed(
  () => authSession.user?.displayName || authSession.user?.email?.split('@')[0] || 'builder'
)

const accountIdentity = computed(
  () => authSession.user?.email || authSession.user?.displayName || authSession.user?.uid || 'Unknown user'
)

const createdAtLabel = computed(() => {
  const creationTime = authSession.user?.metadata.creationTime

  if (!creationTime) {
    return 'Recently'
  }

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(creationTime))
})

const toneClasses = {
  amber: '[border-color:var(--amber-mid)] [background:var(--amber-bg)] [color:var(--amber)]',
  blue: '[border-color:var(--blue-mid)] [background:var(--blue-bg)] [color:var(--blue)]',
  green: '[border-color:var(--green-mid)] [background:var(--green-bg)] [color:var(--green)]',
} as const

type ReadinessCard = {
  description: string
  icon: string
  title: string
  tone: keyof typeof toneClasses
  value: string
}

const readinessCards = computed<ReadonlyArray<ReadinessCard>>(() => [
  {
    icon: 'i-lucide-user-check',
    title: 'Authenticated session',
    value: 'Ready',
    description: 'Email/password, Google sign-in, and self-registration are already live.',
    tone: 'green',
  },
  {
    icon: 'i-lucide-layout-dashboard',
    title: 'Current milestone',
    value: 'Dashboard v1',
    description: 'This is the first signed-in home while the habit domain is being connected.',
    tone: 'blue',
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Admin bootstrap',
    value: authSession.isRootUser ? 'Root ready' : 'Awaiting root sign-in',
    description:
      'A configured root email now promotes itself automatically so the admin shell can be built next.',
    tone: authSession.isRootUser ? 'green' : 'amber',
  },
])

const workspacePreview = [
  {
    icon: 'i-lucide-list-checks',
    title: 'Today',
    description: 'This area will hold your daily habit checklist and quick check-ins.',
  },
  {
    icon: 'i-lucide-flame',
    title: 'Momentum',
    description: 'Streaks, completion rate, and positive-vs-negative balance will surface here.',
  },
  {
    icon: 'i-lucide-history',
    title: 'History',
    description: 'Recent entries and period summaries will help you spot patterns over time.',
  },
] as const

const roadmap = [
  {
    title: 'Build the admin shell',
    description: 'Now that a root user can exist, the next screen can expose user-management surfaces.',
  },
  {
    title: 'Define the habit model',
    description: 'Users, habits, entries, and sync metadata need to exist before the dashboard can show real data.',
  },
  {
    title: 'Create habit CRUD',
    description: 'Positive and negative habits come next so this screen can become actionable.',
  },
] as const

const accountFacts = computed(() => [
  {
    label: 'Session state',
    value: authSession.isAuthenticated ? 'signed in' : 'signed out',
  },
  {
    label: 'Role',
    value: authSession.isProfileReady ? authSession.userRole : 'loading profile',
  },
  {
    label: 'Identity',
    value: accountIdentity.value,
  },
  {
    label: 'Account created',
    value: createdAtLabel.value,
  },
  {
    label: 'App mode',
    value: 'work in progress',
  },
])

function getToneClass(tone: ReadinessCard['tone']) {
  return toneClasses[tone]
}
</script>

<template>
  <AppLayout>
    <template #header-actions>
      <DsButton class="max-sm:hidden" size="sm" to="/" variant="secondary">Home</DsButton>
      <DsButton size="sm" type="button" @click="authSession.signOut">Sign out</DsButton>
    </template>

    <section
      class="border-b py-14 [border-color:var(--border)] [background:linear-gradient(180deg,var(--bg2),var(--bg))]"
    >
      <div class="mx-auto grid max-w-[var(--max)] gap-10 px-[var(--gutter)] lg:grid-cols-[minmax(0,1fr)_320px]">
        <div v-if="authSession.isAuthenticated" id="snapshot">
          <p
            class="[font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-semibold uppercase tracking-[0.14em] [color:var(--ink3)]"
          >
            User dashboard
          </p>
          <h1
            class="mt-3 [font-family:var(--mono)] [font-size:var(--text-5xl)] [line-height:var(--lh-5xl)] font-semibold tracking-[-0.03em] [color:var(--ink)] max-sm:[font-size:var(--text-4xl)] max-sm:[line-height:var(--lh-4xl)]"
          >
            Welcome back, {{ accountLabel }}.
          </h1>
          <p class="mt-4 max-w-[720px] [font-size:var(--text-base)] [line-height:1.8] [color:var(--ink2)]">
            This is the first signed-in home for HAH. Your session, identity, and navigation are now
            connected; the next delivery will plug real habit data into this dashboard.
          </p>

          <div v-if="authSession.isProfileReady" class="mt-5 flex flex-wrap gap-2">
            <span
              class="inline-flex items-center gap-1 rounded-[2px] border px-2.5 py-[5px] [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-medium"
              :class="
                authSession.isRootUser
                  ? '[border-color:var(--purple-mid)] [background:var(--purple-bg)] [color:var(--purple)]'
                  : '[border-color:var(--blue-mid)] [background:var(--blue-bg)] [color:var(--blue)]'
              "
            >
              <i :class="authSession.isRootUser ? 'i-lucide-shield-check' : 'i-lucide-user-round'" />
              {{ authSession.isRootUser ? 'root user bootstrapped' : `role: ${authSession.userRole}` }}
            </span>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <DsButton href="#workspace">Explore the workspace</DsButton>
            <DsButton href="#roadmap" variant="secondary">See what comes next</DsButton>
          </div>
        </div>

        <div v-else id="snapshot">
          <p
            class="[font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-semibold uppercase tracking-[0.14em] [color:var(--ink3)]"
          >
            User dashboard
          </p>
          <h1
            class="mt-3 [font-family:var(--mono)] [font-size:var(--text-5xl)] [line-height:var(--lh-5xl)] font-semibold tracking-[-0.03em] [color:var(--ink)] max-sm:[font-size:var(--text-4xl)] max-sm:[line-height:var(--lh-4xl)]"
          >
            Sign in to unlock your workspace.
          </h1>
          <p class="mt-4 max-w-[720px] [font-size:var(--text-base)] [line-height:1.8] [color:var(--ink2)]">
            The dashboard is ready as the authenticated home of the app, but it only makes sense once a
            session exists. Sign in or create an account to continue.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <DsButton to="/login">Sign in</DsButton>
            <DsButton to="/signup" variant="secondary">Create account</DsButton>
          </div>
        </div>

        <DsPanel
          description="A compact account summary while habit setup and analytics are still being connected."
          eyebrow="Account"
          title="Snapshot"
        >
          <dl class="grid gap-3">
            <div
              v-for="fact in accountFacts"
              :key="fact.label"
              class="flex items-start justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0 [border-color:var(--border)] max-sm:flex-col max-sm:gap-1"
            >
              <dt class="[font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] uppercase tracking-[0.12em] [color:var(--ink3)]">
                {{ fact.label }}
              </dt>
              <dd class="text-right [font-size:var(--text-sm)] [line-height:1.6] [color:var(--ink)] max-sm:text-left">
                {{ fact.value }}
              </dd>
            </div>
          </dl>
        </DsPanel>
      </div>
    </section>

    <section id="workspace" class="border-b [border-color:var(--border)] [background:var(--bg)]">
      <div class="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-14">
        <div class="grid gap-5 lg:grid-cols-3">
          <div
            v-for="card in readinessCards"
            :key="card.title"
            class="rounded-[4px] border p-5"
            :class="getToneClass(card.tone)"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="[font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] uppercase tracking-[0.12em] opacity-80">
                  {{ card.title }}
                </p>
                <p class="mt-2 [font-family:var(--mono)] [font-size:var(--text-2xl)] [line-height:var(--lh-2xl)] font-semibold tracking-[-0.02em]">
                  {{ card.value }}
                </p>
              </div>
              <i :class="card.icon" class="[font-size:var(--text-xl)]" />
            </div>
            <p class="mt-4 [font-size:var(--text-sm)] [line-height:1.7] opacity-90">
              {{ card.description }}
            </p>
          </div>
        </div>

        <div class="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
          <DsPanel
            description="The structure is ready; the habit module will plug live entries and progress into these slots."
            eyebrow="Workspace"
            title="What this dashboard will hold"
          >
            <div class="grid gap-4 md:grid-cols-3">
              <div
                v-for="item in workspacePreview"
                :key="item.title"
                class="rounded-[4px] border p-4 [border-color:var(--border)] [background:var(--bg)]"
              >
                <i :class="item.icon" class="[font-size:var(--text-lg)] [color:var(--blue)]" />
                <h3
                  class="mt-3 [font-family:var(--mono)] [font-size:var(--text-lg)] [line-height:var(--lh-lg)] font-semibold tracking-[-0.02em] [color:var(--ink)]"
                >
                  {{ item.title }}
                </h3>
                <p class="mt-2 [font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </DsPanel>

          <DsPanel
            description="These are the most important implementation steps still ahead of this screen."
            eyebrow="Roadmap"
            title="Next up"
          >
            <ol class="grid gap-4">
              <li
                v-for="(item, index) in roadmap"
                :key="item.title"
                class="grid grid-cols-[auto_1fr] gap-3 border-b pb-4 last:border-b-0 last:pb-0 [border-color:var(--border)]"
              >
                <span
                  class="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full border [border-color:var(--border2)] [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] [color:var(--ink3)]"
                >
                  {{ index + 1 }}
                </span>
                <div>
                  <p class="[font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-semibold [color:var(--ink)]">
                    {{ item.title }}
                  </p>
                  <p class="mt-1 [font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]">
                    {{ item.description }}
                  </p>
                </div>
              </li>
            </ol>
          </DsPanel>
        </div>
      </div>
    </section>

    <section id="roadmap" class="[background:var(--bg2)]">
      <div class="mx-auto max-w-[var(--max)] px-[var(--gutter)] py-14">
        <DsPanel
          description="This first dashboard intentionally focuses on authenticated navigation and product structure. Real habit management will replace these placeholders in the next sequential module."
          eyebrow="Status"
          title="Dashboard v1 is in place"
        >
          <div class="flex flex-wrap items-center gap-3">
            <span
              class="inline-flex items-center gap-1 rounded-[2px] border px-2.5 py-[5px] [border-color:var(--green-mid)] [background:var(--green-bg)] [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-medium [color:var(--green)]"
            >
              <i class="i-lucide-badge-check" />
              authenticated home ready
            </span>
            <span
              class="inline-flex items-center gap-1 rounded-[2px] border px-2.5 py-[5px] [border-color:var(--amber-mid)] [background:var(--amber-bg)] [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-medium [color:var(--amber)]"
            >
              <i class="i-lucide-hammer" />
              habit module next
            </span>
          </div>
        </DsPanel>
      </div>
    </section>
  </AppLayout>
</template>
