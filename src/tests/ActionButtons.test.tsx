import { render } from '@testing-library/react';
import ActionButtons from '../pages/Home/Body/ActionButtons/ActionButtons';
import { QuizStatus } from '../types';

const generateRandomQuestion = jest.fn();
const addQuestions = jest.fn();
const startQuiz = jest.fn();
const cancelQuiz = jest.fn();
const resumeQuiz = jest.fn();

let status: QuizStatus = 'default';

describe('buttons are being rendered properly on the basis of status', () => {
	xtest('state is default', () => {
		const { getAllByRole } = render(<ActionButtons status={status} generateRandomQues={generateRandomQuestion} addQuestions={addQuestions} startQuiz={startQuiz} cancelQuiz={cancelQuiz} resumeQuiz={resumeQuiz} />);

		const buttons = getAllByRole('button');

		expect(buttons.length).toBe(3);

		expect(buttons[0]).toHaveTextContent(/random questions/i);
		expect(buttons[1]).toHaveTextContent(/add questions/i);
		expect(buttons[2]).toHaveTextContent(/play quiz/i);

		expect(buttons[0]).not.toHaveTextContent(/resume quiz/i);
		expect(buttons[1]).not.toHaveTextContent(/cancel/i);
	});

	xtest('state is paused', () => {
		status = 'paused';

		const { getAllByRole } = render(<ActionButtons status={status} generateRandomQues={generateRandomQuestion} addQuestions={addQuestions} startQuiz={startQuiz} cancelQuiz={cancelQuiz} resumeQuiz={resumeQuiz} />);

		const buttons = getAllByRole('button');

		expect(buttons.length).toBe(2);

		expect(buttons[0]).toHaveTextContent(/resume quiz/i);
		expect(buttons[1]).toHaveTextContent(/cancel/i);

		expect(buttons[0]).not.toHaveTextContent(/random questions/i);
		expect(buttons[1]).not.toHaveTextContent(/add questions/i);
	});
});
