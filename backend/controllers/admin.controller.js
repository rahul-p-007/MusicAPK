import Song from "../models/song.model.js";
import Album from "../models/album.model.js";

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !res.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ message: "Please upload both audio and image files." });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();
    // if song belongs to an album , add it to the album's song array

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log("Error in createSong", error);
    next(error);
  }
};
