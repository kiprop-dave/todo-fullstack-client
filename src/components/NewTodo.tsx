import styled from "styled-components";
import CircleCheck from "./CircleCheck";
import { themeProps } from "../types/types";
import useLightMode from "../hooks/useLightMode";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 3rem;
  justify-content: space-between;
  border-radius: 7px;
  margin-top: 2rem;
  padding: 0.5rem;
  background-color: ${({ lightMode }: themeProps) =>
    lightMode ? "#fafafa" : "hsl(235, 24%, 19%)"};
`;

const Input = styled.input`
  width: 88%;
  height: 80%;
  border: none;
  background-color: ${({ lightMode }: themeProps) =>
    lightMode ? "#fafafa" : "hsl(235, 24%, 19%)"};
  color: ${({ lightMode }) => (lightMode ? "hsl(235, 21%, 11%)" : "#fafafa")};

  &:focus {
    outline: none;
  }
`;
const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
`;

const AddIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;
type newToDoProps = {
  handleInput: (x: string) => void;
  createTodo: () => void;
  todo: string;
};
function NewTodo({ handleInput, createTodo, todo }: newToDoProps) {
  const theme = useLightMode();
  if (!theme) return null;
  const { lightMode } = theme;
  return (
    <Container lightMode={lightMode}>
      <CircleCheck />
      <Input
        lightMode={lightMode}
        value={todo}
        placeholder="Create a new todo..."
        onChange={(e) => handleInput(e.target.value)}
      />
      <AddButton onClick={() => createTodo()}>
        <AddIcon src="/add-icon.png" alt="add todo" />
      </AddButton>
    </Container>
  );
}

export default NewTodo;
