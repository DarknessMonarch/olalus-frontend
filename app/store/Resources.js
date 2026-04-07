import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useResourcesStore = create((set) => ({
  resources: [],
  loading: false,

  fetchResources: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/resources`);
      const data = await res.json();
      if (data.success) set({ resources: data.data });
    } catch {
    } finally {
      set({ loading: false });
    }
  },

  fetchBySlug: async (slug) => {
    try {
      const res = await fetch(`${SERVER_API}/resources/slug/${slug}`);
      const data = await res.json();
      if (data.success) return data.data;
      return null;
    } catch {
      return null;
    }
  },
}));
