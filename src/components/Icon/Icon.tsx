import React, { MouseEventHandler } from 'react';
import { Span, I } from './Style';

interface IconProps {
	icon: string;
	onClick?: MouseEventHandler<HTMLSpanElement>;
	title?: string;
	color?: string;
	size?: number;
	bold?: boolean;
}

const Icon: React.FC<IconProps> = ({ icon, title, color, size, bold, onClick }) => {
	return (
		<Span onClick={onClick}>
			<I className={icon} title={title} color={color} size={size} bold={bold} />
		</Span>
	);
};

export default Icon;
