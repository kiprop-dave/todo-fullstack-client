import { AuthContext } from "../context/AuthProvider";
import React, { useRef, useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import styled from "styled-components";
import { Button } from "../utilStyles/styles";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.form`
  width: 500px;
  height: 400px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
  background-color: #1e1e1e;
  padding: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type titleProps = {
  color?: string;
  size?: string;
};
const Title = styled.h2`
  color: ${({ color }) => (color ? color : "#ffff")};
  font-size: ${({ size }: titleProps) => (size ? size : "20px")};
`;

const InputContainer = styled.div`
  width: 100%;
`;
const Label = styled.label`
  color: #cccccc;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #cccccc;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
  background-color: #1e1e1e;
  color: #cccccc;
  height: 2.5rem;
  padding: 1%;
  font-family: "Roboto Mono", monospace;
`;

const SignUp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const Span = styled.span`
  color: #ffffff;
  cursor: pointer;
`;

type formProps = {
  signUp?: boolean;
  login?: boolean;
};

const EMAIL = /loss/;
const PASSWORD = /test/;

function Form({ signUp, login }: formProps) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  if (!context) return null;
  const { setAuth } = context;
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverResponse, setServerResponse] = useState("");

  useEffect(() => {
    if (!emailRef.current) {
      throw new Error("element ref not assigned");
    }
    emailRef.current.focus();
  }, []);

  const path = signUp ? "/signup" : "/login";
  const link = signUp ? "/login" : "/signup";

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        path,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      // console.log(response?.data);
      setAuth({ ...response.data, email });
      navigate("/todo", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container onSubmit={handleSubmit}>
      <Header>
        <Title color="#CCCCCC" size="12px">
          {signUp ? "WELCOME" : "WELCOME BACK"}
        </Title>
        <Title size="20px">
          {signUp && "Create account"}
          {login && "Log Into You Account"}
        </Title>
      </Header>
      <InputContainer>
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type={"text"}
          name="email"
          placeholder="Enter your email"
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type={"password"}
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <Button height="2.5rem" background="#0e43fa" color="#ffffff" width="100%">
        {signUp && "Sign Up"}
        {login && "Login"}
      </Button>
      <SignUp>
        <Title color="#CCCCCC" size="12px">
          {signUp && "Already a user ? "}
          {login && "New user ? "}
          <Span>
            <Link to={link}>
              {signUp && "Sign In"}
              {login && "Create Account"}
            </Link>
          </Span>
        </Title>
      </SignUp>
    </Container>
  );
}

export default Form;
