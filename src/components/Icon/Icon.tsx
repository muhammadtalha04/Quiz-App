import React, { MouseEventHandler } from 'react';
import { Span, I } from './Style';

interface IconProps {
    icon: string;
    onClick?: MouseEventHandler<HTMLSpanElement>;
    color?: string;
    size?: number;
    bold?: boolean;
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
    return (
        <Span onClick={props.onClick}>
            <I className={props.icon} color={props.color} size={props.size} bold={props.bold} />
        </Span>
    );
}

export default Icon;