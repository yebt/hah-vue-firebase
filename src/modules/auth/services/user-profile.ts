import type { User } from 'firebase/auth'
import {
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/app/infrastructure/firebase'
import type { AuthUserProfile, RegistrationSource, UserRole } from '../types/user-profile'

function userProfileRef(uid: string) {
  return doc(db, 'users', uid)
}

function getConfiguredRootEmails() {
  return (import.meta.env.VITE_ROOT_USER_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

function resolveRole(email: string | null): UserRole {
  if (!email) {
    return 'user'
  }

  return getConfiguredRootEmails().includes(email.trim().toLowerCase()) ? 'root' : 'user'
}

export async function ensureUserProfile(user: User, registrationSource: RegistrationSource) {
  const profileRef = userProfileRef(user.uid)
  const existingProfile = await getDoc(profileRef)
  const role = resolveRole(user.email)
  const isRoot = role === 'root'

  if (!existingProfile.exists()) {
    const profile: AuthUserProfile = {
      bootstrapSource: isRoot ? 'env-root-email' : undefined,
      createdAt: serverTimestamp(),
      displayName: user.displayName,
      email: user.email,
      registrationSource,
      role,
      uid: user.uid,
      updatedAt: serverTimestamp(),
    }

    await setDoc(profileRef, profile)

    return profile
  }

  const currentProfile = existingProfile.data() as AuthUserProfile
  const updates: Partial<AuthUserProfile> = {}

  if (currentProfile.displayName !== user.displayName) {
    updates.displayName = user.displayName
  }

  if (currentProfile.email !== user.email) {
    updates.email = user.email
  }

  if (currentProfile.registrationSource !== registrationSource) {
    updates.registrationSource = registrationSource
  }

  if (isRoot && currentProfile.role !== 'root') {
    updates.role = 'root'
    updates.bootstrapSource = 'env-root-email'
  }

  if (Object.keys(updates).length > 0) {
    await updateDoc(profileRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    })
  }

  return {
    ...currentProfile,
    ...updates,
  }
}

export function subscribeToUserProfile(
  uid: string,
  onChange: (profile: AuthUserProfile | null) => void
) {
  return onSnapshot(userProfileRef(uid), (snapshot) => {
    onChange(snapshot.exists() ? (snapshot.data() as AuthUserProfile) : null)
  })
}
