import 'styled-components'
import { ThemeDefaults } from './theme';
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeDefaults { };
}