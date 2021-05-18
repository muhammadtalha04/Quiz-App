import styled from 'styled-components';
import { shadow } from '../../colors';

export const ModalDiv = styled.div`
	position: fixed;
	background-color: transparent;
	width: 100%;
	height: 100%;
	z-index: 1;
	display: flex;
	align-items: start;
	justify-content: center;
`;

export const ModalContent = styled.div`
	background: #fff;
	position: relative;
	border-radius: 5px;
	top: 20%;
	padding: 30px;
	text-align: center;
	border: 1px solid rgba(0, 0, 0, 0.3);
	box-shadow: 5px 5px 5px ${shadow}, -5px -5px 5px ${shadow}, -5px 5px 5px ${shadow}, 5px -5px 5px ${shadow};
`;

export const TextWrapper = styled.div`
	margin-bottom: 40px;
`;

export const ActionButtons = styled.div`
	text-align: center;
`;
