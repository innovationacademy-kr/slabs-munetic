import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	${reset};
  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
