import React, { Fragment, useCallback, useState } from 'react';
import { CancelConfirm, RandomQuestionsSuccess } from './constants';
import { GlobalStyle, Wrapper } from './Style';
import { useDispatch, useSelector } from 'react-redux';
import { PAUSE_QUIZ, START_QUIZ, QUIT_QUIZ, SUBMIT_QUESTION, SUBMIT_QUIZ, SET_OPTION, RESUME_QUIZ, CLEAR_INTERVAL, INCREMENT_SCORE, ADD_TIME_TAKEN, SET_QUESTIONS, SET_INTERVAL, SET_SHOW_MODAL, SET_MODAL_DATA } from './actions';
import Modal from './components/Modal/Modal';
import { ModalState, ModalType, QuestionsState, QuizState, TimerState } from './types';
import { RootState } from './store';
import { generateRandomQuestions } from './utils';
import Header from './pages/Home/Header/Header';
import Body from './pages/Home/Body/Body';

const App: React.FC = () => {
	const dispatch = useDispatch();

	const quiz: QuizState = useSelector((state: RootState) => state.quiz);
	const questionState: QuestionsState = useSelector((state: RootState) => state.question);
	const timer: TimerState = useSelector((state: RootState) => state.timer);
	const modal: ModalState = useSelector((state: RootState) => state.modal);

	const [numOfQuestions] = useState(4);

	// Sets modal data and displays modal
	const showModal = useCallback(
		(modalText: string, modalType: ModalType) => {
			dispatch({ type: SET_MODAL_DATA, payload: { text: modalText, type: modalType } });
			dispatch({ type: SET_SHOW_MODAL, payload: { showModal: true } });
		},
		[dispatch]
	);
	// ---------------------------------------------------

	// Triggers when user clicks on the modal cancel or ok button
	const hideModal = useCallback(() => {
		dispatch({ type: SET_SHOW_MODAL, payload: { showModal: false } });
	}, [dispatch]);
	// ---------------------------------------------------

	// Triggers when user click the random questions button to generate random questions
	const generateRandomQues = useCallback(() => {
		const randomQues = generateRandomQuestions(numOfQuestions);

		dispatch({ type: SET_QUESTIONS, payload: { questions: randomQues } });

		showModal(RandomQuestionsSuccess, 'alert');
	}, [numOfQuestions, dispatch, showModal]);
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
		clearInterval(timer.intervalId);
		dispatch({ type: CLEAR_INTERVAL });
		dispatch({ type: QUIT_QUIZ });
		hideModal();
	}, [dispatch, hideModal, timer.intervalId]);
	// ---------------------------------------------------

	// Triggers when user clicks on cancel quiz button
	const confirmCancel = useCallback(() => {
		showModal(CancelConfirm, 'dialogue');
	}, [showModal]);
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

	return (
		<Fragment>
			{/* Modal */}
			{modal.showModal && <Modal text={modal.text} type={modal.type} onClickYes={cancelQuiz} onClickNo={hideModal} onClickOk={hideModal} />}

			{/* Content */}
			<Wrapper>
				<Header goBack={pauseQuiz} cancelQuiz={confirmCancel} submitQues={submitQuestion} onTimerEnd={submitQuestion} />

				<Body generateRandomQues={generateRandomQues} startQuiz={startQuiz} resumeQuiz={resumeQuiz} cancelQuiz={confirmCancel} saveOption={saveOption} showModal={showModal} />
			</Wrapper>

			<GlobalStyle />
		</Fragment>
	);
};

export default App;
