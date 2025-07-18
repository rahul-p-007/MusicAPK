import Topbar from "@/components/ui/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

function HomePage() {
  const {
    trendingSongs,
    madeForYouSongs,
    featuredSongs,
    fetchFeaturedSongs,
    fetchTrendingSongs,
    fetchMadeForYouSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
  // console.log({ isLoading, madeForYouSongs, featuredSongs, trendingSongs });

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...madeForYouSongs, ...featuredSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, featuredSongs, trendingSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6 ">
          <h1 className="text-2xl font-bold sm:text-3xl mb-6">Good Mornig</h1>
          <FeaturedSection />
          <div className="space-y-6">
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={false}
            />
            <SectionGrid
              title="Trending"
              songs={trendingSongs}
              isLoading={false}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
}

export default HomePage;
