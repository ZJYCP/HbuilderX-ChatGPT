import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserInfo {
  email: string;
  id: number;
}

interface UserStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  token: string;
  setToken: (token: string) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set(() => ({ userInfo })),
      token: '',
      setToken: (token) => set(() => ({ token })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
