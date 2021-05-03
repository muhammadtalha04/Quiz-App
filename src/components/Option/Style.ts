import styled from 'styled-components';
import { black, blue, secondary } from '../../colors';

interface OptionProps {
	selected: boolean;
}

export const OptionWrapper = styled.div<OptionProps>`
	border-radius: 20px;
	border: 1px solid rgba(0, 0, 0, 0.4);
	color: ${black};
	padding: 10px 18px;
	font-weight: bold;
	cursor: pointer;
	display: flex;
	margin: 15px 0px;

	${(props) =>
		props.selected === true &&
		`
        background: ${blue};
        color: ${secondary};
        border: 1px solid ${blue};
    `}
`;

export const OptionNumber = styled.span<OptionProps>`
	margin-right: 20px;
	${(props) => props.selected === true && `color: ${secondary};`}
`;
