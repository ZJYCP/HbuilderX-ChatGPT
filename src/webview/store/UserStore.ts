import { create } from 'zustand';

interface UserStore {
  userInfo: any;
  setUserInfo: (userInfo: any) => void;
  token: string;
  setToken: (token: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userInfo: {},
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
  token: '',
  setToken: (token) => set(() => ({ token })),
}));

export default useUserStore;
