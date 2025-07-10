import { Song } from "../models/song.model.js";
export const getAllSongs = async (req, res, next) => {
  try {
    // -1 = Descending => newest -> oldest
    // 1 = Ascending =>  oldest -> newest

    const songs = await Song.find().sort({ createdAt: -1 });

    res.json(songs);
  } catch (error) {
    console.log("Error in getAllSongs", error);
    next(error);
  }
};

// Exporting the function so it can be used in routes (e.g. in Express)
export const getFeaturedSongs = async (req, res, next) => {
  try {
    // Use MongoDB's aggregation pipeline to fetch and process data
    const songs = await Song.aggregate([
      // 1st stage: Randomly select 6 documents from the Song collection
      { $sample: { size: 6 } },

      // 2nd stage: Project only the selected fields from each song
      {
        $project: {
          _id: 1, // Include the _id field
          title: 1, // Include the song title
          artist: 1, // Include the artist name or ID
          imageUrl: 1, // Include the URL of the song's cover image
          audioUrl: 1, // Include the URL of the audio file
        },
      },
    ]);

    // Send back the 6 randomly selected songs as a JSON response with HTTP 200 (OK)
    res.status(200).json(songs);
  } catch (error) {
    // Log any errors that occur during the process
    console.log("Error in getFeaturedSongs", error);

    // Pass the error to the next middleware (Express error handler)
    next(error);
  }
};

export const getMadeForYou = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in getMadeForYou", error);
    next(error);
  }
};
export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in getTredingSongs", error);
    next(error);
  }
};
