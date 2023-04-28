import { Router } from "express";
import {
  createSong,
  deleteSong,
  getAllSongs,
  getSong,
  updateSong,
  searchSongs,
} from "../controllers/songs";

const router = Router();

router.get("/", getAllSongs);
router.get("/search/:title", searchSongs);
router.get("/:id", getSong);
router.post("/", createSong);
router.put("/:id", updateSong);
router.delete("/:id", deleteSong);

export default router;
