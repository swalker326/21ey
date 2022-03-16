import { createGlobalStyle } from 'styled-components';
import { get } from './theme';

export const GlobalStyles = createGlobalStyle`
 body {
   margin: 0;
   padding: 0;
   background-color: ${({ theme }) => get(theme, theme.mode, "bg", "primary")};
   color: ${({ theme }) => get(theme, theme.mode, "text", "primary")};
 }
`