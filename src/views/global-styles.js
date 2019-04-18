import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    margin: 0;
    font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    text-align: left;
    background-color: #222;
    -webkit-font-smoothing: antialiased;
    padding: 5px 15px 15px 15px;    
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-width: 1010px;
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
`
