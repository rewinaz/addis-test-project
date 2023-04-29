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
    getSong: (state, action) => {
      const song = state.songs.find((song) => song._id === action.payload);
      state.songs = action.payload;
      return state;
    },
    getSongs: (state, action) => {
      state = action.payload;
      return state;
    },

    setSong: (state, action) => {
      console.log("FROM SLICE :: ", action);
      state.songs.push(action.payload.song);
      state.songs = state.songs;
      console.log("FROM SLICE CREATE:: ", action.payload.song);
      return state;
    },
    updateSong: (state, action) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload.song._id
      );
      state.songs[index] = action.payload.song;
      state.songs = state.songs;
      console.log("FROM SLICE UPDATE:: ", action.payload.song, " :: ", index);
      return state;
    },
    deleteSong: (state, action) => {
      const index = state.songs.findIndex(
        (song) => song._id === action.payload
      );
      state.songs.splice(index, 1);
      state.songs = state.songs;
      console.log("FROM SLICE DELETE:: ", action.payload.song, " :: ", index);
      return state;
    },
    setLoading: (state, action) => {
      console.log("FROM SLICE SET_LOADING:: ", action.payload);
      state.isLoading = action.payload;
      return state;
    },
  },
});

export const {
  getSong,
  getSongs,
  setSong,
  deleteSong,
  updateSong,
  setLoading,
} = songSlice.actions;

export const selectSong = (state: InitialStateType) => state.songs;

export default songSlice.reducer;
