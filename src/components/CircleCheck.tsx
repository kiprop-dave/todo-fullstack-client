import styled from "styled-components";
import useLightMode from "../hooks/useLightMode";
import { themeProps } from "../types/types";

const Circle = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: ${({ lightMode }: themeProps) =>
    lightMode ? "solid 1px black" : "solid 1px #fafafa"};
  border-width: 1px;
  border-radius: 50%;
  cursor: pointer;
`;
function CircleCheck() {
  const theme = useLightMode();
  if (!theme) return null;
  const { lightMode } = theme;
  return (
    <>
      <Circle lightMode={lightMode} />
    </>
  );
}

export default CircleCheck;
