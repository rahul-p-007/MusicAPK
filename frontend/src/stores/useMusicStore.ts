import { create } from "zustand";
export const useMusicStore = create((set) => ({
  albums: [],
  songs: [],

  fetchAlubms: async () => {},
}));
