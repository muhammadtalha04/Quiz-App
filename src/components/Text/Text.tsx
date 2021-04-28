import React from 'react';
import { TextWrapper } from './Style';

interface TextProps {
    text: string;
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    margin?: number;
}

const Text: React.FC<TextProps> = (props: TextProps) => {
    return (
        <TextWrapper fontWeight={props.fontWeight} fontSize={props.fontSize} color={props.color} margin={props.margin}>
            {
                props.text
            }
        </TextWrapper>
    );
}

export default Text;