import styled from 'styled-components';

interface IProps {
    color?: string;
    size?: number;
    bold?: boolean;
}

export const Span = styled.span`
    display: flex;
    height: 100%;
`;

export const I = styled.i<IProps>`
    cursor: pointer;
    ${props => props.color !== undefined && `color: ${props.color};`}
    ${props => props.size !== undefined && `font-size: ${props.size}pt;`}
    ${props => props.bold !== undefined && props.bold === true && `font-weight: bold;`}
    align-self: center;
`;