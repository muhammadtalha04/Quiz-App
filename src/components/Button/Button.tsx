import React, { MouseEventHandler } from 'react';
import { ButtonType, Width } from '../../types';
import { CustomButton } from './Style';

interface ButtonProps {
	text: string;
	gradient: boolean;
	width: Width;
	type?: ButtonType;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	margin?: boolean;
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, gradient, width, margin, type, disabled, onClick }) => {
	return (
		<CustomButton width={width} gradient={gradient} type={type} onClick={onClick} margin={margin} disabled={disabled}>
			{text}
		</CustomButton>
	);
};

export default Button;
