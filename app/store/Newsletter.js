import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useNewsletterStore = create((set) => ({
  loading: false,

  subscribe: async (email) => {
    set({ loading: true });
    try {
      const res = await fetch(`${SERVER_API}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      return await res.json();
    } catch {
      return { success: false, message: "Something went wrong. Please try again." };
    } finally {
      set({ loading: false });
    }
  },
}));
