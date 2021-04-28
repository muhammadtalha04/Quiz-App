import styled from 'styled-components';
import { black } from '../../colors';

interface TextProps {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    margin?: number;
}

export const TextWrapper = styled.p<TextProps>`
    color: ${props => props.color !== undefined ? props.color : black};
    font-weight: ${props => props.fontWeight !== undefined ? props.fontWeight : 'normal'};
    ${props => props.fontSize !== undefined && `font-size: ${props.fontSize}pt;`}
    margin: ${props => props.margin !== undefined ? `${props.margin}px` : "10px"} 0px;
`;