import { createGlobalStyle } from 'styled-components';
import { lighten } from 'polished'

export const GlobalStyles = createGlobalStyle`
 body {
   margin: 0;
   padding: 0;
   background-color: ${props => props.theme.bg.secondary};
   color: ${props => props.theme.text.primary};
 }
 a {
  color: ${props => props.theme.text.link};
  text-decoration: none;
 }
 a:hover {
   color: ${props => lighten(0.17, props.theme.text.link)}
 }
`