import { CLEAR_INTERVAL, DECREMENT_TIMER, SET_INTERVAL } from '../actions';
import { initTime } from '../constants';
import { Action, TimerState } from '../types';
import { decrementTimer } from '../utils';

const initState: TimerState = {
	time: initTime,
	intervalId: -1,
};

export const timerReducer = (state: TimerState = initState, action: Action) => {
	switch (action.type) {
		case DECREMENT_TIMER: {
			const decrementedTime: string = decrementTimer(state.time);

			return {
				...state,
				time: decrementedTime,
			};
		}

		case SET_INTERVAL: {
			const intervalId: number = action.payload.intervalId;

			return {
				...state,
				intervalId: intervalId,
			};
		}

		case CLEAR_INTERVAL:
			return {
				...state,
				intervalId: -1,
				time: initState.time,
			};

		default:
			return { ...state };
	}
};
