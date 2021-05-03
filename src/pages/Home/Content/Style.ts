import styled from 'styled-components';
import { secondary } from '../../../colors';

export const ContentWrapper = styled.div`
	background: ${secondary};
	border-radius: 30px;
	padding: 40px;
	margin-bottom: 40px;
`;

export const IconColumn = styled.div`
	display: flex;
	justify-content: center;
`;

export const IconItem = styled.span`
	margin: 0px 5px;
`;
