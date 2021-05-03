import React, { Fragment, MouseEventHandler, useMemo } from 'react';
import { Random, AddQues, Play, Cancel, Resume } from '../../constants';
import { QuizStatus } from '../../types';
import Button from '../Button/Button';
import { ButtonsWrapper } from './Style';

const makeButtons = (status: QuizStatus, generateRandomQues: MouseEventHandler<HTMLButtonElement>, startQuiz: MouseEventHandler<HTMLButtonElement>, resumeQuiz: MouseEventHandler<HTMLButtonElement>, cancelQuiz: MouseEventHandler<HTMLButtonElement>, addQuestions: MouseEventHandler<HTMLButtonElement>) => {
	switch (status) {
		case 'default':
		case 'submitted':
			return (
				<Fragment>
					{/* Random Questions Button */}
					<Button text={Random} gradient={true} width='full' onClick={generateRandomQues} margin={true} />
					{/* Make Quiz Button */}
					<Button text={AddQues} gradient={true} width='full' onClick={addQuestions} margin={true} />
					{/* Play Quiz Button */}
					<Button text={Play} gradient={true} width='full' onClick={startQuiz} margin={true} />
				</Fragment>
			);

		case 'paused':
			return (
				<Fragment>
					{/* Resume Quiz Button */}
					<Button text={Resume} gradient={true} width='full' onClick={resumeQuiz} margin={true} />
					{/* Cancel Quiz Button */}
					<Button text={Cancel} gradient={true} width='full' onClick={cancelQuiz} margin={true} />
				</Fragment>
			);
	}
};

interface ActionButtonsProps {
	status: QuizStatus;
	generateRandomQues: MouseEventHandler<HTMLButtonElement>;
	startQuiz: MouseEventHandler<HTMLButtonElement>;
	resumeQuiz: MouseEventHandler<HTMLButtonElement>;
	cancelQuiz: MouseEventHandler<HTMLButtonElement>;
	addQuestions: MouseEventHandler<HTMLButtonElement>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ status, generateRandomQues, addQuestions, startQuiz, resumeQuiz, cancelQuiz }) => {
	const renderButtons = useMemo(() => {
		return makeButtons(status, generateRandomQues, addQuestions, startQuiz, resumeQuiz, cancelQuiz);
	}, [status, generateRandomQues, addQuestions, startQuiz, resumeQuiz, cancelQuiz]);

	return <ButtonsWrapper>{renderButtons}</ButtonsWrapper>;
};

export default ActionButtons;
