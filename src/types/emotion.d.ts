import { theme } from '../styles/theme/default'

type tTheme = typeof theme

declare module '@emotion/react' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface Theme extends tTheme {}
  /* eslint-disable @typescript-eslint/no-empty-interface */
}
