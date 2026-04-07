import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useAppointmentsStore = create((set) => ({
  loading: false,

  submit: async (form) => {
    set({ loading: true });
    try {
      const res = await fetch(`${SERVER_API}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      return await res.json();
    } catch {
      return { success: false, message: "Something went wrong. Please try again." };
    } finally {
      set({ loading: false });
    }
  },
}));
