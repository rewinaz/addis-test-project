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
import { SongType, SongTypeWithId } from "../../types";
import { genres } from "../../data";
import { Formik, Form, Field } from "formik";
import ErrorMessage from "./ErrorMessage";
import { SongSchema } from "../../validationSchemas";

type Props = {
  show: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const InsertForm = ({ show, setShowSidebar }: Props) => {
  const [image, setImage] = React.useState<string>("");

  const [genre, setGenre] = React.useState<string>(genres[0]);

  const dispatch = useDispatch();

  const insertSongOnSubmitHandler = (song: SongType) => {
    dispatch({
      type: CREATE_SONG,
      payload: song,
    });
    setShowSidebar(false);
  };
  return (
    <Sidebar show={show} setShowSidebar={setShowSidebar}>
      <Text as={"h1"} mb={4} sx={{ textTransform: "capitalize" }}>
        Add Song
      </Text>
      <Formik
        initialValues={{
          title: "",
          artist: "",
          album: "",
          duration: "",
          year: "",
        }}
        validationSchema={SongSchema}
        onSubmit={(values) => {
          if (image && image.length > 0) {
            insertSongOnSubmitHandler({
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
              sx={{
                backgroundColor: "#333333",
                color: "white",
                mb: 3,
              }}
              defaultValue={genres[0]}
              onChange={(e) => setGenre(e.target.value)}
            >
              {Object.entries(genres).map(([key, genre]) => (
                <option key={key}>{genre}</option>
              ))}
            </Select>
            <Button
              onClick={() => insertSongOnSubmitHandler}
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
          </Form>
        )}
      </Formik>
    </Sidebar>
  );
};

export default InsertForm;
