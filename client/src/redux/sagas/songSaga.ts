import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  fetchSongsApi,
  createSongApi,
  deleteSongApi,
  updateSongApi,
  searchSongApi,
} from "../../api/songs";
import { SongType, SongTypeWithId } from "../../types/index";
import {
  deleteSong,
  getSong,
  getSongs,
  setLoading,
  setSong,
  updateSong,
} from "../slices/songSlice";
import {
  CREATE_SONG,
  DELETE_SONG_BY_ID,
  GET_SONGS,
  SEARCH_SONG_BY_NAME,
  UPDATE_SONG_BY_ID,
  SET_IS_LOADING,
} from "../types/index";

export function* fetchSongsSaga() {
  yield put(setLoading(true));
  const songs: ReturnType<typeof fetchSongsApi> = yield fetchSongsApi();
  console.log("ALL_SONGS_SAGA :: ", songs);
  if (songs) {
    yield put(setLoading(false));
    yield put(getSongs(songs));
  }
}

export function* createSongSaga(action: { payload: SongType }) {
  console.log("SONG :: ", action.payload);
  const song: ReturnType<typeof createSongApi> = yield createSongApi(
    action.payload
  );
  console.log("SONG :: ", song);
  if (song) yield put(setSong(song));
}

export function* deleteSongSaga(action: { payload: string }) {
  console.log("SONG_ID :: ", action.payload);
  const song: ReturnType<typeof deleteSong> = yield deleteSongApi(
    action.payload
  );
  if (song) yield put(deleteSong(action.payload));
}

export function* updateSongSaga(action: {
  payload: { id: string; song: SongType };
}) {
  console.log("UPDATE_SONG_SAGA :: ", action.payload);
  const song: ReturnType<typeof updateSongApi> = yield;
  updateSongApi(action.payload.id, action.payload.song);

  console.log("UPDATE_SONG_SAGA :: ", song);
  if (song) yield put(updateSong(song));
}

export function* searchSongsSaga(action: { payload: string }) {
  console.log("SEARCH_KEY ::::: ", action.payload);
  const songs: ReturnType<typeof searchSongApi> = yield searchSongApi(
    action.payload
  );
  console.log("SEARCH_RESULT :: ", songs);
  yield put(getSongs(songs));
}

export function* watchSongsAsync() {
  yield takeEvery(GET_SONGS, fetchSongsSaga);
  // @ts-ignore
  yield takeEvery(CREATE_SONG, createSongSaga);
  // @ts-ignore
  yield takeEvery(DELETE_SONG_BY_ID, deleteSongSaga);
  // @ts-ignore
  yield takeLatest(UPDATE_SONG_BY_ID, updateSongSaga);
  // @ts-ignore
  yield takeEvery(SEARCH_SONG_BY_NAME, searchSongsSaga);
}
