import { Button, Flex, Heading, Image } from "rebass";
import Sidebar from "./Sidebar";
import { SongTypeWithId } from "../types";
import styled from "styled-components";
import SongInfoText from "./SongInfoText";
import { useDispatch } from "react-redux";
import { DELETE_SONG_BY_ID } from "../redux/types";

type Props = {
  show: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSong: SongTypeWithId;
  setShowUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShowSong = ({
  show,
  setShowSidebar,
  selectedSong,
  setShowUpdateForm,
}: Props) => {
  const dispatch = useDispatch();

  const updateSongOnClick = () => {
    setShowSidebar(false);
    setShowUpdateForm(true);
  };

  const deleteSongOnClick = () => {
    setShowSidebar(false);
    dispatch({
      type: DELETE_SONG_BY_ID,
      payload: selectedSong._id,
    });
  };
  return (
    <Sidebar show={show} setShowSidebar={setShowSidebar}>
      <ImageStyle src={selectedSong.image} mb={3} />
      <Flex flexDirection="column">
        <SongInfoText title="title" subTitle={selectedSong.title} />
        <SongInfoText title="album" subTitle={selectedSong.album} />
        <SongInfoText title="artist" subTitle={selectedSong.artist} />
        <SongInfoText title="duration" subTitle={selectedSong.duration} />
        <SongInfoText title="year" subTitle={selectedSong.year} />
        <SongInfoText title="genre" subTitle={selectedSong.genre} />
      </Flex>
      <Flex mt={2}>
        <Button
          onClick={updateSongOnClick}
          backgroundColor={"blue"}
          sx={{
            flex: 1,
            cursor: "pointer",
            ":hover": {
              backgroundColor: "darkblue",
            },
            mr: 2,
          }}
        >
          Update
        </Button>
        <Button
          onClick={deleteSongOnClick}
          backgroundColor={"red"}
          sx={{
            flex: 1,
            cursor: "pointer",
            ":hover": {
              backgroundColor: "darkred",
            },
          }}
        >
          Delete
        </Button>
      </Flex>
    </Sidebar>
  );
};

const ImageStyle = styled(Image)`
  border-radius: 5px;
  width: 100%;
`;

export default ShowSong;
