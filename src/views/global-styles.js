import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    margin: 0;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    text-align: left;
    background-color: #222;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    display: flex;
    // padding: 5px 0px 15px 0px;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-width: 1010px;
  }

  hr {
    -webkit-box-sizing: content-box;
            box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  a {
    color: #00bc8c;
    text-decoration: none;
    background-color: transparent;
  }

  a:hover {
    color: #007053;
    text-decoration: underline;
  }

  a:not([href]):not([tabindex]) {
    color: inherit;
    text-decoration: none;
  }

  a:not([href]):not([tabindex]):hover, a:not([href]):not([tabindex]):focus {
    color: inherit;
    text-decoration: none;
  }

  a:not([href]):not([tabindex]):focus {
    outline: 0;
  }
`;
