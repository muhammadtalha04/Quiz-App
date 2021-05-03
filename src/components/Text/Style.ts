import styled from 'styled-components';
import { black } from '../../colors';
import { TextTypes } from '../../types';

interface TextProps {
	type?: TextTypes;
	fontSize?: number;
	fontWeight?: string;
	color?: string;
	margin?: number;
}

export const TextWrapper = styled.p<TextProps>`
	color: ${(props) => (props.color !== undefined ? props.color : black)};
	font-weight: ${(props) => (props.fontWeight !== undefined ? props.fontWeight : 'normal')};
	${(props) => props.fontSize !== undefined && `font-size: ${props.fontSize}pt;`}
	margin: ${(props) => (props.margin !== undefined ? `${props.margin}px` : '10px')} 0px;

	${(props) =>
		props.type === 'error' &&
		`
        color: red;
        font-size: 10pt;
    `}
`;
