import { createGlobalStyle } from 'styled-components';
import { darken, lighten } from 'polished'

export const GlobalStyle = createGlobalStyle`
 body {
   margin: 0;
   padding: 0;
   background-color: ${props => props.theme.bg.secondary};
 }
 a {
  color: ${props => props.theme.text.link};
  text-decoration: none;
 }
 a:hover {
   color: ${props => lighten(0.17, props.theme.text.link)}
 }
`