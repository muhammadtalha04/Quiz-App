import React, { Fragment, MouseEventHandler, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DECREMENT_TIMER, SET_INTERVAL } from '../../../actions';
import { secondary } from '../../../colors';
import Button from '../../../components/Button/Button';
import Counter from '../../../components/Counter/Counter';
import Icon from '../../../components/Icon/Icon';
import Pagination from '../../../components/Pagination/Pagination';
import Text from '../../../components/Text/Text';
import { Cancel, Submit, Finish, SuperQuiz } from '../../../constants';
import { RootState } from '../../../store';
import { QuizStatus, QuizState, QuestionsState, TimerState } from '../../../types';
import { RightAlign, LeftAlign, HeaderWrapper, Cols, CenterAlign, Rows } from './Style';

const makeHeader = (status: QuizStatus, questionNumbers: string[], currentQuestion: number, questionsLength: number, time: string, goBack: MouseEventHandler<HTMLSpanElement>, cancelQuiz: MouseEventHandler<HTMLButtonElement>, submitQues: MouseEventHandler<HTMLButtonElement>, tick: () => void) => {
	switch (status) {
		case 'in-progress':
			return (
				// Top row is for back, ticker, and action buttons. Bottom row is for pagination.
				<Rows>
					{/* Top row */}
					<Cols>
						{/* Icon to pause the quiz and go back to homepage */}
						<LeftAlign>
							<Icon icon='fa fa-angle-left' color={secondary} size={25} bold={true} onClick={goBack} />
						</LeftAlign>

						{/* Remaining time to attempt the current question */}
						<CenterAlign>
							<Counter time={time} tick={tick} />
						</CenterAlign>

						{/* Buttons for submitting or quitting the quiz */}
						<RightAlign>
							<Button text={Cancel} gradient={false} width='auto' onClick={cancelQuiz} />
							{currentQuestion !== questionsLength - 1 ? <Button text={Submit} gradient={false} width='auto' onClick={submitQues} /> : <Button text={Finish} gradient={false} width='auto' onClick={submitQues} />}
						</RightAlign>
					</Cols>

					{/* Bottom row */}
					<CenterAlign>
						{/* Displays total questions, questions attempted, and current question */}
						<Pagination questionNumbers={questionNumbers} currentQuestion={currentQuestion} />
					</CenterAlign>
				</Rows>
			);

		case 'default':
		case 'add-questions':
		case 'paused':
		case 'submitted':
			return (
				<Fragment>
					<Text text={SuperQuiz} fontWeight='bold' fontSize={30} color={secondary} />

					<Text text='Play Super Quiz and earn points' color={secondary} />
				</Fragment>
			);
	}
};

interface HeaderProps {
	goBack: MouseEventHandler<HTMLSpanElement>;
	cancelQuiz: MouseEventHandler<HTMLButtonElement>;
	submitQues: MouseEventHandler<HTMLButtonElement>;
	onTimerEnd: () => void;
}

const Header: React.FC<HeaderProps> = ({ goBack, cancelQuiz, submitQues, onTimerEnd }) => {
	const dispatch = useDispatch();
	const quiz: QuizState = useSelector((state: RootState) => state.quiz);
	const questionState: QuestionsState = useSelector((state: RootState) => state.question);
	const timer: TimerState = useSelector((state: RootState) => state.timer);

	const questionsLength: number = questionState.questions.length;
	const questionNumbers: string[] = Object.keys(questionState.questions);

	// Checks if timer has ended or not. If it has ended then submits the quiz else decrements the timer.
	const ticker = useCallback(() => {
		if (timer.time === '00 : 00') {
			onTimerEnd(); // Submit the quiz
		} else if (quiz.status === 'in-progress') {
			// This check is for the resume quiz functionality
			if (timer.intervalId === -1) {
				const intvId = setInterval(() => {
					dispatch({ type: DECREMENT_TIMER });
				}, 1000);

				dispatch({ type: SET_INTERVAL, payload: { intervalId: intvId } });
			}
		}
	}, [dispatch, timer, onTimerEnd, quiz.status]);

	// Renders the header content
	const render = useMemo(() => {
		return makeHeader(quiz.status, questionNumbers, quiz.currentQuestion, questionsLength, timer.time, goBack, cancelQuiz, submitQues, ticker);
	}, [quiz.status, questionNumbers, quiz.currentQuestion, questionsLength, timer, goBack, cancelQuiz, submitQues, ticker]);

	return <HeaderWrapper>{render}</HeaderWrapper>;
};

export default Header;
