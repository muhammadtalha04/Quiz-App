import { CLEAR_INTERVAL, DECREMENT_TIMER, SET_INTERVAL } from '../actions';
import { initTime } from '../constants';
import { Action, TimerState } from '../types';
import { decrementTimer } from '../utils';

const initState: TimerState = {
    timer: initTime,
    intervalId: -1
};

export const timerReducer = (state: TimerState = initState, action: Action) => {
    switch (action.type) {
        case DECREMENT_TIMER:
            return { ...state, timer: decrementTimer(state.timer) };

        case SET_INTERVAL:
            return { ...state, intervalId: action.payload.intervalId };

        case CLEAR_INTERVAL:
            return { ...state, intervalId: -1, timer: initState.timer };

        default:
            return { ...state };
    }
}