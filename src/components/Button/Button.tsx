import React, { MouseEventHandler } from 'react';
import { Width } from '../../types';
import { CustomButton } from './Style';

interface ButtonProps {
    text: string;
    gradient: boolean;
    width: Width;
    onClick: MouseEventHandler<HTMLButtonElement>;
    margin?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <CustomButton
            width={props.width}
            gradient={props.gradient}
            onClick={props.onClick}
            margin={props.margin}
        >
            {props.text}
        </CustomButton>
    );
}

export default Button;