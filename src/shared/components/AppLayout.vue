<script setup lang="ts">
import AppHeader from './AppHeader.vue'

defineProps<{
  /** Hides the header for pages that manage their own chrome (e.g. full-screen auth) */
  bare?: boolean
}>()
</script>

<template>
  <div class="layout">
    <div class="wip-banner">
      <i class="i-lucide-triangle-alert" />
      HAH is work in progress — some features may be unavailable while the app is still being built.
    </div>

    <AppHeader v-if="!bare">
      <template #actions>
        <slot name="header-actions" />
      </template>
    </AppHeader>

    <main class="main">
      <slot />
    </main>

    <footer v-if="!bare" class="footer">
      <div class="footer-inner">
        <span class="footer-brand">HAH</span>
        <span class="footer-copy">Habit and health tracker · {{ new Date().getFullYear() }}</span>
        <div class="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="https://github.com/yebt/hah-vue-firebase" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg);
}

.wip-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 36px;
  background: var(--amber-bg);
  border-bottom: 1px solid var(--amber-mid);
  color: var(--amber);
  font-family: var(--mono);
  font-size: var(--text-xs);
  font-weight: 500;
  padding: 8px 16px;
  text-align: center;
  line-height: 1.5;
}

.main {
  flex: 1;
}

.footer {
  border-top: 1px solid var(--border);
  background: var(--bg2);
}

.footer-inner {
  max-width: var(--max);
  margin: 0 auto;
  padding: 0 var(--gutter);
  height: 44px;
  display: flex;
  align-items: center;
  gap: 0;
}

.footer-brand {
  font-family: var(--mono);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.15em;
  color: var(--ink);
  padding-right: 16px;
  border-right: 1px solid var(--border);
  margin-right: 16px;
}

.footer-copy {
  font-size: var(--text-xs);
  color: var(--ink3);
  flex: 1;
}

.footer-links {
  display: flex;
}

.footer-links a {
  font-family: var(--mono);
  font-size: var(--text-xs);
  color: var(--ink3);
  padding: 0 14px;
  border-left: 1px solid var(--border);
  line-height: 44px;
  transition: color 0.1s;
}

.footer-links a:hover {
  color: var(--ink);
}

@media (max-width: 640px) {
  .footer-inner {
    height: auto;
    min-height: 44px;
    flex-wrap: wrap;
    padding-top: 10px;
    padding-bottom: 10px;
    gap: 10px 0;
  }

  .footer-copy {
    flex-basis: 100%;
    order: 3;
  }

  .footer-links {
    width: 100%;
  }
}
</style>
