import styled from "styled-components";
import { todo, responseData } from "../types/types";
import axios from "../api/axios";
import { SyntheticEvent, useState } from "react";
import { themeProps } from "../types/types";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 3rem;
  padding: 0.5rem;
  background-color: ${({ lightMode }: themeProps) =>
    lightMode ? "#fafafa" : "hsl(235, 24%, 19%)"};
  border-bottom: ${({ lightMode }: themeProps) =>
    lightMode
      ? "1px solid hsl(235, 24%, 19%)"
      : "1px solid hsl(235, 19%, 35%)"};
`;
type checkProps = {
  checked: boolean;
  lightMode: boolean;
};
const Check = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ checked, lightMode }: checkProps) =>
    checked
      ? "hsl(220, 98%, 61%)"
      : lightMode && !checked
      ? "#fafafa"
      : "hsl(235, 24%, 19%)"};
  cursor: pointer;
  border: ${({ lightMode }) =>
    lightMode ? "solid 1px black" : "solid 1px #fafafa"};
`;
const TodoText = styled.p`
  color: ${({ lightMode }: checkProps) =>
    lightMode ? "hsl(235, 21%, 11%)" : "#fafafa"};
  margin-left: 1rem;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "none")};
`;
const Delete = styled.img`
  height: 1.2rem;
  width: 1.2rem;
  margin-left: auto;
  cursor: pointer;
`;

type todoProps = {
  todoItem: todo;
  email: string;
  accessToken?: string;
  setToDo: (data: responseData) => void;
  lightMode: boolean;
};
const urlCompleted = "/api/todos/completed";
const deleteUrl = "/api/todos/delete";
function Todo({ todoItem, email, accessToken, setToDo, lightMode }: todoProps) {
  const [hovered, setHovered] = useState(false);

  const { _id, isCompleted, toDo } = todoItem;

  const handleCheck = async (e: SyntheticEvent) => {
    if (isCompleted) {
      return;
    }
    try {
      const response = await axios.put(
        urlCompleted,
        JSON.stringify({ email, todoId: _id }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      //   console.log(response.data);
      setToDo({ ...response.data, email, accessToken });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(deleteUrl, {
        data: { email, todoId: _id },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      //   console.log(response.data);
      setToDo({ ...response.data, email, accessToken });
    } catch (error) {
      console.log(error);
    }
  };

  const mouseEnter = () => {
    setHovered(true);
  };

  const mouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <Container
        lightMode={lightMode}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <Check
          checked={isCompleted}
          onClick={handleCheck}
          lightMode={lightMode}
        >
          {isCompleted && <img src="/icon-check.svg" alt="check" />}
        </Check>
        <TodoText checked={isCompleted} lightMode={lightMode}>
          {toDo}
        </TodoText>
        {hovered && (
          <Delete src="/icon-cross.svg" alt="delete" onClick={handleDelete} />
        )}
      </Container>
    </>
  );
}

export default Todo;
