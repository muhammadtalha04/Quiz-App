import { render } from '@testing-library/react';
import { secondary } from '../colors';
import Pagination from '../components/Pagination/Pagination';

interface paginationPropsType {
	pageNumbers: string[];
	currentQuestionNumber: number;
}
const paginationProps: paginationPropsType = {
	pageNumbers: [],
	currentQuestionNumber: 0,
};

describe('pagination is rendering the correct output for different outputs', () => {
	xtest('if three page numbers are given and current question number is 1', () => {
		paginationProps.pageNumbers = ['0', '1', '2'];
		paginationProps.currentQuestionNumber = 1;

		const { container } = render(<Pagination questionNumbers={paginationProps.pageNumbers} currentQuestion={paginationProps.currentQuestionNumber} />);

		const paginationItems = container.getElementsByClassName('page-number');

		expect(paginationItems.length).toBe(3);

		expect(paginationItems[0]).toHaveProperty('checked', true);
		expect(paginationItems[1]).toHaveProperty('checked', false);
		expect(paginationItems[2]).toHaveProperty('checked', false);

		// Visited
		// Pagination item has a span in it and that span has icon in it
		expect(paginationItems[0].firstChild?.firstChild).toHaveClass('fa fa-check');

		// Current
		expect(paginationItems[1]).toHaveStyle(`background: ${secondary}`);

		// Not visited yet
		expect(paginationItems[2]).toHaveTextContent('3');
		expect(paginationItems[2]).toHaveStyle(`color: ${secondary}`);
	});

	xtest('if three page numbers are given and current question number is 4', () => {
		paginationProps.pageNumbers = ['0', '1', '2'];
		paginationProps.currentQuestionNumber = 4;

		const { container } = render(<Pagination questionNumbers={paginationProps.pageNumbers} currentQuestion={paginationProps.currentQuestionNumber} />);

		const paginationItems = container.getElementsByClassName('page-number');

		expect(paginationItems.length).toBe(3);

		expect(paginationItems[0]).toHaveProperty('checked', true);
		expect(paginationItems[1]).toHaveProperty('checked', true);
		expect(paginationItems[2]).toHaveProperty('checked', true);

		// Visited
		// Pagination item has a span in it and that span has icon in it
		expect(paginationItems[0].firstChild?.firstChild).toHaveClass('fa fa-check');
		expect(paginationItems[1].firstChild?.firstChild).toHaveClass('fa fa-check');
		expect(paginationItems[2].firstChild?.firstChild).toHaveClass('fa fa-check');
	});

	xtest('if no page number is given', () => {
		paginationProps.pageNumbers = [];

		const { container } = render(<Pagination questionNumbers={paginationProps.pageNumbers} currentQuestion={paginationProps.currentQuestionNumber} />);

		const paginationItems = container.getElementsByClassName('page-number');

		expect(paginationItems.length).toBe(0);
	});
});
