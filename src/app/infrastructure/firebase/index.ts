import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from './config'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)

export const db = getFirestore(firebaseApp, import.meta.env.VITE_FIREBASE_FIRESTORENAME ?? null)
