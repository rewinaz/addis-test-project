import { useState, useEffect } from "react";
import styled from "styled-components";
import SongList from "./components/SongList";
import Header from "./components/Header";
import GlobalStyle from "./style/globalStyle";
import InsertForm from "./components/forms/InsertForm";
import { useDispatch, useSelector } from "react-redux";
import { GET_SONGS } from "./redux/types";
import { SongTypeWithId } from "./types";
import UpdateForm from "./components/forms/UpdateForm";
import ShowSong from "./components/ShowSong";
import { Bars } from "react-loader-spinner";
import { Box, Text } from "rebass";
import { RootState } from "./store";

const selectedSongInitial: SongTypeWithId = {
  _id: "",
  title: "",
  artist: "",
  album: "",
  year: "",
  genre: "",
  duration: "",
  image: "",
};

function App() {
  const [showInsertForm, setShowInsertForm] = useState<boolean>(false);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const [showSong, setShowSong] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] =
    useState<SongTypeWithId>(selectedSongInitial); // [1
  const dispatch = useDispatch();
  const { songs, isLoading } = useSelector((state: RootState) => state.songs);

  useEffect(() => {
    dispatch({
      type: GET_SONGS,
    });

    return () => {};
  }, [dispatch]);
  return (
    <AppStyle>
      <MainContentsStyle>
        <GlobalStyle />
        <Header setShowSidebar={setShowInsertForm} />
        <SongList
          setShowSidebar={setShowUpdateForm}
          setSelectedSong={setSelectedSong}
          setShowSong={setShowSong}
        />
      </MainContentsStyle>
      {showInsertForm && (
        <InsertForm show={showInsertForm} setShowSidebar={setShowInsertForm} />
      )}
      {showUpdateForm && (
        <UpdateForm
          show={showUpdateForm}
          setShowSidebar={setShowUpdateForm}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
        />
      )}
      {showSong && (
        <ShowSong
          show={showSong}
          setShowSidebar={setShowSong}
          selectedSong={selectedSong}
          setShowUpdateForm={setShowUpdateForm}
        />
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
          <Text>Loading... Backend server can be slow on first time</Text>
        </LoadingBox>
      )}
    </AppStyle>
  );
}

const AppStyle = styled.div`
  position: relative;
  background-color: inherit;
  overflow-x: hidden;
  height: 100vh;
`;

const MainContentsStyle = styled.div`
  position: none;
  max-width: 1440px;
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  scroll-events: none;
`;

export default App;
