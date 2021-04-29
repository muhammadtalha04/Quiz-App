import React, { ChangeEvent, Fragment, useCallback, useState } from 'react';
import { CancelConfirm } from './constants';
import { GlobalStyle, Wrapper } from './Style';
import { useDispatch, useSelector } from 'react-redux';
import { PAUSE_QUIZ, START_QUIZ, QUIT_QUIZ, SUBMIT_QUESTION, SUBMIT_QUIZ, SET_OPTION, RESUME_QUIZ, CLEAR_INTERVAL, INCREMENT_SCORE, ADD_TIME_TAKEN, SET_QUESTIONS, SET_FORM_QUESTION, SET_FORM_OPTION, SET_CORRECT_OPTION, INC_OPTIONS_COUNT, INC_QUES_COUNT, ADD_QUESTIONS, DEFAULT_STATE, SET_INTERVAL, RESET_FORM } from './actions';
import Modal from './components/Modal/Modal';
import { FormState, QuestionsState, QuizState, TimerState } from './types';
import { RootState } from './store';
import { generateRandomQuestions } from './utils';
import Header from './pages/Home/Header/Header';
import Content from './pages/Home/Content/Content';

const App: React.FC = () => {
	const dispatch = useDispatch();

	const quiz: QuizState = useSelector((state: RootState) => state.quiz);
	const questionState: QuestionsState = useSelector((state: RootState) => state.question);
	const timer: TimerState = useSelector((state: RootState) => state.timer);
	const form: FormState = useSelector((state: RootState) => state.form);

	const [displayModal, setDisplayModal] = useState(false);
	const [numOfQuestions] = useState(4);

	// Triggers when user clicks on the modal cancel button
	const hideModal = useCallback(() => {
		setDisplayModal(false);
	}, []);
	// ---------------------------------------------------

	// Triggers when user click the random questions button to generate random questions
	const generateRandomQues = useCallback(() => {
		const randomQues = generateRandomQuestions(numOfQuestions);

		alert('Random questions generated successfully');

		dispatch({ type: SET_QUESTIONS, payload: { questions: randomQues } });
	}, [numOfQuestions, dispatch]);
	// ---------------------------------------------------

	// Triggers when user clicks on play quiz button
	const startQuiz = useCallback(() => {
		if (questionState.questions.length === 0) {
			generateRandomQues();
		}

		dispatch({ type: START_QUIZ });
	}, [dispatch, questionState, generateRandomQues]);
	// ---------------------------------------------------

	// Triggers when user clicks on back icon to pause the quiz
	const pauseQuiz = useCallback(() => {
		clearInterval(timer.intervalId);
		dispatch({ type: SET_INTERVAL, payload: { intervalId: -1 } });
		dispatch({ type: PAUSE_QUIZ });
	}, [dispatch, timer.intervalId]);
	// ---------------------------------------------------

	// Triggers when user clicks on resume quiz button
	const resumeQuiz = useCallback(() => {
		dispatch({ type: RESUME_QUIZ });
	}, [dispatch]);
	// ---------------------------------------------------

	// Triggers when user clicks on the yes button to confirm that they want to cancel quiz
	const cancelQuiz = useCallback(() => {
		dispatch({ type: QUIT_QUIZ });
		hideModal();
	}, [dispatch, hideModal]);
	// ---------------------------------------------------

	// Triggers when user clicks on cancel quiz button
	const confirmCancel = useCallback(() => {
		setDisplayModal(true);
	}, []);
	// ---------------------------------------------------

	// Triggers when user clicks on submit/finish button
	const submitQuestion = useCallback(() => {
		if (quiz.selectedOption === questionState.questions[quiz.currentQuestion].correctOption) {
			dispatch({ type: INCREMENT_SCORE });
		}

		dispatch({ type: ADD_TIME_TAKEN, payload: { timeTaken: timer.time } });
		clearInterval(timer.intervalId);
		dispatch({ type: CLEAR_INTERVAL });

		// If not last question then submit the question else submit the quiz
		if (quiz.currentQuestion !== questionState.questions.length - 1) {
			dispatch({ type: SUBMIT_QUESTION });
		} else {
			dispatch({ type: SUBMIT_QUIZ });
		}
	}, [dispatch, quiz.selectedOption, quiz.currentQuestion, questionState, timer]);
	// ---------------------------------------------------

	// Triggers when user selects an option
	const saveOption = useCallback(
		(option: number) => {
			dispatch({ type: SET_OPTION, payload: { selectedOption: option } });
		},
		[dispatch]
	);
	// ---------------------------------------------------

	// Triggers when the user clicks the add questions button
	const addQuestions = useCallback(() => {
		dispatch({ type: ADD_QUESTIONS });
	}, [dispatch]);
	// ---------------------------------------------------

	// Triggers when the user clicks the cancel button when adding questions
	const cancelAddQuestions = useCallback(() => {
		dispatch({ type: DEFAULT_STATE });
	}, [dispatch]);
	// ---------------------------------------------------

	// Question change handler
	const onChangeQuestion = useCallback(
		(event: ChangeEvent<HTMLInputElement>, qIndex: number) => {
			dispatch({ type: SET_FORM_QUESTION, payload: { question: event.target.value, index: qIndex } });
		},
		[dispatch]
	);
	// ---------------------------------------------------

	// Option change handler
	const onChangeOption = useCallback(
		(event: ChangeEvent<HTMLInputElement>, index: number, qIndex: number) => {
			dispatch({ type: SET_FORM_OPTION, payload: { option: event.target.value, index: index, qIndex: qIndex } });
		},
		[dispatch]
	);
	// ---------------------------------------------------

	// Correct option change handler
	const onChangeCorrectOpt = useCallback(
		(event: ChangeEvent<HTMLInputElement>, qIndex: number) => {
			const value = event.target.value;

			if ((parseInt(value) > 0 && parseInt(value) <= form.questions[qIndex].numOfOptions) || value === '') {
				dispatch({ type: SET_CORRECT_OPTION, payload: { correctOption: value, index: qIndex } });
			}
		},
		[dispatch, form.questions]
	);
	// ---------------------------------------------------

	// Triggers when user clicks on add new option button
	const addNewOption = useCallback(
		(qIndex: number) => {
			dispatch({ type: INC_OPTIONS_COUNT, payload: { index: qIndex } });
		},
		[dispatch]
	);
	// ---------------------------------------------------

	// Triggers when user clicks on add new question button
	const addNewQuestion = useCallback(() => {
		dispatch({ type: INC_QUES_COUNT });
	}, [dispatch]);
	// ---------------------------------------------------

	// Triggers when user clicks on save question button
	const saveQuestion = useCallback(() => {
		const questions = form.questions.map((q) => {
			return {
				question: q.question,
				options: q.options,
				correctOption: q.correctOption === '' ? 0 : parseInt(q.correctOption) - 1,
			};
		});

		dispatch({ type: SET_QUESTIONS, payload: { questions: questions } });
		dispatch({ type: RESET_FORM });
		dispatch({ type: DEFAULT_STATE });
	}, [dispatch, form]);
	// ---------------------------------------------------

	return (
		<Fragment>
			{/* Modal */}
			{displayModal && <Modal text={CancelConfirm} onClickYes={cancelQuiz} onClickNo={hideModal} />}

			{/* Content */}
			<Wrapper>
				<Header goBack={pauseQuiz} cancelQuiz={confirmCancel} submitQues={submitQuestion} onTimerEnd={submitQuestion} />

				<Content generateRandomQues={generateRandomQues} addQuestions={addQuestions} startQuiz={startQuiz} resumeQuiz={resumeQuiz} cancelQuiz={confirmCancel} saveOption={saveOption} onQuestionChange={onChangeQuestion} onOptionChange={onChangeOption} onCorrectOptionChange={onChangeCorrectOpt} onClickAddOption={addNewOption} onClickAddQuestion={addNewQuestion} onSaveQuestion={saveQuestion} onCancel={cancelAddQuestions} />
			</Wrapper>

			<GlobalStyle />
		</Fragment>
	);
};

export default App;
