import { render } from '@testing-library/react';
import QuizResult from '../pages/Home/Body/QuizResult/QuizResult';

const quizProps = {
	playerName: 'Player 1',
	score: 10,
	totalQuestions: 12,
	timeTaken: '8',
};

xit('displays the correct output', () => {
	const { getAllByText, getByText } = render(<QuizResult playerName={quizProps.playerName} score={quizProps.score} totalQuestions={quizProps.totalQuestions} timeTaken={quizProps.timeTaken} />);

	expect(getByText('Player 1')).toBeInTheDocument();
	expect(getByText(/10 out of 12/i)).toBeInTheDocument();

	expect(getAllByText('00').length).toBe(2);
	expect(getByText('08')).toBeInTheDocument();
});
