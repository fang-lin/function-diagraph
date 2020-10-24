import styled, {createGlobalStyle} from 'styled-components';
import {Link as ReactRouterLink} from 'react-router-dom';

export const defaultStyle = `
    margin: 0;
    padding: 0;
    height: 100%;
    background: #ccc;
    font-family: 'Fira Code',monospace,consolas,courier;
`;

export const DefaultGlobalStyle = createGlobalStyle`
    html, body, #root {
        ${defaultStyle}
    }
`;

export const HomeRoot = styled.div`
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const HomeHeader = styled.header`
    padding: 30px 0;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
`;

export const HomeFooter = styled.footer`
    padding: 30px 0;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    font-size: 12px;
`;

export const HomeContainer = styled.section`
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    flex: 1;
`;

export const Title = styled.h1`
    font-size: 36px;
    line-height: 30px;
`;

export const EquationsList = styled.ul`
    display: grid;
    list-style: none;
    margin: 0;
    padding: 0;
    @media (min-width: 768px) {
        grid: auto-flow auto / repeat(2, auto);
    }
    @media (min-width: 1280px) {
        grid: auto-flow auto / repeat(3, auto);
    }
`;

export const EquationsListItem = styled.li`
    font-size: 12px;
`;
export const Paragraph = styled.p`
    font-size: 12px;
`;

export const Head3 = styled.h3`
    font-size: 20px;
    color: #333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
`;

export const Anchor = styled.a`
    color: #333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

export const Link = styled(ReactRouterLink)`
    text-decoration: none;
    color: #333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, .7);
    &:hover {
        text-decoration: underline;
    }
`;
