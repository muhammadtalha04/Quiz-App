import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store';

describe('random questions', () => {
	xtest('random questions are being generated', () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		userEvent.click(screen.getByRole('button', { name: /random question/i }));

		expect(screen.getByText(/random questions generated successfully/i)).toBeInTheDocument();

		userEvent.click(screen.getByRole('button', { name: /ok/i }));

		expect(screen.queryByText(/random questions generated successfully/i)).not.toBeInTheDocument();
	});

	xtest('attempt the whole quiz with random questions', () => {
		jest.useFakeTimers();

		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		userEvent.click(screen.getByText(/play quiz/i));

		expect(screen.getByText(/random questions generated successfully/i)).toBeInTheDocument();

		userEvent.click(screen.getByRole('button', { name: /ok/i }));

		// First question
		expect(screen.getByText('1 .')).toBeInTheDocument();

		jest.advanceTimersByTime(5000);

		userEvent.click(screen.getByText(/A ./i));
		userEvent.click(screen.getByRole('button', { name: /submit/i }));

		// Second question
		expect(screen.getByText('2 .')).toBeInTheDocument();

		jest.advanceTimersByTime(5000);

		userEvent.click(screen.getByText(/B ./i));
		userEvent.click(screen.getByRole('button', { name: /submit/i }));

		// Third question
		expect(screen.getByText('3 .')).toBeInTheDocument();

		jest.advanceTimersByTime(5000);

		userEvent.click(screen.getByText(/A ./i));
		userEvent.click(screen.getByRole('button', { name: /submit/i }));

		// Last question
		expect(screen.getByText('4 .')).toBeInTheDocument();

		jest.advanceTimersByTime(5000);

		userEvent.click(screen.getByText(/A ./i));
		userEvent.click(screen.getByRole('button', { name: /finish/i }));

		expect(screen.getByText(/you finished the quiz in/i)).toBeInTheDocument();
		expect(screen.getByText(/out of 4/i)).toBeInTheDocument();
		expect(screen.getByText(/20/i)).toBeInTheDocument();
	});
});

