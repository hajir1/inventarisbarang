import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDashboard = create((set, get) => ({
  dashboard: false,
  setDashboard: () => {
    const db = get().dashboard;
    if (db) {
      set({ dashboard: false });
    } else {
      set({ dashboard: true });
    }
  },
}));
export const useToken = create(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set({ token }),
      logout: () => set({ token: "" }),
    }),
    { name: "token" }
  )
);
export const useDeleteAll = create((set, get) => ({
  del: false,
  setDel: () => {
    const db = get().del;
    if (db) {
      set({ del: false });
    } else {
      set({ del: true });
    }
  },
}));