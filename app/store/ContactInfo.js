import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useContactInfoStore = create((set) => ({
  contactInfo: null,
  loading: false,

  fetchContactInfo: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/contact-info`);
      const data = await res.json();
      if (data.success && data.data) set({ contactInfo: data.data });
    } catch {
    } finally {
      set({ loading: false });
    }
  },
}));
