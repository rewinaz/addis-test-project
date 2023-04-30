import axios from "axios";
import { SongType } from "../types";

const API_URL = (import.meta.env.VITE_API_URI as string) + `/api/v1/songs`;

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const createSongApi = async (song: SongType) => {
  try {
    const { data } = await axios.post(API_URL, song);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSongsApi = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateSongApi = async (id: string, song: SongType) => {
  try {
    const { data } = await axios.put(API_URL + `/${id}`, song);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteSongApi = async (id: string) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const searchSongApi = async (query: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/search/${query}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
