import { create } from 'zustand'
export const useUserStore = create(set => ({
  user: {
    username: '',
    email: '',
    password: ''
  },
  name: '',
  surname: '',
  langs: [],
  interests: [],

  setUser: user => set({ user }),
  setName: name => set({ name }),
  setSurname: surname => set({ surname }),
  setLangs: langs => set({ langs }),
  setInterests: interests => set({ interests })
}))
