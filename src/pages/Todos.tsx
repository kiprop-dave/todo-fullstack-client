import axios from "../api/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ThemeContext } from "../context/ThemeProvider";
import NewTodo from "../components/NewTodo";
import Todo from "../components/Todo";
import styled from "styled-components";

const TodosPage = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const { lightMode, toggleTheme } = themeContext;

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
    />
  ));
  return (
    <TodosPage>
      <NewTodo createTodo={createTodo} handleInput={handleInput} todo={todo} />
      <div>{todoElements}</div>
    </TodosPage>
  );
}

export default Todos;
