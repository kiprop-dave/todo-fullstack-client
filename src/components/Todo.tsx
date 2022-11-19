import styled from "styled-components";
import { todo, responseData } from "../types/types";
import axios from "../api/axios";
import { SyntheticEvent } from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 4rem;
  justify-content: space-between;
`;
type checkProps = {
  checked: boolean;
};
const Check = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${({ checked }: checkProps) =>
    checked ? "blue" : "white"};
  border: solid 1px black;
`;
const TodoText = styled.p`
  color: black;
`;
const Delete = styled.button`
  padding: 5px;
`;

type todoProps = {
  todoItem: todo;
  email: string;
  accessToken?: string;
  setToDo: (data: responseData) => void;
};
const urlCompleted = "/api/todos/completed";
const deleteUrl = "/api/todos/delete";
function Todo({ todoItem, email, accessToken, setToDo }: todoProps) {
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

  return (
    <>
      <Container>
        <Check checked={isCompleted} onClick={handleCheck} />
        <TodoText>{toDo}</TodoText>
        <Delete onClick={handleDelete}>delete todo</Delete>
      </Container>
    </>
  );
}

export default Todo;
