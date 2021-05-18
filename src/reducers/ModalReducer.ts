import { SET_MODAL_DATA, SET_SHOW_MODAL } from '../actions';
import { Action, ModalState, ModalType } from '../types';

const initState: ModalState = {
	text: '',
	type: 'alert',
	showModal: false,
};

export const modalReducer = (state: ModalState = initState, action: Action) => {
	switch (action.type) {
		case SET_MODAL_DATA: {
			const text: string = action.payload.text;
			const type: ModalType = action.payload.type;

			return {
				...state,
				text: text,
				type: type,
			};
		}

		case SET_SHOW_MODAL: {
			const showModal: boolean = action.payload.showModal;

			return {
				...state,
				showModal: showModal,
			};
		}

		default:
			return { ...state };
	}
};
