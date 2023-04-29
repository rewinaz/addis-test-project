import { Box, Button, Flex, Heading, Image, Text } from "rebass";
import { Input } from "@rebass/forms";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { GET_SONGS, SEARCH_SONG_BY_NAME } from "../redux/types";
import { debounce } from "../util";

type Props = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ setShowSidebar }: Props) => {
  const dispatch = useDispatch();
  const searchSongEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.value.trim().toLowerCase());
    if (e.target.value.trim().length === 0) {
      return dispatch({
        type: GET_SONGS,
      });
    }

    dispatch({
      type: SEARCH_SONG_BY_NAME,
      payload: e.target.value.trim().toLowerCase(),
    });
  };
  return (
    <HeaderStyle>
      <Flex
        width={"100%"}
        px={2}
        pt={4}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Text as="h1" sx={{ textTransform: "uppercase", lineHeight: "1" }}>
          Adiss Song List
        </Text>
        <Button
          backgroundColor={"blue"}
          sx={{
            cursor: "pointer",
            ":hover": {
              backgroundColor: "darkblue",
            },
          }}
          onClick={() => setShowSidebar(true)}
        >
          Add New Song
        </Button>
      </Flex>
      <FormStyle action="" onSubmit={(e) => e.preventDefault()}>
        <Input
          id="comment"
          name="comment"
          placeholder="Search Song By Title"
          onInput={debounce(searchSongEvent, 300)}
        />
      </FormStyle>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  width: 100%;
`;

const FormStyle = styled.form`
  width: 100%;
  margin: 2rem auto;

  input {
    border-radius: 5px;
  }
`;

export default Header;
