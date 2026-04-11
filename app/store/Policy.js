import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const usePolicyStore = create((set) => ({
  policies: {},
  loading: false,

  fetchPolicy: async (key) => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/policies/${key}`);
      const data = await res.json();
      if (data.success) {
        set((s) => ({ policies: { ...s.policies, [key]: data.data } }));
      }
    } catch {
    } finally {
      set({ loading: false });
    }
  },
}));
