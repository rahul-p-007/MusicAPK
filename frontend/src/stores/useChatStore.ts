import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface ChatStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const response = await axiosInstance.get("/users");
      set({
        users: response.data,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch users",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
