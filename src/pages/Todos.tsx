import axios from "../api/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import Navbar from "../components/Navbar";
import NewTodo from "../components/NewTodo";
import Todo from "../components/Todo";
import Footer from "../components/Footer";
import styled from "styled-components";
import { themeProps } from "../types/types";

const TodosPage = styled.main`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ lightMode }: themeProps) =>
    lightMode ? "#e4e5f1" : "hsl(235, 21%, 11%)"};
`;

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 40vh;
  background: ${({ lightMode }: themeProps) =>
    lightMode ? "url(/bg-desktop-light.jpg)" : "url(/bg-desktop-dark.jpg)"};
`;

const AppConteiner = styled.main`
  width: 50%;
  height: 50%;
  z-index: 2;
  margin-top: 6%;
`;

const TodosContainer = styled.div`
  margin-top: 1rem;
  border-radius: 6px;
  background: ${({ lightMode }: themeProps) =>
    lightMode ? "#fafafa" : "hsl(235, 24%, 19%)"};
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
`;
const TopPad = styled.div`
  border-radius: 7px 7px 0 0;
  height: 3px;
  width: 100%;
`;

const createUrl = "/api/todos/create";
function Todos() {
  const [todo, setTodo] = useState("");

  const handleInput = (input: string) => {
    setTodo(input);
  };
  const todosContext = useContext(AuthContext);
  if (!todosContext) return null;
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const { auth, setAuth } = todosContext;
  const { userTodos, email, accessToken } = auth;
  const { lightMode } = themeContext;

  const createTodo = async () => {
    if (!todo.length) {
      return;
    }
    try {
      const response = await axios.post(
        createUrl,
        JSON.stringify({ email, newTodo: { toDo: todo, isCompleted: false } }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );
      // console.log(response.data);
      setAuth({ ...response.data, email, accessToken });
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const todoElements = userTodos?.map((todo, index) => (
    <Todo
      key={index}
      todoItem={todo}
      email={email}
      accessToken={accessToken}
      setToDo={setAuth}
      lightMode={lightMode}
    />
  ));
  return (
    <TodosPage lightMode={lightMode}>
      <BackgroundImage lightMode={lightMode} />
      <AppConteiner>
        <Navbar />
        <NewTodo
          createTodo={createTodo}
          handleInput={handleInput}
          todo={todo}
        />
        <TodosContainer lightMode={lightMode}>
          <TopPad />
          {todoElements}
        </TodosContainer>
        <Footer />
      </AppConteiner>
    </TodosPage>
  );
}

export default Todos;
