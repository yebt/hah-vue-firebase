<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'
import DsAuthShell from '@/app/design_system/DsAuthShell.vue'
import DsButton from '@/app/design_system/DsButton.vue'
import DsTextField from '@/app/design_system/DsTextField.vue'
import AppLayout from '@/shared/components/AppLayout.vue'
import { getAuthErrorMessage } from '@/modules/auth/lib/get-auth-error-message'
import { useAuthSessionStore } from '@/modules/auth/stores/auth-session'

const authSession = useAuthSessionStore()
authSession.ensureInitialized()

const credentials = reactive({
  email: '',
  password: '',
})

const highlights = [
  { icon: 'i-lucide-check', text: 'Email/password authentication via Firebase' },
  { icon: 'i-lucide-check', text: 'Google popup sign-in for supported accounts' },
  { icon: 'i-lucide-check', text: 'Persistent browser session managed by Firebase Auth' },
  { icon: 'i-lucide-check', text: 'Self-registration with email/password' },
  { icon: 'i-lucide-clock-3', text: 'Activation flow and role-based access coming next', tone: 'warning' },
] as const

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
    <DsAuthShell
      description="Existing users can already access their account with email/password or Google. New users can create an account now, while activation flow and protected in-app access are the next auth slices."
      eyebrow="Authentication"
      :highlights="highlights"
      title="Sign in to HAH."
    >
      <template v-if="authSession.isAuthenticated">
        <p
          class="mb-4 [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-semibold uppercase tracking-[0.14em] [color:var(--ink3)]"
        >
          Signed in
        </p>
        <h2
          class="mb-3 [font-family:var(--mono)] [font-size:var(--text-xl)] [line-height:var(--lh-xl)] font-semibold tracking-[-0.02em] [color:var(--ink)]"
        >
          Session active.
        </h2>
        <p class="[font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]">
          You are authenticated as
          <span class="[font-family:var(--mono)] [color:var(--ink)]">
            {{ authSession.user?.email ?? authSession.user?.displayName ?? authSession.user?.uid }}
          </span>.
        </p>

        <div class="mt-6 flex gap-3 max-sm:flex-col">
          <DsButton to="/" variant="secondary">Back home</DsButton>
          <DsButton type="button" @click="handleSignOut">Sign out</DsButton>
        </div>
      </template>

      <form v-else class="grid gap-4" @submit.prevent="handleSubmit">
        <p
          class="mb-1 [font-family:var(--mono)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)] font-semibold uppercase tracking-[0.14em] [color:var(--ink3)]"
        >
          Account access
        </p>
        <h2
          class="mb-1 [font-family:var(--mono)] [font-size:var(--text-xl)] [line-height:var(--lh-xl)] font-semibold tracking-[-0.02em] [color:var(--ink)]"
        >
          Use email or Google.
        </h2>

        <DsButton
          block
          :disabled="isGoogleSubmitting || !authSession.isReady"
          type="button"
          variant="google"
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
        </DsButton>

        <div class="flex items-center gap-3 [color:var(--ink3)] [font-size:var(--text-xs)] [line-height:var(--lh-xs)]">
          <span class="h-px flex-1 [background:var(--border)]" />
          <span class="[font-family:var(--mono)]">or continue with email</span>
          <span class="h-px flex-1 [background:var(--border)]" />
        </div>

        <DsTextField
          v-model="credentials.email"
          autocomplete="email"
          label="Email"
          name="email"
          required
          type="email"
        />
        <DsTextField
          v-model="credentials.password"
          autocomplete="current-password"
          label="Password"
          name="password"
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
          :disabled="isEmailSubmitting || isGoogleSubmitting || !authSession.isReady"
          type="submit"
        >
          {{
            isEmailSubmitting
              ? 'Signing in…'
              : authSession.isReady
                ? 'Sign in with email'
                : 'Loading…'
          }}
        </DsButton>

        <p class="[font-size:var(--text-sm)] [line-height:1.7] [color:var(--ink2)]">
          Don’t have an account yet?
          <RouterLink to="/signup" class="[color:var(--blue)]">Create one now</RouterLink>
        </p>
      </form>
    </DsAuthShell>
  </AppLayout>
</template>
