/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_APIKEY: string
  readonly VITE_FIREBASE_APPID: string
  readonly VITE_FIREBASE_AUTHDOMAIN: string
  readonly VITE_FIREBASE_FIRESTORENAME?: string
  readonly VITE_FIREBASE_MESSAGINGSENDERID: string
  readonly VITE_FIREBASE_MEASUREMENTID?: string
  readonly VITE_FIREBASE_PROJECTID: string
  readonly VITE_FIREBASE_STORAGEBUCKET: string
  readonly VITE_ROOT_USER_EMAILS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
