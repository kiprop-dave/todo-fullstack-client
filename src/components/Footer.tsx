import styled from "styled-components";
import { themeProps } from "../types/types";
import useLightMode from "../hooks/useLightMode";
import { todo } from "../types/types";

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

type footerProps = {
  all: () => void;
  active: () => void;
  completed: () => void;
  clear: () => void;
  todos?: todo[];
};

function Footer({ all, active, completed, todos, clear }: footerProps) {
  const left = todos?.filter((el) => !el.isCompleted).length;
  const theme = useLightMode();
  if (!theme) return null;
  const { lightMode } = theme;
  return (
    <>
      <Container lightMode={lightMode}>
        <Text>
          {left} item{left && left > 1 ? "s" : ""} left
        </Text>
        <Filter>
          <Text color="hsl(220, 98%, 61%)" hoverAble onClick={() => all()}>
            All
          </Text>
          <Text hoverAble onClick={() => active()}>
            Active
          </Text>
          <Text hoverAble onClick={() => completed()}>
            Completed
          </Text>
        </Filter>
        <Text hoverAble onClick={() => clear()}>
          Clear Completed
        </Text>
      </Container>
    </>
  );
}

export default Footer;
