import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { Text,Box, Button, Flex, Heading } from "rebass";
import styled from "styled-components";
import TextInput from "./TextInput";
import FileSelector from "./FileSelector";
import { Select } from "@rebass/forms";
import { useDispatch } from "react-redux";
import { UPDATE_SONG_BY_ID } from "../../redux/types";
import { SongType, SongTypeWithId } from "../../types";
import { genres } from "../../data";

type Props = {
  show: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSong: SongTypeWithId;
  setSelectedSong: React.Dispatch<React.SetStateAction<SongTypeWithId>>;
};

const UpdateForm = ({
  selectedSong,
  setSelectedSong,
  show,
  setShowSidebar,
}: Props) => {
  const [image, setImage] = React.useState<string>(selectedSong.image);
  const [title, setTitle] = React.useState<string>(selectedSong.title);
  const [artist, setArtist] = React.useState<string>(selectedSong.artist);
  const [album, setAlbum] = React.useState<string>(selectedSong.album);
  const [duration, setDuration] = React.useState<string>(selectedSong.duration);
  const [year, setYear] = React.useState<string>(selectedSong.year);
  const [genre, setGenre] = React.useState<string>(selectedSong.genre);

  const dispatch = useDispatch();

  const updateSongOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO:
    dispatch({
      type: UPDATE_SONG_BY_ID,
      payload: {
        id: selectedSong._id,
        song: {
          title,
          artist,
          album,
          duration,
          year,
          genre,
          image,
        },
      },
    });
    setShowSidebar(false);
  };

  return (
    <Sidebar show={show} setShowSidebar={setShowSidebar}>
      <Text as={"h1"} mb={4} sx={{ textTransform: "capitalize" }}>
        Update Song
      </Text>
      <FormStyle action="" onSubmit={updateSongOnSubmit}>
        <FileSelector
          state={image}
          setState={setImage}
          buttonText="Insert Image"
        />
        <TextInput
          name="song-name"
          placeholder="Song Name"
          defaultValue={selectedSong.title}
          onChange={(e) =>
            e.target.value.length > 0 && setTitle(e.target.value)
          }
        />
        <TextInput
          name="artist"
          placeholder="Artist"
          defaultValue={selectedSong.artist}
          onChange={(e) =>
            e.target.value.length > 0 && setArtist(e.target.value)
          }
        />
        <TextInput
          name="album"
          placeholder="Album Name"
          defaultValue={selectedSong.album}
          onChange={(e) =>
            e.target.value.length > 0 && setAlbum(e.target.value)
          }
        />
        <TextInput
          name="duration"
          placeholder="Duration"
          defaultValue={selectedSong.duration}
          onChange={(e) =>
            e.target.value.length > 0 && setDuration(e.target.value)
          }
        />
        <TextInput
          name="year"
          placeholder="Year"
          defaultValue={selectedSong.year}
          onChange={(e) => e.target.value.length > 0 && setYear(e.target.value)}
        />

        <Select
          name="genre"
          defaultValue={
            Object.entries(genres).find(
              ([key, genre]) =>
                genre.toLocaleLowerCase() ===
                selectedSong.genre.toLocaleLowerCase()
            )?.[1]
          }
          onChange={(e) => setGenre(e.target.value)}
          sx={{
            backgroundColor: "#333333",
            color: "white",
            mb: 3,
          }}
        >
          {Object.entries(genres).map(([key, genre]) => (
            <option key={key}>{genre}</option>
          ))}
        </Select>
        <Button
          onClick={() => updateSongOnSubmit}
          type="submit"
          sx={{
            width: "100%",
            color: "white",
            backgroundColor: "blue",
            cursor: "pointer",
          }}
        >
          Update Song
        </Button>
      </FormStyle>
    </Sidebar>
  );
};

const FormStyle = styled.form``;

export default UpdateForm;
