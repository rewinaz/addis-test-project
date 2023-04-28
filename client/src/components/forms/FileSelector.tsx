import FileBase from "react-file-base64";
import { Box, Image } from "rebass";
import styled from "styled-components";
import cancelImage from "../../assets/cancel_icon.svg";

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  buttonText?: string;
};

const FileSelector = ({
  state,
  setState,
  buttonText = "Add Song Image",
}: Props) => {
  return (
    <FileSelectorContainer>
      {state.length > 0 && (
        <ImageContainer onClick={() => setState("")}>
          <Image src={state} className="selected-image" alt="cover" />
          <Image
            src={cancelImage}
            sx={{
              position: "absolute",
              width: "80px",
              height: "80px",
            }}
          />
        </ImageContainer>
      )}

      <FileSelectorStyle
        style={{
          display: state.length > 0 ? "none" : "flex",
        }}
      >
        <span>{buttonText}</span>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }: { base64: string }) => {
            setState("");
            setState(base64);
          }}
        />
      </FileSelectorStyle>
    </FileSelectorContainer>
  );
};

const FileSelectorContainer = styled.div`
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  .selected-image {
    border-radius: 5px;
    max-width: 320px;
    width: 100%;
    object-fit: cover;
    margin: 0 auto;
  }
`;

const FileSelectorStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  margin-bottom: 1rem;
  border-radius: 5px;
  position: relative;
  border: 1px solid blue;

  span {
    position: absolute;
  }

  input {
    cursor: pointer;
    border: 1px solid red;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
  }
`;

const ImageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default FileSelector;
