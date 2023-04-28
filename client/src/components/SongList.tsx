import { Box } from "rebass";
import styled from "styled-components";
import SongCard from "./SongCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SongTypeWithId } from "../types";
import { useState } from "react";

type Props = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSong: React.Dispatch<React.SetStateAction<SongTypeWithId>>;
  setShowSong: React.Dispatch<React.SetStateAction<boolean>>;
};

const SongList = ({ setShowSidebar, setSelectedSong, setShowSong }: Props) => {
  const { songs } = useSelector((state: RootState) => state.songs);

  return (
    <GridBox>
      {songs.length === 0 && (
        <Box
          sx={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          No Songs Found
        </Box>
      )}
      {songs.map((song) => (
        <SongCard
          key={song._id}
          song={song}
          setShowSidebar={setShowSidebar}
          setSelectedSong={setSelectedSong}
          setShowSong={setShowSong}
        />
      ))}
    </GridBox>
  );
};

const GridBox = styled(Box)`
  width: 100%;
  display: grid;
  place-items: center;
  gap: 2rem 2rem;
  grid-template-columns: repeat(auto-fit, minmax(312px, 1fr));
  padding-bottom: 2rem;
`;

export default SongList;
