declare module 'styled-components/native' {
  import * as styledComponents from 'styled-components';
  import { ReactNativeThemedStyledComponentsModule } from 'styled-components/native/dist/types';

  const styled: ReactNativeThemedStyledComponentsModule;
  export default styled;
  export * from 'styled-components';
}