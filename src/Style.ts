import styled, { createGlobalStyle } from 'styled-components';
import { bg_gradient_dark, bg_gradient_light } from './colors';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: linear-gradient(to right, ${bg_gradient_light}, ${bg_gradient_dark});
    }
`;

export const Wrapper = styled.div`
    @media (min-width: 1401px) {
        margin: 40px 20%;
    }
    @media (max-width: 1400px) {
        margin: 40px 15%;
    }
    @media (max-width: 1300px) {
        margin: 40px 10%;
    }
    @media (max-width: 1200px) {
        margin: 40px 2.5%px;
    }
    @media (max-width: 1000px) {
        margin: 40px 30px;
    }
    @media (max-width: 800px) {
        margin: 40px 25px;
    }
    @media (max-width: 550px) {
        margin: 40px 20px;
    }
`;