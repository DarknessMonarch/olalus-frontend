import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useContactStore = create((set) => ({
  loading: false,

  submit: async (form) => {
    set({ loading: true });
    try {
      const res = await fetch(`${SERVER_API}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      return data;
    } catch {
      return { success: false, message: "Something went wrong. Please try again." };
    } finally {
      set({ loading: false });
    }
  },
}));
