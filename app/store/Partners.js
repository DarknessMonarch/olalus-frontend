import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const usePartnersStore = create((set) => ({
  partners: [],
  loading: false,

  fetchPartners: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/partners`);
      const data = await res.json();
      if (data.success) set({ partners: data.data });
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },
}));
