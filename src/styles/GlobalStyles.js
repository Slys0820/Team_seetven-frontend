import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color:  #000000; 
  }
`;
// 전체적인 기본 글자 색상은 위의 color 코드에서 변경하면 됨
export default GlobalStyles;
