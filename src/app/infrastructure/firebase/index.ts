import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './config'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp, import.meta.env.VITE_FIREBASE_FIRESTORENAME ?? null)
