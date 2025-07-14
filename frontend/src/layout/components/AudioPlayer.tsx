import { usePlayerStore } from "@/stores/usePlayerStore"; // Zustand store for managing player state
import { useEffect, useRef } from "react";                // React hooks for side-effects and DOM refs

export const AudioPlayer = () => {
  // Create a ref to access the <audio> element directly
  const audioref = useRef<HTMLAudioElement>(null);

  // Create a ref to store the previously played song's URL
  // This helps detect if the currentSong has changed
  const prevSongRef = useRef<string | null>(null);

  // Destructure current song and playback status from Zustand store
  const { currentSong, isPlaying } = usePlayerStore();

  /**
   * useEffect to react to changes in either:
   *  - `currentSong` (new song selected)
   *  - `isPlaying` (toggle play/pause)
   */
  useEffect(() => {
    const audio = audioref.current;

    // If there's no <audio> element or no song is currently selected, exit early
    if (!audio || !currentSong) return;

    // Check if the song has changed by comparing audio URLs
    const isSongChange = prevSongRef.current !== currentSong.audioUrl;

    // Update the ref to the current song's URL (used in next render)
    prevSongRef.current = currentSong.audioUrl;

    // Function to configure the audio element and start playback
    const setupAndPlay = () => {
      audio.src = currentSong.audioUrl;  // Set new audio source
      audio.currentTime = 0;             // Reset to the beginning of the song

      // Try to play only if player is in "playing" state
      if (isPlaying) {
        audio
          .play()
          .catch((err) => {
            console.warn("Play failed in setupAndPlay:", err);
            // This can happen if user hasn't interacted with the page (autoplay restrictions)
          });
      }
    };

    /**
     * CASE 1: The song has changed (new song selected)
     * - Pause current audio
     * - Setup and wait for the new song to be ready (canplay event)
     */
    if (isSongChange) {
      audio.pause(); // Stop current song immediately

      // When the new audio file is loaded and ready to play
      const handleCanPlay = () => {
        if (isPlaying) {
          audio
            .play()
            .catch((err) => {
              console.warn("Play failed after canplay:", err);
            });
        }
      };

      // Attach listener to handle when the audio is ready
      audio.addEventListener("canplay", handleCanPlay);

      // Prepare the new audio source
      setupAndPlay();

      // Cleanup the event listener when the component re-renders or unmounts
      return () => {
        audio.removeEventListener("canplay", handleCanPlay);
      };
    }

    /**
     * CASE 2: Song is the same, only play/pause state changed
     * - Toggle playback accordingly
     */
    else {
      if (isPlaying) {
        // Resume or continue playing
        audio
          .play()
          .catch((err) => {
            console.warn("Play failed in update:", err);
          });
      } else {
        // Pause playback
        audio.pause();
      }
    }

    // useEffect depends on both currentSong and isPlaying
  }, [currentSong, isPlaying]);

  /**
   * Render an invisible <audio> element that handles playback.
   * It's controlled entirely by React through the ref.
   */
  return <audio ref={audioref} />;
};
