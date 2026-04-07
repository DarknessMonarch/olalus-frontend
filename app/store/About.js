import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useAboutStore = create((set) => ({
  about: null,
  loading: false,

  fetchAbout: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/about`);
      const data = await res.json();
      if (data.success) set({ about: data.data });
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },
}));
