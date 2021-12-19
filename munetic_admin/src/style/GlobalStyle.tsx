import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset};
  html { font-size: 10px; }
  body {
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    a {
      text-decoration:none;
    }
  }
`;

export default GlobalStyle;
