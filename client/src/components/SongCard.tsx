import { Box, Card, Image, Heading, Text, Flex } from "rebass";
import testsImage from "../assets/testImage.jpg";
import editIcon from "../assets/edit_icon.svg";
import deleteIcon from "../assets/delete_icon.svg";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { DELETE_SONG_BY_ID } from "../redux/types";
import { SongTypeWithId } from "../types";

type Props = {
  song: SongTypeWithId;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSong: React.Dispatch<React.SetStateAction<SongTypeWithId>>;
  setShowSong: React.Dispatch<React.SetStateAction<boolean>>;
};

const SongCard = ({
  song,
  setShowSidebar,
  setSelectedSong,
  setShowSong,
}: Props) => {
  const dispatch = useDispatch();

  const updateBtnOnClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowSidebar(true);
    setSelectedSong(song);
  };

  const deleteBtnOnClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch({
      type: DELETE_SONG_BY_ID,
      payload: song._id,
    });
  };

  const songOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowSong(true);
    setSelectedSong(song);
  };
  return (
    <SongBoxStyle>
      <Card
        onClick={songOnClick}
        sx={{
          backgroundColor: "#1a1a1a",
          p: 3,
          borderRadius: "10px",
          boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
        }}
      >
        <Image
          src={song.image}
          width={320}
          height={320}
          sx={{
            objectFit: "cover",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        />
        <Box px={2}>
          <Text as="h3" fontSize={3} sx={{ textTransform: "capitalize" }}>
            {song.title}
          </Text>
          <Text
            fontSize={1}
            color={"#949494"}
            sx={{ textTransform: "capitalize" }}
          >
            {song.artist}
          </Text>
        </Box>
        
        <Flex justifyContent="space-between" alignItems={"center"} px={2} pt={2}>
          <Flex
            alignItems={"center"}
            onClick={updateBtnOnClick}
            sx={{
              ":hover": {
                cursor: "pointer",
                color: "blue",
              },
            }}
          >
            <Image
              src={editIcon}
              sx={{
                height: "1rem",
                mr: 1,
              }}
            />
            <Text sx={{}}>Update</Text>
          </Flex>

          <Flex
            alignItems={"center"}
            onClick={deleteBtnOnClick}
            sx={{
              ":hover": {
                cursor: "pointer",
                color: "red",
              },
            }}
          >
            <Image
              src={deleteIcon}
              sx={{
                height: "1rem",
                mr: 1,
              }}
            />
            <Text sx={{}}>Delete</Text>
          </Flex>
        </Flex>
      </Card>
    </SongBoxStyle>
  );
};

const SongBoxStyle = styled(Box)`
  position: relative;
  max-width: max-content;
  min-width: 312px;
  width: 100%;
  display: grid;
  place-items: center;
`;

export default SongCard;
