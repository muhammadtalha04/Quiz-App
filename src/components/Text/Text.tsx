import React from 'react';
import { TextTypes } from '../../types';
import { TextWrapper } from './Style';

interface TextProps {
	text: string;
	type?: TextTypes;
	fontSize?: number;
	fontWeight?: string;
	color?: string;
	margin?: number;
}

const Text: React.FC<TextProps> = ({ text, type, fontSize, fontWeight, color, margin }) => {
	return (
		<TextWrapper type={type} fontWeight={fontWeight} fontSize={fontSize} color={color} margin={margin}>
			{text}
		</TextWrapper>
	);
};

export default Text;
