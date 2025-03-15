import 'styled-components';
import { Theme } from '../theme/colors';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}