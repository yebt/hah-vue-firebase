import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { auth } from '@/app/infrastructure/firebase'
import {
  createAccountWithEmailPassword,
  signInWithEmailPassword,
  signOutCurrentUser,
} from '../services/email-password-auth'
import { signInWithGooglePopup } from '../services/google-auth'

export const useAuthSessionStore = defineStore('auth-session', () => {
  const user = ref<User | null>(auth.currentUser)
  const isReady = ref(false)
  let stopAuthObserver: null | (() => void) = null

  function ensureInitialized() {
    if (stopAuthObserver) {
      return
    }

    stopAuthObserver = onAuthStateChanged(auth, (nextUser) => {
      user.value = nextUser
      isReady.value = true
    })
  }

  async function signIn(email: string, password: string) {
    return signInWithEmailPassword(email, password)
  }

  async function createAccount(email: string, password: string) {
    return createAccountWithEmailPassword(email, password)
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
    createAccount,
    isAuthenticated,
    isReady,
    signIn,
    signInWithGoogle,
    signOut,
    user,
  }
})