describe('add questions', () => {
	xtest('press the save question button without filling any field', async () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		userEvent.click(screen.getByRole('button', { name: /add question/i }));

		expect(screen.getByRole('button', { name: /save question/i }));

		userEvent.click(screen.getByRole('button', { name: /save question/i }));

		await waitFor(() => {
			expect(screen.getByText(/question is required/i)).toBeInTheDocument();
			expect(screen.getByText(/option 1 is required/i)).toBeInTheDocument();
			expect(screen.getByText(/option 2 is required/i)).toBeInTheDocument();
		});
	});

	xtest('without selecting correct option press the save question button', async () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		userEvent.click(screen.getByRole('button', { name: /add question/i }));

		expect(screen.getByRole('button', { name: /save question/i }));

		userEvent.type(screen.getByPlaceholderText(/question/i), 'Question 1');
		userEvent.type(screen.getByPlaceholderText(/option 1/i), 'A');
		userEvent.type(screen.getByPlaceholderText(/option 2/i), 'B');

		userEvent.click(screen.getByRole('button', { name: /save question/i }));

		await waitFor(() => {
			expect(screen.queryByText(/question is required/i)).not.toBeInTheDocument();
			expect(screen.queryByText(/option 1 is required/i)).not.toBeInTheDocument();
			expect(screen.queryByText(/option 2 is required/i)).not.toBeInTheDocument();
			expect(screen.getAllByText(/correct option is required/i).length).toBe(2);
		});
	});

	xtest('type all values and save question', async () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		userEvent.click(screen.getByRole('button', { name: /add question/i }));

		expect(screen.getByRole('button', { name: /save question/i }));

		userEvent.type(screen.getByPlaceholderText(/question/i), 'Question 1');
		userEvent.type(screen.getByPlaceholderText(/option 1/i), 'A');
		userEvent.type(screen.getByPlaceholderText(/option 2/i), 'B');
		userEvent.click(screen.getAllByRole('radio')[0]);

		userEvent.click(screen.getByRole('button', { name: /save question/i }));

		await waitFor(() => {
			expect(screen.getByText(/questions saved successfully/i)).toBeInTheDocument();
		});
	});

	xtest('add three questions, delete the first question, edit the third question, add new question and play quiz', async () => {
		jest.useFakeTimers();

		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		userEvent.click(screen.getByRole('button', { name: /add question/i }));

		expect(screen.getByRole('button', { name: /save question/i }));

		// First question
		userEvent.type(screen.getByPlaceholderText(/question/i), 'Question 1');
		userEvent.type(screen.getByPlaceholderText(/option 1/i), 'A');
		userEvent.type(screen.getByPlaceholderText(/option 2/i), 'B');
		userEvent.click(screen.getAllByRole('radio')[0]);

		// Add new question
		userEvent.click(screen.getByRole('button', { name: /new question/i }));

		jest.advanceTimersByTime(1000);

		expect(screen.getAllByText(/2 \/ 2/i).length).toBe(2);

		// Second question
		userEvent.type(screen.getAllByPlaceholderText(/question/i)[1], 'Question 2');
		userEvent.type(screen.getAllByPlaceholderText(/option 1/i)[1], 'A');
		userEvent.type(screen.getAllByPlaceholderText(/option 2/i)[1], 'B');
		userEvent.click(screen.getAllByRole('radio')[0]);

		// Add new question
		userEvent.click(screen.getByRole('button', { name: /new question/i }));

		jest.advanceTimersByTime(1000);
		expect(screen.getAllByText(/3 \/ 3/i).length).toBe(3);

		// Third question
		userEvent.type(screen.getAllByPlaceholderText(/question/i)[2], 'Question 3');
		userEvent.type(screen.getAllByPlaceholderText(/option 1/i)[2], 'A');
		userEvent.type(screen.getAllByPlaceholderText(/option 2/i)[2], 'B');
		userEvent.click(screen.getAllByRole('radio')[0]);

		// Checking if all the data is correctly entered
		let questions = screen.getAllByPlaceholderText(/question/i);

		expect(questions[0]).toHaveValue('Question 1');
		expect(questions[1]).toHaveValue('Question 2');
		expect(questions[2]).toHaveValue('Question 3');

		// Goto first question
		await waitFor(() => {
			userEvent.click(screen.getByRole('button', { name: /previous/i }));
			jest.advanceTimersByTime(1000);
			expect(screen.getAllByText(/2 \/ 3/i).length).toBe(3);

			userEvent.click(screen.getByRole('button', { name: /previous/i }));
			jest.advanceTimersByTime(1000);
			expect(screen.getAllByText(/1 \/ 3/i).length).toBe(3);

			// Delete question
			userEvent.click(screen.getAllByTitle(/delete/i)[0]);

			jest.advanceTimersByTime(1000);
			expect(screen.getAllByText(/2 \/ 2/i).length).toBe(2);
		});

		// Checking if the question is deleted
		questions = screen.getAllByPlaceholderText(/question/i);

		expect(questions[0]).toHaveValue('Question 2');
		expect(questions[1]).toHaveValue('Question 3');

		// Adding new option in second question
		userEvent.click(screen.getByRole('button', { name: /add new option/i }));

		expect(screen.getByPlaceholderText(/option 3/i));

		userEvent.type(screen.getByPlaceholderText(/option 3/i), 'C');
		userEvent.click(screen.getAllByRole('radio')[2]); // Selecting newly created option

		await waitFor(() => {
			// Add new question
			userEvent.click(screen.getByRole('button', { name: /new question/i }));

			jest.advanceTimersByTime(1000);
			expect(screen.getAllByText(/3 \/ 3/i).length).toBe(3);
		});

		// Third question
		userEvent.type(screen.getAllByPlaceholderText(/question/i)[2], 'Question 4');
		userEvent.type(screen.getAllByPlaceholderText(/option 1/i)[2], 'A');
		userEvent.type(screen.getAllByPlaceholderText(/option 2/i)[2], 'B');
		userEvent.click(screen.getAllByRole('radio')[0]);

		await waitFor(() => {
			userEvent.click(screen.getByRole('button', { name: /save question/i }));

			expect(screen.getByText(/questions saved successfully/i)).toBeInTheDocument();
		});

		userEvent.click(screen.getByRole('button', { name: /ok/i }));
		userEvent.click(screen.getByRole('button', { name: /go back/i }));

		expect(screen.getByRole('button', { name: /play quiz/i })).toBeInTheDocument();

		userEvent.click(screen.getByRole('button', { name: /play quiz/i }));

		// First question
		expect(screen.getByText(/question 2/i)).toBeInTheDocument();
		jest.advanceTimersByTime(3000);

		userEvent.click(screen.getByText(/A ./i));
		userEvent.click(screen.getByRole('button', { name: /submit/i }));

		// Second question
		expect(screen.getByText(/question 3/i)).toBeInTheDocument();
		jest.advanceTimersByTime(3000);

		userEvent.click(screen.getByText(/C ./i));
		userEvent.click(screen.getByRole('button', { name: /submit/i }));

		// Last question
		expect(screen.getByText(/question 4/i)).toBeInTheDocument();
		jest.advanceTimersByTime(3000);

		userEvent.click(screen.getByText(/A ./i));
		userEvent.click(screen.getByRole('button', { name: /finish/i }));

		expect(screen.getByText(/you finished the quiz in/i)).toBeInTheDocument();
		expect(screen.getByText(/9/i)).toBeInTheDocument();
	});
});

