import styled from "styled-components";
import { themeProps } from "../types/types";
import useLightMode from "../hooks/useLightMode";

const Container = styled.footer`
  width: 100%;
  height: 3rem;
  background: ${({ lightMode }: themeProps) =>
    lightMode ? "#fafafa" : "hsl(235, 24%, 19%)"};
  border-radius: 0 0 7px 7px;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  justify-content: space-between;
  color: ${({ lightMode }: themeProps) =>
    lightMode ? "hsl(235, 21%, 11%)" : "#fafafa"};
`;

type textProps = {
  hoverAble?: boolean;
};
const Text = styled.p`
  color: ${({ color }) => (color ? color : "inherit")};
  opacity: 0.5;
  cursor: ${({ hoverAble }) => (hoverAble ? "pointer" : "auto")};

  &:hover {
    opacity: ${({ hoverAble }: textProps) => (hoverAble ? "1" : "0.5")};
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
`;

function Footer() {
  const theme = useLightMode();
  if (!theme) return null;
  const { lightMode } = theme;
  return (
    <>
      <Container lightMode={lightMode}>
        <Text>3 items left</Text>
        <Filter>
          <Text color="hsl(220, 98%, 61%)">All</Text>
          <Text hoverAble>Active</Text>
          <Text hoverAble>Completed</Text>
        </Filter>
        <Text hoverAble>Clear Completed</Text>
      </Container>
    </>
  );
}

export default Footer;
