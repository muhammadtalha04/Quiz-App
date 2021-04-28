import { SET_QUESTIONS } from '../actions';
import { Action, QuestionsState } from '../types';

const initState: QuestionsState = {
    questions: []
};

export const questionsReducer = (state: QuestionsState = initState, action: Action) => {
    switch (action.type) {
        case SET_QUESTIONS:
            return { ...state, questions: action.payload.questions };

        default:
            return { ...state };
    }
}