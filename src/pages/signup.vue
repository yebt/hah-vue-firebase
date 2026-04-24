<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import DsAuthShell from '@/app/design_system/DsAuthShell.vue'
import DsButton from '@/app/design_system/DsButton.vue'
import DsTextField from '@/app/design_system/DsTextField.vue'
import AppLayout from '@/shared/components/AppLayout.vue'
import { getAuthErrorMessage } from '@/modules/auth/lib/get-auth-error-message'
import { useAuthSessionStore } from '@/modules/auth/stores/auth-session'

const authSession = useAuthSessionStore()
authSession.ensureInitialized()

const registration = reactive({
  confirmPassword: '',
  email: '',
  password: '',
})

const highlights = [
  { icon: 'i-lucide-check', text: 'Email/password self-registration is now available' },
  { icon: 'i-lucide-check', text: 'Firebase Auth signs the new user in immediately' },
  { icon: 'i-lucide-clock-3', text: 'Dashboards, protected routes, and role-based access come next', tone: 'warning' },
] as const

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
    <DsAuthShell
      description="Start with email/password and create your account right away. New accounts are signed in immediately, while dashboards and protected in-app access come next."
      eyebrow="Registration"
      :highlights="highlights"
      title="Create your HAH account."
    >
      <template v-if="authSession.isAuthenticated">
        <p
          class="mb-4 [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-semibold uppercase tracking-[0.14em] [color:var(--ink3)]"
        >
          Account created
        </p>
        <h2
          class="mb-3 [font-family:var(--mono)] [font-size:var(--text-xl)] [line-height:var(--lh-xl)] font-semibold tracking-[-0.02em] [color:var(--ink)]"
        >
          Registration complete.
        </h2>
        <p class="[font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]">
          Your account was created for
          <span class="[font-family:var(--mono)] [color:var(--ink)]">
            {{ authSession.user?.email ?? authSession.user?.displayName ?? authSession.user?.uid }}
          </span>.
        </p>
        <p class="mt-3 [font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]">
          The next auth slice will connect dashboards, protected routes, and role-based access.
        </p>

        <div class="mt-6 flex flex-wrap gap-3 max-sm:flex-col">
          <DsButton to="/" variant="secondary">Back home</DsButton>
          <DsButton to="/login" variant="secondary">Go to sign in</DsButton>
          <DsButton type="button" @click="handleSignOut">Sign out</DsButton>
        </div>
      </template>

      <form v-else class="grid gap-4" @submit.prevent="handleSubmit">
        <p
          class="mb-1 [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-semibold uppercase tracking-[0.14em] [color:var(--ink3)]"
        >
          Create account
        </p>
        <h2
          class="mb-1 [font-family:var(--mono)] [font-size:var(--text-xl)] [line-height:var(--lh-xl)] font-semibold tracking-[-0.02em] [color:var(--ink)]"
        >
          Register with email.
        </h2>

        <DsTextField
          v-model="registration.email"
          autocomplete="email"
          label="Email"
          name="email"
          required
          type="email"
        />
        <DsTextField
          v-model="registration.password"
          autocomplete="new-password"
          label="Password"
          :min-length="6"
          name="password"
          required
          type="password"
        />
        <DsTextField
          v-model="registration.confirmPassword"
          autocomplete="new-password"
          label="Confirm password"
          :min-length="6"
          name="confirmPassword"
          required
          type="password"
        />

        <p
          v-if="submitError"
          class="flex items-center gap-2 border px-3 py-[10px] [border-color:var(--red-mid)] [background:var(--red-bg)] [color:var(--red)] [font-size:var(--text-sm)] [line-height:var(--lh-sm)]"
        >
          <i class="i-lucide-circle-alert" />
          {{ submitError }}
        </p>

        <DsButton
          block
          :disabled="isSubmitting || passwordMismatch || !authSession.isReady"
          type="submit"
        >
          {{
            isSubmitting
              ? 'Creating account…'
              : authSession.isReady
                ? 'Create account'
                : 'Loading…'
          }}
        </DsButton>

        <p class="[font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]">
          Already have an account?
          <RouterLink to="/login" class="[color:var(--blue)]">Sign in</RouterLink>
        </p>
      </form>
    </DsAuthShell>
  </AppLayout>
</template>
