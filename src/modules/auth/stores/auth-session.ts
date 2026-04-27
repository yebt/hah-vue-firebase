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
import { ensureUserProfile, subscribeToUserProfile } from '../services/user-profile'
import type { RegistrationSource } from '../types/user-profile'
import type { AuthUserProfile } from '../types/user-profile'

export const useAuthSessionStore = defineStore('auth-session', () => {
  const user = ref<User | null>(auth.currentUser)
  const isReady = ref(false)
  const isProfileReady = ref(false)
  const userProfile = ref<AuthUserProfile | null>(null)
  let stopAuthObserver: null | (() => void) = null
  let stopProfileObserver: null | (() => void) = null

  function getRegistrationSource(user: User): RegistrationSource {
    return user.providerData.some((provider) => provider.providerId === 'google.com') ? 'google' : 'email'
  }

  function ensureInitialized() {
    if (stopAuthObserver) {
      return
    }

    stopAuthObserver = onAuthStateChanged(auth, (nextUser) => {
      user.value = nextUser
      isReady.value = true

      if (stopProfileObserver) {
        stopProfileObserver()
        stopProfileObserver = null
      }

      if (!nextUser) {
        userProfile.value = null
        isProfileReady.value = true
        return
      }

      isProfileReady.value = false
      stopProfileObserver = subscribeToUserProfile(nextUser.uid, (nextProfile) => {
        userProfile.value = nextProfile
        isProfileReady.value = true
      })

      void ensureUserProfile(nextUser, getRegistrationSource(nextUser))
    })
  }

  async function signIn(email: string, password: string) {
    const credentials = await signInWithEmailPassword(email, password)
    await ensureUserProfile(credentials.user, 'email')
    return credentials
  }

  async function createAccount(email: string, password: string) {
    const credentials = await createAccountWithEmailPassword(email, password)
    await ensureUserProfile(credentials.user, 'email')
    return credentials
  }

  async function signInWithGoogle() {
    const credentials = await signInWithGooglePopup()
    await ensureUserProfile(credentials.user, 'google')
    return credentials
  }

  async function signOut() {
    await signOutCurrentUser()
  }

  const isAuthenticated = computed(() => user.value !== null)
  const userRole = computed(() => userProfile.value?.role ?? 'user')
  const isAdminUser = computed(() => userRole.value === 'admin' || userRole.value === 'root')
  const isRootUser = computed(() => userRole.value === 'root')

  return {
    ensureInitialized,
    createAccount,
    isAdminUser,
    isAuthenticated,
    isProfileReady,
    isRootUser,
    isReady,
    signIn,
    signInWithGoogle,
    signOut,
    user,
    userProfile,
    userRole,
  }
})
