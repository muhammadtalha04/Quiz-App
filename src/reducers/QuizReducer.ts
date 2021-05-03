import { START_QUIZ, PAUSE_QUIZ, QUIT_QUIZ, SUBMIT_QUIZ, INCREMENT_SCORE, SUBMIT_QUESTION, SET_OPTION, RESUME_QUIZ, ADD_TIME_TAKEN, ADD_QUESTIONS, DEFAULT_STATE } from '../actions';
import { Action, QuizState } from '../types';
import { addTime } from '../utils';

const initState: QuizState = {
	status: 'default',
	score: 0,
	playerName: 'Anonymous',
	currentQuestion: 0,
	selectedOption: -1,
	timeTaken: '00 : 00 : 00',
};

export const quizReducer = (state: QuizState = initState, action: Action) => {
	switch (action.type) {
		case ADD_QUESTIONS:
			return {
				...state,
				status: 'add-questions',
			};

		case START_QUIZ:
			return {
				...state,
				status: 'in-progress',
				score: 0,
				selectedOption: -1,
				timeTaken: initState.timeTaken,
			};

		case PAUSE_QUIZ:
			return {
				...state,
				status: 'paused',
			};

		case RESUME_QUIZ:
			return {
				...state,
				status: 'in-progress',
			};

		case SUBMIT_QUIZ:
			return {
				...state,
				status: 'submitted',
				currentQuestion: 0,
				selectedOption: -1,
			};

		case QUIT_QUIZ:
			return {
				...state,
				status: 'default',
				currentQuestion: 0,
				score: 0,
				selectedOption: -1,
			};

		case DEFAULT_STATE:
			return {
				...state,
				status: 'default',
			};

		case SUBMIT_QUESTION:
			return {
				...state,
				currentQuestion: state.currentQuestion + 1,
				selectedOption: -1,
			};

		case INCREMENT_SCORE:
			return {
				...state,
				score: state.score + 1,
			};

		case SET_OPTION: {
			const selectedOption: number = action.payload.selectedOption;

			return {
				...state,
				selectedOption: selectedOption,
			};
		}

		case ADD_TIME_TAKEN: {
			const timeTaken: string = action.payload.timeTaken;
			const totalTimeTaken: string = addTime(state.timeTaken, timeTaken);

			return {
				...state,
				timeTaken: totalTimeTaken,
			};
		}

		default:
			return { ...state };
	}
};
