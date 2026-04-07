import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useBannersStore = create((set) => ({
  banners: [],
  loading: false,

  fetchBanners: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/banner`);
      const data = await res.json();
      if (data.success) set({ banners: data.data });
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },
}));
