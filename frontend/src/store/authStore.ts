import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'admin' | 'dispatcher' | 'driver' | 'customer'
  is_active: boolean
}

interface AuthState {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  setUser: (user: User) => void
  logout: () => void
  clearUser: () => void
  isAdmin: () => boolean
  isDriver: () => boolean
  isDispatcher: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        localStorage.setItem('access_token', token)
        set({ user, token })
      },
      setUser: (user) => set({ user }),
      logout: () => {
        localStorage.removeItem('access_token')
        set({ user: null, token: null })
      },
      clearUser: () => {
        localStorage.removeItem('access_token')
        set({ user: null, token: null })
      },
      isAdmin: () => get().user?.role === 'admin',
      isDriver: () => get().user?.role === 'driver',
      isDispatcher: () =>
        ['admin', 'dispatcher'].includes(get().user?.role || ''),
    }),
    { name: 'courier-auth' }
  )
)
