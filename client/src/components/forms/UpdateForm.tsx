import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { Text, Box, Button, Flex, Heading } from "rebass";
import styled from "styled-components";
import TextInput from "./TextInput";
import FileSelector from "./FileSelector";
import { Select } from "@rebass/forms";
import { useDispatch } from "react-redux";
import { UPDATE_SONG_BY_ID } from "../../redux/types";
import { SongType, SongTypeWithId } from "../../types";
import { genres } from "../../data";
import { Formik, Form, Field } from "formik";
import ErrorMessage from "./ErrorMessage";
import { SongSchema } from "../../validationSchemas";

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
  const [genre, setGenre] = React.useState<string>(selectedSong.genre);

  const dispatch = useDispatch();

  const updateSongOnSubmit = (id: string, song: SongType) => {
    //TODO:
    dispatch({
      type: UPDATE_SONG_BY_ID,
      payload: {
        id: id,
        song: song,
      },
    });
    setShowSidebar(false);
  };

  return (
    <Sidebar show={show} setShowSidebar={setShowSidebar}>
      <Text as={"h1"} mb={4} sx={{ textTransform: "capitalize" }}>
        Update Song
      </Text>
      <Formik
        initialValues={{
          title: selectedSong.title,
          artist: selectedSong.artist,
          album: selectedSong.album,
          duration: selectedSong.duration,
          year: selectedSong.year,
        }}
        validationSchema={SongSchema}
        onSubmit={(values) => {
          if (image && image.length > 0) {
            updateSongOnSubmit(selectedSong._id, {
              title: values.title,
              artist: values.artist,
              album: values.album,
              duration: values.duration,
              year: values.year,
              genre: genre,
              image: image,
            });
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {image.length < 1 ? (
              <ErrorMessage message={"Image is required"} />
            ) : null}
            <FileSelector
              state={image}
              setState={setImage}
              buttonText="Insert Image"
            />
            {errors.title && touched.title ? (
              <ErrorMessage message={errors.title} />
            ) : null}
            <Field name="title" placeholder="Song Name" component={TextInput} />
            {errors.artist && touched.artist ? (
              <ErrorMessage message={errors.artist} />
            ) : null}
            <Field name="artist" placeholder="Artist" component={TextInput} />

            {errors.album && touched.album ? (
              <ErrorMessage message={errors.album} />
            ) : null}
            <Field name="album" placeholder="Album" component={TextInput} />
            {errors.duration && touched.duration ? (
              <ErrorMessage message={errors.duration} />
            ) : null}
            <Field
              name="duration"
              placeholder="Duration"
              component={TextInput}
              type="number"
            />
            {errors.year && touched.year ? (
              <ErrorMessage message={errors.year} />
            ) : null}
            <Field
              name="year"
              placeholder="Year"
              component={TextInput}
              type="number"
            />

            {genre.length < 1 ? (
              <ErrorMessage message={"Genre is required"} />
            ) : null}

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
          </Form>
        )}
      </Formik>
    </Sidebar>
  );
};

export default UpdateForm;
