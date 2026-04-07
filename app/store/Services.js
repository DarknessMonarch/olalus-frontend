import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useServicesStore = create((set) => ({
  services: [],
  loading: false,

  fetchServices: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/services`);
      const data = await res.json();
      if (data.success) set({ services: data.data });
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },
}));
