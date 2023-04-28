export interface SongType {
  title: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  duration: string;
  image: string;
}

export interface SongTypeWithId extends SongType {
  _id: string;
}
