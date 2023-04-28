import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { Text, Box, Button, Flex, Heading } from "rebass";
import styled from "styled-components";
import TextInput from "./TextInput";
import { Select } from "@rebass/forms";
import FileSelector from "./FileSelector";
import { useDispatch } from "react-redux";
import { setSong } from "../../redux/slices/songSlice";
import { CREATE_SONG } from "../../redux/types";
import { SongTypeWithId } from "../../types";
import { genres } from "../../data";

type Props = {
  show: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const InsertForm = ({ show, setShowSidebar }: Props) => {
  const [image, setImage] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("update_test");
  const [artist, setArtist] = React.useState<string>("update_test");
  const [album, setAlbum] = React.useState<string>("update_test");
  const [duration, setDuration] = React.useState<string>("update_test");
  const [year, setYear] = React.useState<string>("update_test");
  const [genre, setGenre] = React.useState<string>(genres[0]);

  const dispatch = useDispatch();

  const insertSongOnSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: CREATE_SONG,
      payload: {
        title,
        artist,
        album,
        duration,
        year,
        genre,
        image,
      },
    });
    setShowSidebar(false);
  };
  return (
    <Sidebar show={show} setShowSidebar={setShowSidebar}>
      <Text as={"h1"} mb={4} sx={{ textTransform: "capitalize" }}>
        Add Song
      </Text>
      <FormStyle action="" onSubmit={insertSongOnSubmitHandler}>
        <FileSelector
          state={image}
          setState={setImage}
          buttonText="Insert Image"
        />
        <TextInput
          name="song-name"
          placeholder="Song Name"
          onChange={(e) =>
            e.target.value.length > 0 && setTitle(e.target.value)
          }
        />
        <TextInput
          name="artist"
          placeholder="Artist"
          onChange={(e) =>
            e.target.value.length > 0 && setArtist(e.target.value)
          }
        />
        <TextInput
          name="album"
          placeholder="Album Name"
          onChange={(e) =>
            e.target.value.length > 0 && setAlbum(e.target.value)
          }
        />
        <TextInput
          name="duration"
          placeholder="Duration"
          onChange={(e) =>
            e.target.value.length > 0 && setDuration(e.target.value)
          }
        />
        <TextInput
          name="year"
          placeholder="Year"
          onChange={(e) => e.target.value.length > 0 && setYear(e.target.value)}
        />

        <Select
          name="genre"
          sx={{
            backgroundColor: "#333333",
            color: "white",
            mb: 3,
          }}
          defaultValue={genres[0]}
          onChange={(e) => setGenre(e.target.value)}
          value={genre[0]}
        >
          {Object.entries(genres).map(([key, genre]) => (
            <option key={key}>{genre}</option>
          ))}
        </Select>
        <Button
          onClick={insertSongOnSubmitHandler}
          type="submit"
          sx={{
            width: "100%",
            color: "white",
            backgroundColor: "blue",
            cursor: "pointer",
          }}
        >
          Insert Song
        </Button>
      </FormStyle>
    </Sidebar>
  );
};

const FormStyle = styled.form``;

export default InsertForm;
