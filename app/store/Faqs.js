import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useFaqsStore = create((set) => ({
  faqs: [],
  loading: false,

  fetchFaqs: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/faq`);
      const data = await res.json();
      if (data.success) set({ faqs: data.data });
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },
}));
