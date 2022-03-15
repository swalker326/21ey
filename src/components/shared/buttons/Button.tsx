import { darken, lighten } from "polished";
import styled from "styled-components";

type ButtonProps = {
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.bg.button};
  color: ${(props) => props.theme.text.button};
  border: 1px solid lightgray;
  padding: 0.5rem 1rem;
  margin: 0.2rem 0.5rem;
  border-radius: 6px;
  min-height: 2.75rem;
  /* font-size: ${({ theme: { fontSizes } }) => fontSizes[16]}; */
  &:hover {
    /* background-color: ${(props) => lighten(0.3, props.theme.bg.button)};
    color: ${(props) => lighten(0.6, props.theme.text.button)}; */
  }
`;
