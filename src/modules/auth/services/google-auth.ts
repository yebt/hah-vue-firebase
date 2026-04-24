import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/app/infrastructure/firebase'

const googleProvider = new GoogleAuthProvider()

export function signInWithGooglePopup() {
  return signInWithPopup(auth, googleProvider)
}
