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

const Button: React.FC<ButtonProps> = ({ text, gradient, width, margin, onClick }) => {
    return (
        <CustomButton
            width={width}
            gradient={gradient}
            onClick={onClick}
            margin={margin}
        >
            {text}
        </CustomButton>
    );
}

export default Button;