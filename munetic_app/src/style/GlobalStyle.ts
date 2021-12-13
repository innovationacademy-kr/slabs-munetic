import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	${reset};
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;
