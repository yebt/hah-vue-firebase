<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import DsButton from '@/app/design_system/DsButton.vue'
import { useAuthSessionStore } from '@/modules/auth/stores/auth-session'

const route = useRoute()
const router = useRouter()
const authSession = useAuthSessionStore()
authSession.ensureInitialized()

const isDashboardRoute = computed(() => route.path.startsWith('/dashboard'))
const isLandingRoute = computed(() => route.path === '/')

async function handleSignOut() {
  await authSession.signOut()
  await router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b [border-color:var(--border)] [background:var(--bg2)]">
    <div class="mx-auto flex h-11 max-w-[var(--max)] items-stretch">
      <RouterLink
        to="/"
        class="flex shrink-0 items-center gap-2 border-r px-[18px] [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-semibold tracking-[0.12em] [color:var(--ink)]"
      >
        <i class="i-lucide-zap [font-size:var(--text-base)] [color:var(--blue)]" />
        <span>HAH</span>
      </RouterLink>

      <nav class="flex flex-1 items-stretch max-sm:hidden" aria-label="Main navigation">
        <template v-if="isLandingRoute">
          <a
            href="#overview"
            class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
          >
            Overview
          </a>
          <a
            href="#habits"
            class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
          >
            Features
          </a>
          <a
            href="#analytics"
            class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
          >
            Activity
          </a>
        </template>

        <template v-else-if="isDashboardRoute">
          <a
            href="#snapshot"
            class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
          >
            Snapshot
          </a>
          <a
            href="#workspace"
            class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
          >
            Workspace
          </a>
          <a
            href="#roadmap"
            class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
          >
            Next
          </a>
          <span
            v-if="authSession.isRootUser"
            class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-semibold uppercase tracking-[0.12em] [color:var(--purple)]"
          >
            Root
          </span>
        </template>

        <template v-else>
          <RouterLink
            to="/"
            class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
          >
            Home
          </RouterLink>
          <RouterLink
            v-if="authSession.isAuthenticated"
            to="/dashboard"
            class="flex items-center border-r px-4 [border-color:var(--border)] [font-family:var(--mono)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)] font-medium [color:var(--ink2)] transition-[color,background-color] duration-150 hover:[background:var(--bg)] hover:[color:var(--ink)]"
          >
            Dashboard
          </RouterLink>
        </template>
      </nav>

      <div class="ml-auto flex shrink-0 items-center gap-2 border-l px-4 [border-color:var(--border)] max-sm:px-3">
        <slot name="actions">
          <template v-if="authSession.isAuthenticated">
            <DsButton
              v-if="!isDashboardRoute"
              class="max-sm:hidden"
              size="sm"
              to="/dashboard"
              variant="secondary"
            >
              Dashboard
            </DsButton>
            <DsButton v-else class="max-sm:hidden" size="sm" to="/" variant="secondary">Home</DsButton>
            <DsButton size="sm" type="button" @click="handleSignOut">Sign out</DsButton>
          </template>
          <template v-else>
            <DsButton class="max-sm:hidden" size="sm" to="/login" variant="secondary">Sign in</DsButton>
            <DsButton size="sm" to="/signup">Create account</DsButton>
          </template>
        </slot>
      </div>
    </div>
  </header>
</template>
