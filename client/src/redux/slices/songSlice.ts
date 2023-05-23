import { createSlice } from "@reduxjs/toolkit";
import { SongTypeWithId } from "../../types";

type InitialStateType = {
  isLoading: boolean;
  songs: SongTypeWithId[];
};

const initialState: InitialStateType = {
  isLoading: false,
  songs: [],
};

export const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongs: (state, action) => {
      return {
        ...state,
        songs: action.payload.songs,
      };
    },

    setSong: (state, action) => {
      state.songs.push(action.payload.song);
    },
    updateSong: (state, action) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload.song._id
      );
      state.songs[index] = action.payload.song;
    },
    deleteSong: (state, action) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload
      );
      state.songs.splice(index, 1);
    },
    setLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
});

export const { getSongs, setSong, deleteSong, updateSong, setLoading } =
  songSlice.actions;

export const selectSong = (state: InitialStateType) => state.songs;

export default songSlice.reducer;
