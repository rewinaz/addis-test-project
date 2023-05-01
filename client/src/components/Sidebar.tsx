import React, { Children, PropsWithChildren } from "react";
import { Flex, Image } from "rebass";
import styled from "styled-components";
import backArrow from "../assets/arrow-left.svg";

interface Props {
  show: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({
  children,
  show,
  setShowSidebar,
}: Props & PropsWithChildren) => {
  return (
    <SidebarWrapper
      show={show}
      onClick={(e) => {
        setShowSidebar(false);
      }}
    >
      <SidebarStyle
        show={show}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Image
          onClick={() => setShowSidebar(false)}
          src={backArrow}
          sx={{
            position: "absolute",
            right: "0",
            top: "0",
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
            m: "1rem",
          }}
        />
        <ContentStyle>{children}</ContentStyle>
      </SidebarStyle>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div<{ show: boolean }>`
  position: fixed;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  top: 0;
  bottom: 0;
  right: 0;
  transition: transform 0.01s ease-in-out;
  transform: translateX(${(props) => (props.show ? "0" : "100%")});

  display: flex;
  justify-content: flex-end;
  `;

const SidebarStyle = styled.div<{ show: boolean }>`
  position: relative;
  max-width: 500px;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  z-index: 3;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => (props.show ? "0" : "100%")});
`;

const ContentStyle = styled.div`
  max-width: 500px;
  width: 90%;

  margin-top: 4rem;
  padding-bottom: 2rem;
`;

export default Sidebar;
