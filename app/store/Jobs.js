import { create } from "zustand";

const SERVER_API = process.env.NEXT_PUBLIC_SERVER_API;

export const useJobsStore = create((set) => ({
  jobs: [],
  currentJob: null,
  loading: false,

  fetchJobs: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${SERVER_API}/jobs`);
      const data = await res.json();
      if (data.success) set({ jobs: data.data });
    } catch {
      /* silent */
    } finally {
      set({ loading: false });
    }
  },

  fetchJobById: async (id) => {
    try {
      set({ loading: true, currentJob: null });
      const res = await fetch(`${SERVER_API}/jobs/${id}`);
      const data = await res.json();
      if (data.success) {
        set({ currentJob: data.data });
        return data.data;
      }
      return null;
    } catch {
      return null;
    } finally {
      set({ loading: false });
    }
  },
}));
