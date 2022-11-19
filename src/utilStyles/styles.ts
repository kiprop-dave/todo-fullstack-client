import styled from "styled-components";

type pageProps = {
  direction?: string
}

const Page = styled.main` 
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: ${({direction}:pageProps) => direction ? direction : "row"};
    align-items: center;
    justify-content: center;
    background-color: #141414;
`
type titleProps = {
    color?: string;
    size?: string;
  };
  const Title = styled.h2`
    color: ${({ color }) => (color ? color : "#ffff")};
    font-size: ${({ size }: titleProps) => (size ? size : "20px")};
  `;

type buttonProps = {
    color:string,
    background:string,
    height:string,
    width:string
}
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({color}) => color };
    background-color: ${({background}:buttonProps) => background};
    height: ${({height}) => height};
    width: ${({width}) => width};
    cursor: pointer;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    font-family: 'Roboto Mono', monospace;
`

export {Page,Button,Title}