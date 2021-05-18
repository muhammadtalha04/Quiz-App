import React, { Fragment, MouseEventHandler, useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { FormValue, ModalType, QuestionsState, QuestionType, QuizState, QuizStatus } from '../../../types';
import { BodyContentWrapper } from './Style';
import QuizResult from './QuizResult/QuizResult';
import { ADD_QUESTIONS, DEFAULT_STATE, RESET_FORM, SET_QUESTIONS } from '../../../actions';
import ActionButtons from './ActionButtons/ActionButtons';
import AddQuestions from './AddQuestions/AddQuestions';
import Question from './Quiz/Question/Question';
import { QuestionsSaved } from '../../../constants';

// Util Functions
// Renders the body content based on the current status of the quiz app
const makeBodyContent = (quizState: QuizState, totalQuestions: number, allQuestions: QuestionType[], generateRandomQues: MouseEventHandler<HTMLButtonElement>, startQuiz: MouseEventHandler<HTMLButtonElement>, resumeQuiz: MouseEventHandler<HTMLButtonElement>, cancelQuiz: MouseEventHandler<HTMLButtonElement>, saveOption: (option: number) => void, addQuestions: MouseEventHandler<HTMLButtonElement>, saveQuestion: (values: FormValue) => void, cancelAddQuestions: MouseEventHandler<HTMLButtonElement>) => {
	const status: QuizStatus = quizState.status;

	switch (status) {
		case 'submitted': {
			const { playerName, score, timeTaken } = quizState;

			return (
				<Fragment>
					<QuizResult playerName={playerName} score={score} totalQuestions={totalQuestions} timeTaken={timeTaken} />
					<ActionButtons status={status} generateRandomQues={generateRandomQues} addQuestions={addQuestions} startQuiz={startQuiz} resumeQuiz={resumeQuiz} cancelQuiz={cancelQuiz} />
				</Fragment>
			);
		}

		case 'default':
		case 'paused':
			return <ActionButtons status={status} generateRandomQues={generateRandomQues} addQuestions={addQuestions} startQuiz={startQuiz} resumeQuiz={resumeQuiz} cancelQuiz={cancelQuiz} />;
		case 'in-progress': {
			const { currentQuestion, selectedOption } = quizState;
			const question: QuestionType = allQuestions[currentQuestion];

			return <Question question={question} currentQuestion={currentQuestion} selectedOption={selectedOption} saveOption={saveOption} />;
		}
		case 'add-questions': {
			return <AddQuestions questions={allQuestions} saveQuestion={saveQuestion} cancelAddQuestions={cancelAddQuestions} />;
		}
	}
};

// Props
interface BodyProps {
	generateRandomQues: MouseEventHandler<HTMLButtonElement>;
	startQuiz: MouseEventHandler<HTMLButtonElement>;
	resumeQuiz: MouseEventHandler<HTMLButtonElement>;
	cancelQuiz: MouseEventHandler<HTMLButtonElement>;
	saveOption: (option: number) => void;
	showModal: (modalText: string, modalType: ModalType) => void;
}

// Component
const Body: React.FC<BodyProps> = ({ generateRandomQues, startQuiz, resumeQuiz, cancelQuiz, saveOption, showModal }) => {
	// States
	const quiz: QuizState = useSelector((state: RootState) => state.quiz);
	const questionState: QuestionsState = useSelector((state: RootState) => state.question);
	const dispatch = useDispatch();

	// ==== Callbacks ====

	// Triggers when user clicks on save question button
	const saveQuestion = useCallback(
		(values: FormValue) => {
			const questions: QuestionType[] = values.questions.map((value) => {
				return {
					id: value.id !== '' && value.id !== undefined ? value.id : uuid(),
					question: value.question,
					options: value.options,
					correctOption: parseInt(value.correctOption) - 1,
				};
			});

			dispatch({ type: SET_QUESTIONS, payload: { questions: questions } });

			showModal(QuestionsSaved, 'alert');
		},
		[dispatch, showModal]
	);
	// ---------------------------------------------------

	// Triggers when the user clicks the add questions button
	const addQuestions = useCallback(() => {
		dispatch({ type: ADD_QUESTIONS });
	}, [dispatch]);
	// ---------------------------------------------------

	// Triggers when the user clicks the cancel button when adding questions
	const cancelAddQuestions = useCallback(() => {
		dispatch({ type: RESET_FORM });
		dispatch({ type: DEFAULT_STATE });
	}, [dispatch]);
	// ---------------------------------------------------

	// Variables to be passed as props
	const totalQuestions: number = questionState.questions.length;
	const allQuestions: QuestionType[] = questionState.questions;

	const renderBody = useMemo(() => {
		return makeBodyContent(quiz, totalQuestions, allQuestions, generateRandomQues, startQuiz, resumeQuiz, cancelQuiz, saveOption, addQuestions, saveQuestion, cancelAddQuestions);
	}, [quiz, totalQuestions, allQuestions, generateRandomQues, startQuiz, resumeQuiz, cancelQuiz, saveOption, addQuestions, saveQuestion, cancelAddQuestions]);

	return <BodyContentWrapper>{renderBody}</BodyContentWrapper>;
};

export default Body;
