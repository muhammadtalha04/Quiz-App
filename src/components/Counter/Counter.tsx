import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DECREMENT_TIMER, SET_INTERVAL } from '../../actions';
import { RootState } from '../../store';
import { QuizState, TimerState } from '../../types';
import { CounterWrapper } from './Style';

interface CounterProps {
    submit: () => void;
}

const Counter: React.FC<CounterProps> = (props: CounterProps) => {
    const dispatch = useDispatch();
    const timer: TimerState = useSelector((state: RootState) => state.timer);
    const quiz: QuizState = useSelector((state: RootState) => state.quiz);

    useEffect(() => {
        if (timer.timer === "00 : 00") {
            props.submit();     // Submit the quiz
        } else if (quiz.status === "in-progress") {
            if (timer.intervalId === -1) {
                const intvId = setInterval(() => {
                    dispatch({ type: DECREMENT_TIMER });
                }, 1000);

                dispatch({ type: SET_INTERVAL, payload: { intervalId: intvId } });
            }
        }
    }, [dispatch, timer, props, quiz.status]);

    return (
        <CounterWrapper>
            {timer.timer}
        </CounterWrapper>
    );
}

export default Counter;