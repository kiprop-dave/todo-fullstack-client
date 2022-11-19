import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 50%;
`;
const AddButton = styled.button`
  padding: 5px;
`;
type newToDoProps = {
  handleInput: (x: string) => void;
  createTodo: () => void;
  todo: string;
};
function NewTodo({ handleInput, createTodo, todo }: newToDoProps) {
  return (
    <Container>
      <Input value={todo} onChange={(e) => handleInput(e.target.value)} />
      <AddButton onClick={() => createTodo()}>Add</AddButton>
    </Container>
  );
}

export default NewTodo;
