import { create } from 'zustand';

export interface SystemInfo {
  // 主题
  theme: 'light' | 'dark' | 'monokai';
}
interface ISystemStore {
  systemInfo: SystemInfo;
  updateSystemInfo: (systemInfo: Partial<SystemInfo>) => void;
  setSystemInfo: (systemInfo: SystemInfo) => void;
}

const useSystemStore = create<ISystemStore>((set) => ({
  systemInfo: {
    theme: 'light',
  },
  updateSystemInfo: (systemInfo) =>
    set((state) => ({ systemInfo: { ...state.systemInfo, ...systemInfo } })),
  setSystemInfo: (systemInfo) => set(() => ({ systemInfo })),
}));

export default useSystemStore;
