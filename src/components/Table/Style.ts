import styled from 'styled-components';
import { black, blue, secondary } from '../../colors';

export const TableElement = styled.table`
	width: 100%;
	text-align: center;
	border-collapse: collapse;

	@media (max-width: 800px) {
		display: block;
		overflow-y: scroll;
	}
`;

export const TableHeading = styled.thead`
	background: ${blue};
	color: ${secondary};
`;

export const TableBody = styled.tbody``;

export const TR = styled.tr``;

export const TH = styled.th`
	border: 1px solid ${black};
	padding: 10px;
`;

export const TD = styled.td`
	border: 1px solid ${black};
	padding: 10px;
`;
