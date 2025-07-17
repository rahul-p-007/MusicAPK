import { Router } from "express";
import { getAllAlbums, getAlbumById } from "../controllers/album.controller.js";
const route = Router();

route.get("/", getAllAlbums);
route.get("/:albumId", getAlbumById);
console.log("Registering /:albumId route");
// route.get("/:albumId", getAlbumById);

export default route;
