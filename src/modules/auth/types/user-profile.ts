export type RegistrationSource = 'email' | 'google'
export type UserRole = 'admin' | 'root' | 'user'

export interface AuthUserProfile {
  bootstrapSource?: 'env-root-email'
  createdAt?: unknown
  displayName: string | null
  email: string | null
  registrationSource: RegistrationSource
  role: UserRole
  uid: string
  updatedAt?: unknown
}
