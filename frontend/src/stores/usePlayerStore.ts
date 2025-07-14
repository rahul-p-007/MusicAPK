import { create } from "zustand";

import type { Song } from "@/types";

// Define the shape of the player store's state and actions
type PlayerStore = {
  currentSong: Song | null; // Currently playing song
  isPlaying: boolean; // Whether music is currently playing
  queue: Song[]; // Playlist queue
  currentIndex: number; // Index of the current song in the queue

  // Store Actions
  initializeQueue: (songs: Song[]) => void; // Initialize queue only (doesn't auto-play)
  playAlbum: (songs: Song[], startIndex?: number) => void; // Play an album from optional index
  setCurrentSong: (song: Song | null) => void; // Change the current song and start playing
  togglePlay: () => void; // Pause/Play toggle
  playNext: () => void; // Go to next song in queue
  playPrevious: () => void; // Go to previous song in queue
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // === Initial State ===
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1, // -1 means nothing is selected yet

  // === Action: Initialize queue without playing ===
  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      // If currentSong is already set, keep it. Otherwise use first song in queue
      currentSong: get().currentSong || songs[0],
      // If currentIndex is -1 (initial), set it to 0. Otherwise, keep the current index.
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  // === Action: Play full album starting at a specific index ===
  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;
    const song = songs[startIndex];

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true, // Start playing immediately
    });
  },

  // === Action: Set current song and auto-play it ===
  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id); // Find song's index in queue

    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex, // If found, use that index
    });
  },

  // === Action: Toggle play/pause ===
  togglePlay: () => {
    const willStartPlaying = !get().isPlaying; // Flip current playing state
    set({
      isPlaying: willStartPlaying,
    });
  },

  // === Action: Play next song in the queue ===
  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      // End of queue — stop playing
      set({
        isPlaying: false,
      });
    }
  },

  // === Action: Play previous song in the queue ===
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentIndex: prevIndex,
        currentSong: prevSong,
        isPlaying: true,
      });
    } else {
      // Start of queue — stop playing or optionally loop
      set({
        isPlaying: false,
      });
    }
  },
}));
