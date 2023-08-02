import { create } from 'zustand'

export const useAuthStore = create(set => ({
  token: localStorage.getItem('token'),
  handleLogin: newToken => {
    localStorage.setItem('token', newToken)
    set({ token: newToken })
  },
  handleLogout: () => {
    localStorage.removeItem('token')
    set({ token: null })
  }
}))
