import { injectGlobal } from '@emotion/css'
import theme from './theme/default'

injectGlobal`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    background: ${theme.colors.mainBg};
    font-size: 16px;
    font-family: ${theme.fonts.family.default};
    color: ${theme.colors.darkText};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.fonts.family.default};
    margin: ${theme.spacings.large} 0;
    font-weight: 800;
    color: ${theme.colors.primary};
  }
  
`
