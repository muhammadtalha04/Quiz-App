import React, { useMemo } from 'react';
import { secondary } from '../../colors';
import Icon from '../Icon/Icon';
import { ActivePaginationItem, PaginationItem, PaginationWrapper } from './Style';

const generatePageNums = (questionNumbers: string[], currentQuestion: number) => {
	return questionNumbers.map((questionNumber: string) => {
		const questionNumberInt = parseInt(questionNumber);

		if (questionNumberInt < currentQuestion) {
			return (
				<PaginationItem checked={true} key={questionNumber}>
					<Icon icon='fa fa-check' color={secondary} />
				</PaginationItem>
			);
		} else if (questionNumberInt === currentQuestion) {
			return (
				<ActivePaginationItem checked={false} key={questionNumber}>
					{questionNumberInt + 1}
				</ActivePaginationItem>
			);
		} else {
			return (
				<PaginationItem checked={false} key={questionNumber}>
					{questionNumberInt + 1}
				</PaginationItem>
			);
		}
	});
};

interface PaginationProps {
	questionNumbers: string[];
	currentQuestion: number;
}

const Pagination: React.FC<PaginationProps> = ({ questionNumbers, currentQuestion }) => {
	const render = useMemo(() => {
		return generatePageNums(questionNumbers, currentQuestion);
	}, [questionNumbers, currentQuestion]);

	return <PaginationWrapper>{render}</PaginationWrapper>;
};

export default Pagination;
