import { INC_OPTIONS_COUNT, INC_QUES_COUNT, RESET_FORM, SET_CORRECT_OPTION, SET_FORM_OPTION, SET_FORM_QUESTION } from '../actions';
import { Action, FormState } from '../types';
import { changeFormState } from '../utils';

const initState: FormState = {
    questions: [
        {
            question: "",
            options: ["", ""],
            correctOption: "",
            numOfOptions: 2
        }
    ],
    numOfQuestions: 1
}

export const formReducer = (state: FormState = initState, action: Action) => {
    switch (action.type) {
        case SET_FORM_QUESTION:
            return {
                ...state,
                questions: changeFormState(state.questions, action.payload.index, "ques", action.payload.question)
            };

        case SET_FORM_OPTION:
            return {
                ...state,
                questions: changeFormState(state.questions, action.payload.qIndex, "option", action.payload.option, action.payload.index)
            };

        case SET_CORRECT_OPTION:
            return {
                ...state,
                questions: changeFormState(state.questions, action.payload.index, "correctOpt", action.payload.correctOption)
            };

        case INC_OPTIONS_COUNT:
            return {
                ...state,
                questions: changeFormState(state.questions, action.payload.index, "incrementOption")
            };

        case INC_QUES_COUNT:
            return {
                ...state,
                numOfQuestions: state.numOfQuestions + 1,
                questions: [...state.questions, ...initState.questions]
            };

        case RESET_FORM:
            return {
                ...state,
                ...initState
            };

        default:
            return { ...state };
    }
}