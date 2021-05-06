import { fireEvent, render, screen } from '@testing-library/react';
import { black, blue, secondary } from '../colors';
import Option from '../pages/Home/Body/Quiz/Option/Option';

const mockSaveOption = jest.fn();

const optionProps = {
	text: 'Option 1',
	optionNumber: 'B',
	selected: true,
};

xit('displays the correct text', () => {
	render(<Option text={optionProps.text} optionIndex={0} optionNumber={optionProps.optionNumber} selected={optionProps.selected} saveOption={mockSaveOption} />);

	expect(screen.getByText('Option 1')).toBeInTheDocument();
	expect(screen.getByText('B .')).toBeInTheDocument();
});

xit('is selected', () => {
	const { container } = render(<Option text={optionProps.text} optionIndex={0} optionNumber={optionProps.optionNumber} selected={optionProps.selected} saveOption={mockSaveOption} />);

	const options = container.getElementsByClassName('question-options');

	expect(options.length).toBe(1);
	expect(options[0]).toHaveStyle(`background: ${blue}; color: ${secondary}; border: 1px solid ${blue}`);
});

xit('is not selected', () => {
	optionProps.selected = false;

	const { container } = render(<Option text={optionProps.text} optionIndex={0} optionNumber={optionProps.optionNumber} selected={optionProps.selected} saveOption={mockSaveOption} />);

	const options = container.getElementsByClassName('question-options');

	expect(options.length).toBe(1);
	expect(options[0]).toHaveStyle(`color: ${black}; border: 1px solid rgba(0,0,0,0.4)`);

	fireEvent.click(options[0]);

	expect(mockSaveOption).toBeCalled();
});
