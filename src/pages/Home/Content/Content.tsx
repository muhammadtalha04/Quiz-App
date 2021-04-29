import React, { ChangeEvent, MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { blue } from '../../../colors';
import Button from '../../../components/Button/Button';
import Form from '../../../components/Form/Form';
import Question from '../../../components/Question/Question';
import Time from '../../../components/Time/Time';
import Text from '../../../components/Text/Text';
import { Random, AddQues, Play, Resume, Cancel } from '../../../constants';
import { RootState } from '../../../store';
import { QuestionsState, QuestionType, QuizState } from '../../../types';
import { ButtonsWrapper, ContentWrapper, QuizStatsWrapper, Width100 } from './Style';

interface ContentProps {
	generateRandomQues: MouseEventHandler<HTMLButtonElement>;
	addQuestions: MouseEventHandler<HTMLButtonElement>;
	startQuiz: MouseEventHandler<HTMLButtonElement>;
	resumeQuiz: MouseEventHandler<HTMLButtonElement>;
	cancelQuiz: MouseEventHandler<HTMLButtonElement>;
	saveOption: (option: number) => void;
	onQuestionChange: (event: ChangeEvent<HTMLInputElement>, questionIndex: number) => void;
	onOptionChange: (event: ChangeEvent<HTMLInputElement>, index: number, questionIndex: number) => void;
	onCorrectOptionChange: (event: ChangeEvent<HTMLInputElement>, questionIndex: number) => void;
	onClickAddOption: (questionIndex: number) => void;
	onClickAddQuestion: MouseEventHandler<HTMLButtonElement>;
	onSaveQuestion: MouseEventHandler<HTMLButtonElement>;
	onCancel: MouseEventHandler<HTMLButtonElement>;
}

const Content: React.FC<ContentProps> = ({ generateRandomQues, addQuestions, startQuiz, resumeQuiz, cancelQuiz, saveOption, onQuestionChange, onOptionChange, onCorrectOptionChange, onClickAddOption, onClickAddQuestion, onSaveQuestion, onCancel }) => {
	const quiz: QuizState = useSelector((state: RootState) => state.quiz);
	const questionState: QuestionsState = useSelector((state: RootState) => state.question);

	const questionsLength: number = questionState.questions.length;
	const question: QuestionType = questionState.questions[quiz.currentQuestion];

	return (
		<ContentWrapper>
			{quiz.status === 'submitted' && (
				<QuizStatsWrapper>
					<Width100>
						<Text text={quiz.playerName} color={blue} fontWeight='bold' fontSize={20} />
					</Width100>
					<Width100>
						<Text text={`You scored ${quiz.score} out of ${questionsLength}.`} fontWeight='bold' />
					</Width100>
					<Width100>
						<Text text={`You finished the quiz in`} fontWeight='bold' />
						<Time time={quiz.timeTaken} />
					</Width100>
				</QuizStatsWrapper>
			)}
			{(quiz.status === 'default' || quiz.status === 'submitted') && (
				<ButtonsWrapper>
					{/* Random Questions Button */}
					<Button text={Random} gradient={true} width='full' onClick={generateRandomQues} margin={true} />
					{/* Make Quiz Button */}
					<Button text={AddQues} gradient={true} width='full' onClick={addQuestions} margin={true} />
					{/* Play Quiz Button */}
					<Button text={Play} gradient={true} width='full' onClick={startQuiz} margin={true} />
				</ButtonsWrapper>
			)}
			{quiz.status === 'paused' && (
				<ButtonsWrapper>
					{/* Resume Quiz Button */}
					<Button text={Resume} gradient={true} width='full' onClick={resumeQuiz} margin={true} />
					{/* Cancel Quiz Button */}
					<Button text={Cancel} gradient={true} width='full' onClick={cancelQuiz} margin={true} />
				</ButtonsWrapper>
			)}
			{quiz.status === 'in-progress' && <Question question={question} currentQuestion={quiz.currentQuestion} selectedOption={quiz.selectedOption} saveOption={saveOption} />}
			{quiz.status === 'add-questions' && <Form onQuestionChange={onQuestionChange} onOptionChange={onOptionChange} onCorrectOptionChange={onCorrectOptionChange} onClickAddOption={onClickAddOption} onClickAddQues={onClickAddQuestion} onSaveQuestion={onSaveQuestion} onCancel={onCancel} />}
		</ContentWrapper>
	);
};

export default Content;
