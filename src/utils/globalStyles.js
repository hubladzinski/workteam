import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-size: 62.5%;
    }

    body {
        margin: 0;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    p {
        margin: 0;
        padding: 0;
    }

    h1,h2,h3,h4,h5 {
        padding: 0;
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
    }

    body {
        font-size: 1.6rem;
        font-family: "Montserrat", sans-serif;
    }
`;

export default GlobalStyle;
