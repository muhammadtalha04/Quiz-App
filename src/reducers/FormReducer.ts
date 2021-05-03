import { RESET_FORM, SET_EDIT_DATA } from '../actions';
import { SaveQuestion } from '../constants';
import { Action, FormQuestion, FormState, FormType } from '../types';

const initValue: FormState = {
	initialValues: {
		question: '',
		options: ['', ''],
		correctOption: '',
	},
	type: 'create',
	submitButtonText: SaveQuestion,
	questionId: '',
};

export const formReducer = (state: FormState = initValue, action: Action) => {
	switch (action.type) {
		case SET_EDIT_DATA: {
			const initialData: FormQuestion = action.payload.initialValue;
			const type: FormType = action.payload.type;
			const submitButtonText: string = action.payload.submitButtonText;
			const questionId: string = action.payload.questionId;

			return {
				...state,
				initialValues: initialData,
				type: type,
				submitButtonText: submitButtonText,
				questionId: questionId,
			};
		}

		case RESET_FORM: {
			return {
				...state,
				...initValue,
			};
		}

		default:
			return { ...state };
	}
};
