import { Request, Response } from "express";

import Song from "../models/song";

export const createSong = async (req: any, res: Response) => {
  const { title, artist, album, year, genre, duration, image } = req.body;

  if (!title || !artist || !album || !year || !genre || !duration || !image) {
    return res.status(400).json({
      message: "Please fill all required field",
    });
  }

  try {
    const song = new Song({
      title,
      artist,
      album,
      year,
      genre,
      duration,
      image,
    });

    await song.save();
    res.status(201).json({
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating song",
      error: error,
    });
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "id is required",
    });
  }
  Song.findByIdAndDelete(id)
    .then((song) => {
      res.status(200).json({
        message: "Song deleted successfully",
        song,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting song",
        error: err,
      });
    });
};

export const getAllSongs = async (req: Request, res: Response) => {
  Song.find()
    .then((songs) => {
      res.status(200).json({
        message: "Songs fetched successfully",
        songs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching songs",
        error: err,
      });
    });
};

export const getSong = async (req: Request, res: Response) => {
  const { id } = req.params;
  Song.findById(id)
    .then((song) => {
      res.status(200).json({
        message: "Song fetched successfully",
        song,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error fetching song",
        error: err,
      });
    });
};

export const updateSong = async (req: Request, res: Response) => {
  const { title, artist, album, year, genre, duration, image } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "id is required",
    });
  }

  if (!title || !artist || !album || !year || !genre || !duration || !image) {
    return res.status(400).json({
      message: "Please fill all required field",
    });
  }

  try {
    const song = await Song.findByIdAndUpdate(id, {
      title,
      artist,
      album,
      year,
      genre,
      duration,
      image,
    });

    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }

    res.status(200).json({
      message: "Song updated successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
};

export const searchSongs = async (req: Request, res: Response) => {
  const { title } = req.params;
  if (!title) {
    return res.status(400).json({
      message: "title is required",
    });
  }
  try {
    // find songs part of title
    const songs = await Song.find({ title: { $regex: title, $options: "i" } });
    if (!songs) {
      return res.status(404).json({
        message: "Song not found",
      });
    }
    res.status(200).json({
      message: "Song fetched successfully",
      songs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Somthing went wrong",
    });
  }
};
