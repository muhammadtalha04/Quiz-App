import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DECREMENT_TIMER, SET_INTERVAL } from '../../actions';
import { QuizStatus } from '../../types';
import { CounterWrapper } from './Style';

interface CounterProps {
	time: string;
	intervalId: number;
	status: QuizStatus;
	submit: () => void;
}

const Counter: React.FC<CounterProps> = ({ time, intervalId, status, submit }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (time === '00 : 00') {
			submit(); // Submit the quiz
		} else if (status === 'in-progress') {
			if (intervalId === -1) {
				const intvId = setInterval(() => {
					dispatch({ type: DECREMENT_TIMER });
				}, 1000);

				dispatch({ type: SET_INTERVAL, payload: { intervalId: intvId } });
			}
		}
	}, [dispatch, time, intervalId, submit, status]);

	return <CounterWrapper>{time}</CounterWrapper>;
};

export default Counter;
