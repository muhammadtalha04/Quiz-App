import { render, screen } from '@testing-library/react';
import { black, blue, secondary } from '../colors';
import Question from '../pages/Home/Body/Quiz/Question/Question';

const mockSaveOption = jest.fn();

const questionProps = {
	question: { id: '', question: 'Test question', options: ['a', 'b'], correctOption: 0 },
	currentQuestionNumber: 3,
	selectedOption: 1,
};

xit('displays the correct text and option b is selected', () => {
	const { container } = render(<Question question={questionProps.question} currentQuestion={questionProps.currentQuestionNumber} selectedOption={questionProps.selectedOption} saveOption={mockSaveOption} />);

	expect(screen.getByText('4 .')).toBeInTheDocument();
	expect(screen.getByText('Test question')).toBeInTheDocument();
	expect(screen.getByText('a')).toBeInTheDocument();
	expect(screen.getByText('b')).toBeInTheDocument();

	const options = container.getElementsByClassName('question-options');

	expect(options.length).toBe(2);

	expect(options[0]).toHaveStyle(`color: ${black}; border: 1px solid rgba(0,0,0,0.4)`);
	expect(options[1]).toHaveStyle(`background: ${blue}; color: ${secondary}; border: 1px solid ${blue}`);
});

xtest('no option should be selected', () => {
	questionProps.selectedOption = -1;

	const { container } = render(<Question question={questionProps.question} currentQuestion={questionProps.currentQuestionNumber} selectedOption={questionProps.selectedOption} saveOption={mockSaveOption} />);

	const options = container.getElementsByClassName('question-options');

	expect(options.length).toBe(2);

	expect(options[0]).toHaveStyle(`color: ${black}; border: 1px solid rgba(0,0,0,0.4)`);
	expect(options[1]).toHaveStyle(`color: ${black}; border: 1px solid rgba(0,0,0,0.4)`);
});
