import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { auth } from '@/app/infrastructure/firebase'
import { signInWithEmailPassword, signOutCurrentUser } from '../services/email-password-auth'
import { signInWithGooglePopup } from '../services/google-auth'

export const useAuthSessionStore = defineStore('auth-session', () => {
  const user = ref<User | null>(auth.currentUser)
  const isReady = ref(false)
  let stopObserver: null | (() => void) = null

  function ensureInitialized() {
    if (stopObserver) {
      return
    }

    stopObserver = onAuthStateChanged(auth, (nextUser) => {
      user.value = nextUser
      isReady.value = true
    })
  }

  async function signIn(email: string, password: string) {
    return signInWithEmailPassword(email, password)
  }

  async function signInWithGoogle() {
    return signInWithGooglePopup()
  }

  async function signOut() {
    await signOutCurrentUser()
  }

  const isAuthenticated = computed(() => user.value !== null)

  return {
    ensureInitialized,
    isAuthenticated,
    isReady,
    signIn,
    signInWithGoogle,
    signOut,
    user,
  }
})
