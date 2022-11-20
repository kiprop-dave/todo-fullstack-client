import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { themeProps } from "../types/types";

const Container = styled.nav`
  z-index: 2;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h1`
  letter-spacing: 10px;
  font-size: 35px;
  color: white;
  font-weight: 700;
`;

const Toggler = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
`;

const ToggleIcon = styled.img``;

function Navbar() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { toggleTheme, lightMode } = themeContext;

  const iconUrl = lightMode ? "/icon-moon.svg" : "/icon-sun.svg";
  return (
    <Container>
      <Title>TODO</Title>
      <Toggler onClick={(e) => toggleTheme(e)}>
        <ToggleIcon src={iconUrl} alt="sun or moon" />
      </Toggler>
    </Container>
  );
}

export default Navbar;
