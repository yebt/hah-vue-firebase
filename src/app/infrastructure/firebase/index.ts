import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from './config'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)
const firestoreName = import.meta.env.VITE_FIREBASE_FIRESTORENAME

export const db = firestoreName ? getFirestore(firebaseApp, firestoreName) : getFirestore(firebaseApp)
