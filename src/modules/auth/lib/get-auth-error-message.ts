import { FirebaseError } from 'firebase/app'

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/missing-password': 'Enter your password.',
  'auth/email-already-in-use': 'An account already exists for this email address.',
  'auth/weak-password': 'Use a stronger password with at least 6 characters.',
  'auth/account-exists-with-different-credential':
    'This email is already registered with a different sign-in method.',
  'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/popup-blocked': 'The Google sign-in popup was blocked by your browser.',
  'auth/popup-closed-by-user': 'Google sign-in was cancelled before completion.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled in Firebase Auth.',
}

export function getAuthErrorMessage(error: unknown) {
  if (error instanceof FirebaseError) {
    return AUTH_ERROR_MESSAGES[error.code] ?? 'Unable to sign in right now.'
  }

  return 'Unable to sign in right now.'
}
