import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '@/app/infrastructure/firebase'

export function signInWithEmailPassword(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function createAccountWithEmailPassword(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function signOutCurrentUser() {
  return signOut(auth)
}
