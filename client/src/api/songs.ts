import axios from "axios";
import { SongType } from "../types";

export const createSongApi = async (song: SongType) => {
  try {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/songs`,
      song
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSongsApi = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/v1/songs`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateSongApi = async (id: string, song: SongType) => {
  try {
    const { data } = await axios.put(
      `http://localhost:3000/api/v1/songs/${id}`,
      song
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteSongApi = async (id: string) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:3000/api/v1/songs/${id}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const searchSongApi = async (query: string) => {
  try {
    console.log("QUERY :: ", query);
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/songs/search/${query}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
