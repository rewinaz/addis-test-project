import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    
    *{
        margin: 0;
        padding: 0;
        box-sizing:border-box;
        font-family: 'Poppins', sans-serif;
    }
    :root{
        margin:0 auto;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;

        color-scheme: light dark;
        color: rgba(255, 255, 255, 0.87);
        background-color: #242424;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;   
    }
     body {
        background-color: #282c34;
        overflow: hidden;
    }
	`;
