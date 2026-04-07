import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useWaiversStore = create((set) => ({
  waivers: [],
  loading: false,

  fetchWaivers: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/waiver`);
      const data = await res.json();
      if (data.success) set({ waivers: data.data });
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },
}));
