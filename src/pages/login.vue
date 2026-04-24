<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppLayout from '@/shared/components/AppLayout.vue'
import { getAuthErrorMessage } from '@/modules/auth/lib/get-auth-error-message'
import { useAuthSessionStore } from '@/modules/auth/stores/auth-session'

const authSession = useAuthSessionStore()
authSession.ensureInitialized()

const credentials = reactive({
  email: '',
  password: '',
})

const isEmailSubmitting = ref(false)
const isGoogleSubmitting = ref(false)
const submitError = ref('')

async function handleSubmit() {
  submitError.value = ''
  isEmailSubmitting.value = true

  try {
    await authSession.signIn(credentials.email.trim(), credentials.password)
  } catch (error) {
    submitError.value = getAuthErrorMessage(error)
  } finally {
    isEmailSubmitting.value = false
  }
}

async function handleGoogleSignIn() {
  submitError.value = ''
  isGoogleSubmitting.value = true

  try {
    await authSession.signInWithGoogle()
  } catch (error) {
    submitError.value = getAuthErrorMessage(error)
  } finally {
    isGoogleSubmitting.value = false
  }
}

async function handleSignOut() {
  await authSession.signOut()
}
</script>

<template>
  <AppLayout bare>
    <section class="auth-page">
      <div class="auth-shell">
        <RouterLink to="/" class="auth-back">
          <i class="i-lucide-arrow-left" />
          Back to landing
        </RouterLink>

        <div class="auth-grid">
          <div class="auth-copy">
            <p class="auth-eyebrow mono">Authentication</p>
            <h1 class="auth-title">Sign in to HAH.</h1>
            <p class="auth-description">
              Existing users can already access their account with email/password or Google.
              Registration, activation flow, and protected in-app access are the next auth slices.
            </p>

            <ul class="auth-highlights">
              <li><i class="i-lucide-check" /> Email/password authentication via Firebase</li>
              <li><i class="i-lucide-check" /> Google popup sign-in for supported accounts</li>
              <li><i class="i-lucide-check" /> Persistent browser session managed by Firebase Auth</li>
              <li><i class="i-lucide-clock-3" /> Registration and role-based access coming next</li>
            </ul>
          </div>

          <div class="auth-panel">
            <template v-if="authSession.isAuthenticated">
              <p class="panel-eyebrow mono">Signed in</p>
              <h2 class="panel-title">Session active.</h2>
              <p class="panel-copy">
                You are authenticated as
                <span class="panel-email mono">
                  {{ authSession.user?.email ?? authSession.user?.displayName ?? authSession.user?.uid }}
                </span>.
              </p>

              <div class="panel-actions">
                <RouterLink to="/" class="panel-link">Back home</RouterLink>
                <button class="panel-primary" type="button" @click="handleSignOut">Sign out</button>
              </div>
            </template>

            <form v-else class="auth-form" @submit.prevent="handleSubmit">
              <p class="panel-eyebrow mono">Account access</p>
              <h2 class="panel-title">Use email or Google.</h2>

              <button
                class="panel-google"
                type="button"
                :disabled="isGoogleSubmitting || !authSession.isReady"
                @click="handleGoogleSignIn"
              >
                <i class="i-lucide-badge-check" />
                {{
                  isGoogleSubmitting
                    ? 'Opening Google…'
                    : authSession.isReady
                      ? 'Continue with Google'
                      : 'Loading…'
                }}
              </button>

              <div class="form-divider">
                <span class="mono">or continue with email</span>
              </div>

              <label class="field">
                <span class="field-label mono">Email</span>
                <input
                  v-model="credentials.email"
                  class="field-input"
                  type="email"
                  name="email"
                  autocomplete="email"
                  required
                />
              </label>

              <label class="field">
                <span class="field-label mono">Password</span>
                <input
                  v-model="credentials.password"
                  class="field-input"
                  type="password"
                  name="password"
                  autocomplete="current-password"
                  required
                />
              </label>

              <p v-if="submitError" class="form-error">
                <i class="i-lucide-circle-alert" />
                {{ submitError }}
              </p>

              <button
                class="panel-primary"
                type="submit"
                :disabled="isEmailSubmitting || isGoogleSubmitting || !authSession.isReady"
              >
                {{
                  isEmailSubmitting
                    ? 'Signing in…'
                    : authSession.isReady
                      ? 'Sign in with email'
                      : 'Loading…'
                }}
              </button>

              <p class="form-note">
                Don’t have an account yet? Self-registration is the next auth slice.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.auth-page {
  min-height: calc(100vh - 36px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}

.auth-shell {
  width: min(100%, 1080px);
}

.auth-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink2);
}

.auth-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  border: 1px solid var(--border);
  background: var(--bg2);
}

.auth-copy,
.auth-panel {
  padding: 40px;
}

.auth-copy {
  border-right: 1px solid var(--border);
  background: var(--bg);
}

.auth-eyebrow,
.panel-eyebrow {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink3);
  margin-bottom: 16px;
}

.auth-title {
  font-family: var(--mono);
  font-size: 34px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--ink);
  margin-bottom: 16px;
}

.auth-description,
.panel-copy,
.form-note {
  font-size: 13px;
  line-height: 1.7;
  color: var(--ink2);
}

.auth-highlights {
  list-style: none;
  display: grid;
  gap: 12px;
  margin-top: 24px;
  padding: 0;
}

.auth-highlights li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--ink2);
  font-size: 12px;
}

.auth-highlights i {
  color: var(--green);
  flex-shrink: 0;
}

.panel-title {
  font-family: var(--mono);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin-bottom: 12px;
}

.panel-email {
  color: var(--ink);
}

.auth-form {
  display: grid;
  gap: 16px;
}

.form-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink3);
  font-size: 10px;
}

.form-divider::before,
.form-divider::after {
  content: '';
  height: 1px;
  flex: 1;
  background: var(--border);
}

.field {
  display: grid;
  gap: 8px;
}

.field-label {
  font-size: 11px;
  font-weight: 500;
  color: var(--ink2);
}

.field-input {
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--border);
  background: var(--bg2);
  color: var(--ink);
  font-size: 13px;
  font-family: var(--sans);
  outline: none;
}

.field-input:focus {
  border-color: var(--blue-mid);
}

.form-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid var(--red-mid);
  background: var(--red-bg);
  color: var(--red);
  font-size: 12px;
}

.panel-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.panel-primary,
.panel-google,
.panel-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  border-radius: 2px;
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 500;
}

.panel-primary {
  border: 1px solid var(--ink);
  background: var(--ink);
  color: #fff;
}

.panel-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.panel-google {
  border: 1px solid var(--border2);
  background: var(--bg2);
  color: var(--ink);
}

.panel-google:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.panel-link {
  border: 1px solid var(--border2);
  color: var(--ink2);
  background: transparent;
}

@media (max-width: 860px) {
  .auth-grid {
    grid-template-columns: 1fr;
  }

  .auth-copy {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

@media (max-width: 640px) {
  .auth-page {
    padding: 24px 16px;
  }

  .auth-copy,
  .auth-panel {
    padding: 24px;
  }

  .auth-title {
    font-size: 28px;
  }

  .panel-actions {
    flex-direction: column;
  }
}
</style>
