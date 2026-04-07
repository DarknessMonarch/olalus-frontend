import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useBlogsStore = create((set) => ({
  blogs: [],
  categories: [],
  loading: false,

  fetchBlogs: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/blog`);
      const data = await res.json();
      if (data.success) set({ blogs: data.blogs });
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const res = await fetch(`${SERVER_API}/blog/categories`);
      const data = await res.json();
      if (data.success) set({ categories: data.categories });
    } catch {
      /* silent */
    }
  },
}));
