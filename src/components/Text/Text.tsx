import React from 'react';
import { TextWrapper } from './Style';

interface TextProps {
    text: string;
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    margin?: number;
}

const Text: React.FC<TextProps> = ({ text, fontSize, fontWeight, color, margin }) => {
    return (
        <TextWrapper fontWeight={fontWeight} fontSize={fontSize} color={color} margin={margin}>
            {
                text
            }
        </TextWrapper>
    );
}

export default Text;