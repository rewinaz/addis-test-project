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
  if (songs) {
    yield put(getSongs(songs));
  }
  yield put(setLoading(false));
}

export function* createSongSaga(action: { payload: SongType }) {
  yield put(setLoading(true));
  const song: ReturnType<typeof createSongApi> = yield createSongApi(
    action.payload
  );
  if (song) {
    yield put(setSong(song));
  }
  yield put(setLoading(false));
}

export function* deleteSongSaga(action: { payload: string }) {
  yield put(setLoading(true));
  const song: ReturnType<typeof deleteSong> = yield deleteSongApi(
    action.payload
  );
  if (song) {
    yield put(deleteSong(action.payload));
  }
  yield put(setLoading(false));
}

export function* updateSongSaga(action: {
  payload: { id: string; song: SongType };
}) {
  yield put(setLoading(true));

  const song: ReturnType<typeof updateSongApi> = yield updateSongApi(
    action.payload.id,
    action.payload.song
  );

  if (song) {
    yield put(updateSong(song));
  }
  yield put(setLoading(false));
}

export function* searchSongsSaga(action: { payload: string }) {
  yield put(setLoading(true));

  const songs: ReturnType<typeof searchSongApi> = yield searchSongApi(
    action.payload
  );
  if (songs) {
    yield put(getSongs(songs));
  }
  yield put(setLoading(false));
}

export function* watchSongsAsync() {
  yield takeLatest(GET_SONGS, fetchSongsSaga);
  // @ts-ignore
  yield takeLatest(CREATE_SONG, createSongSaga);
  // @ts-ignore
  yield takeLatest(DELETE_SONG_BY_ID, deleteSongSaga);
  // @ts-ignore
  yield takeLatest(UPDATE_SONG_BY_ID, updateSongSaga);
  // @ts-ignore
  yield takeLatest(SEARCH_SONG_BY_NAME, searchSongsSaga);
}
