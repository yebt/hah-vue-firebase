<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="nav">
    <div class="nav-inner">
      <RouterLink to="/" class="brand">
        <i class="i-lucide-zap brand-icon" />
        <span class="brand-name">HAH</span>
      </RouterLink>

      <nav class="links" aria-label="Main navigation">
        <a href="#overview" class="link">Overview</a>
        <a href="#habits" class="link">Features</a>
        <a href="#analytics" class="link">Activity</a>
      </nav>

      <div class="actions">
        <slot name="actions">
          <RouterLink to="/login" class="btn-signin">Sign in</RouterLink>
          <RouterLink to="/login" class="btn-cta">Open app</RouterLink>
        </slot>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  max-width: var(--max);
  margin: 0 auto;
  height: 44px;
  display: flex;
  align-items: stretch;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 18px;
  border-right: 1px solid var(--border);
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--ink);
  text-decoration: none;
  flex-shrink: 0;
}

.brand-icon {
  color: var(--blue);
  font-size: 14px;
}

.links {
  display: flex;
  align-items: stretch;
  flex: 1;
}

.link {
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--ink2);
  border-right: 1px solid var(--border);
  text-decoration: none;
  transition: color 0.1s, background 0.1s;
}

.link:hover {
  color: var(--ink);
  background: var(--bg);
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  margin-left: auto;
  border-left: 1px solid var(--border);
  flex-shrink: 0;
}

.btn-signin {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  background: transparent;
  border: 1px solid var(--border2);
  color: var(--ink2);
  cursor: pointer;
  border-radius: 2px;
  transition: color 0.1s, border-color 0.1s;
}

.btn-signin:hover:not(:disabled) {
  color: var(--ink);
  border-color: var(--ink3);
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 14px;
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  background: var(--ink);
  border: 1px solid var(--ink);
  color: #fff;
  cursor: pointer;
  border-radius: 2px;
  transition: opacity 0.1s;
}

.btn-signin:disabled,
.btn-cta:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Responsive ──────────────────────────────────────── */
@media (max-width: 600px) {
  .links {
    display: none;
  }

  .btn-signin {
    display: none;
  }

  .actions {
    padding: 0 12px;
  }
}
</style>
