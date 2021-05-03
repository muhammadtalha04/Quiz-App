import { ADD_QUESTION, DELETE_QUESTION, SET_QUESTIONS, UPDATE_QUESTION } from '../actions';
import { Action, QuestionsState, QuestionType } from '../types';
import { deleteQuestion, updateQuestion } from '../utils';

const initState: QuestionsState = {
	questions: [],
};

export const questionsReducer = (state: QuestionsState = initState, action: Action) => {
	switch (action.type) {
		case SET_QUESTIONS: {
			const questions: QuestionType[] = action.payload.questions;

			return { ...state, questions: questions };
		}

		case ADD_QUESTION: {
			const question: QuestionType = action.payload.question;

			return {
				...state,
				questions: [...state.questions, question],
			};
		}

		case UPDATE_QUESTION: {
			const questionId: string = action.payload.questionId;
			const question: QuestionType = action.payload.question;
			const updatedQuestions: QuestionType[] = updateQuestion(state.questions, question, questionId);

			return {
				...state,
				questions: updatedQuestions,
			};
		}

		case DELETE_QUESTION: {
			const questionId: string = action.payload.questionId;
			const updatedQuestions: QuestionType[] = deleteQuestion(state.questions, questionId);

			return {
				...state,
				questions: updatedQuestions,
			};
		}

		default: {
			return { ...state };
		}
	}
};
