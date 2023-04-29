import { Box, Text } from "rebass";
import styled from "styled-components";
import SongCard from "./SongCard";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { SongTypeWithId } from "../types";
import { Bars } from "react-loader-spinner";

type Props = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSong: React.Dispatch<React.SetStateAction<SongTypeWithId>>;
  setShowSong: React.Dispatch<React.SetStateAction<boolean>>;
};

const SongList = ({ setShowSidebar, setSelectedSong, setShowSong }: Props) => {
  const { songs, isLoading } = useSelector((state: RootState) => state.songs);

  return (
    <GridBox>
      {songs.length === 0 && !isLoading && (
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

      {isLoading && (
        <LoadingBox>
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <Text>Loading...</Text>
        </LoadingBox>
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

const LoadingBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  z-index: 20;
`;

export default SongList;