describe('checking pause quiz cases', () => {
	xtest('attempt the quiz by pausing it in the middle', () => {
		jest.useFakeTimers();

		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		userEvent.click(screen.getByText(/play quiz/i));

		expect(screen.getByText(/random questions generated successfully/i)).toBeInTheDocument();

		userEvent.click(screen.getByRole('button', { name: /ok/i }));

		// On resume timer should be at 1:27
		expect(screen.getByText('1 .')).toBeInTheDocument();
		jest.advanceTimersByTime(3000);

		userEvent.click(screen.getByTitle(/pause/i));

		expect(screen.getByRole('button', { name: /resume quiz/i })).toBeInTheDocument();

		userEvent.click(screen.getByRole('button', { name: /resume/i }));

		expect(screen.getByText(/1*:*27/i)).toBeInTheDocument();

		// First question
		expect(screen.getByText('1 .')).toBeInTheDocument();

		userEvent.click(screen.getByText(/A ./i));
		userEvent.click(screen.getByRole('button', { name: /submit/i }));

		// Second question
		expect(screen.getByText('2 .')).toBeInTheDocument();

		jest.advanceTimersByTime(5000);

		userEvent.click(screen.getByText(/B ./i));
		userEvent.click(screen.getByRole('button', { name: /submit/i }));

		// Third question
		expect(screen.getByText('3 .')).toBeInTheDocument();

		jest.advanceTimersByTime(5000);

		userEvent.click(screen.getByText(/A ./i));
		userEvent.click(screen.getByRole('button', { name: /submit/i }));

		// Last question
		expect(screen.getByText('4 .')).toBeInTheDocument();

		jest.advanceTimersByTime(5000);

		userEvent.click(screen.getByText(/A ./i));
		userEvent.click(screen.getByRole('button', { name: /finish/i }));

		expect(screen.getByText(/you finished the quiz in/i)).toBeInTheDocument();
		expect(screen.getByText(/18/i)).toBeInTheDocument();
	});
});

describe('checking cancel quiz cases', () => {
	xtest('start quiz, wait for 3 seconds and cancel it', () => {
		jest.useFakeTimers();

		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		userEvent.click(screen.getByRole('button', { name: /play quiz/i }));

		jest.advanceTimersByTime(3000);

		userEvent.click(screen.getByRole('button', { name: /cancel/i }));

		expect(screen.getByText('Are you sure you want to cancel this quiz?')).toBeInTheDocument();

		userEvent.click(screen.getByRole('button', { name: /yes/i }));

		expect(screen.getByText(/play quiz/i)).toBeInTheDocument();
	});

	xtest('start quiz, wait for 3 seconds, pause it, and cancel it', () => {
		jest.useFakeTimers();

		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		userEvent.click(screen.getByRole('button', { name: /play quiz/i }));

		jest.advanceTimersByTime(3000);

		userEvent.click(screen.getByTitle(/pause/i));

		expect(screen.getByRole('button', { name: /resume quiz/i })).toBeInTheDocument();

		userEvent.click(screen.getByRole('button', { name: /cancel/i }));

		expect(screen.getByText('Are you sure you want to cancel this quiz?')).toBeInTheDocument();

		userEvent.click(screen.getByRole('button', { name: /yes/i }));

		expect(screen.getByText(/play quiz/i)).toBeInTheDocument();
	});
});

xtest('attempt the whole quiz with without selecting any option', () => {
	jest.useFakeTimers();

	render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	userEvent.click(screen.getByText(/play quiz/i));

	// First question
	expect(screen.getByText('1 .')).toBeInTheDocument();

	jest.advanceTimersByTime(5000);

	userEvent.click(screen.getByRole('button', { name: /submit/i }));

	// Second question
	expect(screen.getByText('2 .')).toBeInTheDocument();

	jest.advanceTimersByTime(5000);

	userEvent.click(screen.getByRole('button', { name: /submit/i }));

	// Third question
	expect(screen.getByText('3 .')).toBeInTheDocument();

	jest.advanceTimersByTime(5000);

	userEvent.click(screen.getByRole('button', { name: /submit/i }));

	// Last question
	expect(screen.getByText('4 .')).toBeInTheDocument();

	jest.advanceTimersByTime(5000);

	userEvent.click(screen.getByRole('button', { name: /finish/i }));

	expect(screen.getByText(/you finished the quiz in/i)).toBeInTheDocument();
	expect(screen.getByText(/0 out of 4/i)).toBeInTheDocument();
	expect(screen.getByText(/20/i)).toBeInTheDocument();
});
