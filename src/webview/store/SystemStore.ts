import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface SystemInfo {
  // 主题
  theme: 'light' | 'dark' | 'monokai';
}
interface ISystemStore {
  systemInfo: SystemInfo;
  updateSystemInfo: (systemInfo: Partial<SystemInfo>) => void;
  setSystemInfo: (systemInfo: SystemInfo) => void;
}

const useSystemStore = create<ISystemStore>()(
  persist(
    (set) => ({
      systemInfo: {
        theme: 'light',
      },
      updateSystemInfo: (systemInfo) =>
        set((state) => ({
          systemInfo: { ...state.systemInfo, ...systemInfo },
        })),
      setSystemInfo: (systemInfo) => set(() => ({ systemInfo })),
    }),
    {
      name: 'system-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useSystemStore;
