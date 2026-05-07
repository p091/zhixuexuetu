import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResourceItem } from '../types';

interface UserState {
  name: string;
  points: number;
  uploadCount: number;
}

interface AppState {
  user: UserState;
  resources: ResourceItem[];
  addPoints: (amount: number) => void;
  spendPoints: (amount: number) => boolean;
  incrementUpload: () => void;
  addResource: (resource: ResourceItem) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        name: '林知夏',
        points: 120,
        uploadCount: 3,
      },
      resources: [],
      addPoints: (amount) =>
        set((state) => ({
          user: { ...state.user, points: state.user.points + amount },
        })),
      spendPoints: (amount) => {
        const current = get().user.points;
        if (current < amount) {
          return false;
        }
        set((state) => ({
          user: { ...state.user, points: state.user.points - amount },
        }));
        return true;
      },
      incrementUpload: () =>
        set((state) => ({
          user: { ...state.user, uploadCount: state.user.uploadCount + 1 },
        })),
      addResource: (resource) =>
        set((state) => ({
          resources: [resource, ...state.resources],
        })),
    }),
    {
      name: 'zhihui-campus-storage',
    },
  ),
);
