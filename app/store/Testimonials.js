import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useTestimonialsStore = create((set) => ({
  testimonials: [],
  loading: false,

  fetchTestimonials: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/testimonial`);
      const data = await res.json();
      if (data.success) set({ testimonials: data.data });
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },
}));
