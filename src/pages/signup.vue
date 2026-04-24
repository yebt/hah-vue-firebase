<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppLayout from '@/shared/components/AppLayout.vue'
import { getAuthErrorMessage } from '@/modules/auth/lib/get-auth-error-message'
import { useAuthSessionStore } from '@/modules/auth/stores/auth-session'

const authSession = useAuthSessionStore()
authSession.ensureInitialized()

const registration = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const submitError = ref('')
const isSubmitting = ref(false)

const passwordMismatch = computed(
  () =>
    registration.confirmPassword.length > 0 && registration.password !== registration.confirmPassword
)

async function handleSubmit() {
  submitError.value = ''

  if (passwordMismatch.value) {
    submitError.value = 'Passwords do not match.'
    return
  }

  isSubmitting.value = true

  try {
    await authSession.createAccount(registration.email.trim(), registration.password)
  } catch (error) {
    submitError.value = getAuthErrorMessage(error)
  } finally {
    isSubmitting.value = false
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
            <p class="auth-eyebrow mono">Registration</p>
            <h1 class="auth-title">Create your HAH account.</h1>
            <p class="auth-description">
              Start with email/password and get into the platform as soon as the activation flow is
              completed. Google sign-in and role-based access already exist on the auth side.
            </p>

            <ul class="auth-highlights">
              <li><i class="i-lucide-check" /> Email/password self-registration is now available</li>
              <li><i class="i-lucide-check" /> Firebase Auth signs the new user in immediately</li>
              <li><i class="i-lucide-clock-3" /> Admin activation and protected app access come next</li>
            </ul>
          </div>

          <div class="auth-panel">
            <template v-if="authSession.isAuthenticated">
              <p class="panel-eyebrow mono">Account created</p>
              <h2 class="panel-title">Registration complete.</h2>
              <p class="panel-copy">
                Your account was created for
                <span class="panel-email mono">
                  {{ authSession.user?.email ?? authSession.user?.displayName ?? authSession.user?.uid }}
                </span>.
              </p>
              <p class="form-note">
                The next auth slice adds admin activation and protected in-app access.
              </p>

              <div class="panel-actions">
                <RouterLink to="/" class="panel-link">Back home</RouterLink>
                <RouterLink to="/login" class="panel-link">Go to sign in</RouterLink>
                <button class="panel-primary" type="button" @click="handleSignOut">Sign out</button>
              </div>
            </template>

            <form v-else class="auth-form" @submit.prevent="handleSubmit">
              <p class="panel-eyebrow mono">Create account</p>
              <h2 class="panel-title">Register with email.</h2>

              <label class="field">
                <span class="field-label mono">Email</span>
                <input
                  v-model="registration.email"
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
                  v-model="registration.password"
                  class="field-input"
                  type="password"
                  name="password"
                  autocomplete="new-password"
                  minlength="6"
                  required
                />
              </label>

              <label class="field">
                <span class="field-label mono">Confirm password</span>
                <input
                  v-model="registration.confirmPassword"
                  class="field-input"
                  type="password"
                  name="confirmPassword"
                  autocomplete="new-password"
                  minlength="6"
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
                :disabled="isSubmitting || passwordMismatch || !authSession.isReady"
              >
                {{
                  isSubmitting
                    ? 'Creating account…'
                    : authSession.isReady
                      ? 'Create account'
                      : 'Loading…'
                }}
              </button>

              <p class="form-note">
                Already have an account?
                <RouterLink to="/login" class="inline-link">Sign in</RouterLink>
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
  flex-wrap: wrap;
}

.panel-primary,
.panel-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

.panel-link,
.inline-link {
  color: var(--blue);
}

.panel-link {
  border: 1px solid var(--border2);
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
