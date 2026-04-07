import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useCommentsStore = create((set) => ({
  approvedComments: [],
  commentStats: null,
  loading: false,

  fetchApprovedComments: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/comments/approved`);
      const data = await res.json();
      if (data.success) {
        const mapped = data.data.map((c) => ({
          _id: c._id,
          name: c.name,
          content: c.comment,
          rating: c.rating,
          position: c.relationship || "Reviewer",
        }));
        set({ approvedComments: mapped });
      }
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },

  fetchCommentStats: async () => {
    try {
      const res = await fetch(`${SERVER_API}/comments/stats`);
      const data = await res.json();
      if (data.success) set({ commentStats: data.data });
    } catch {
      /* silent */
    }
  },

  submitComment: async (form) => {
    try {
      const res = await fetch(`${SERVER_API}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      return await res.json();
    } catch {
      return { success: false, message: "Something went wrong. Please try again." };
    }
  },
}));
