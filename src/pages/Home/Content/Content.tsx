import React, { Fragment, MouseEventHandler, RefObject, useCallback, useMemo, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import Question from '../../../components/Question/Question';
import Text from '../../../components/Text/Text';
import { UpdateQuestion } from '../../../constants';
import { RootState } from '../../../store';
import { FormQuestion, FormState, FormType, QuestionsState, QuestionType, QuizState, QuizStatus } from '../../../types';
import { ContentWrapper, IconColumn, IconItem } from './Style';
import Icon from '../../../components/Icon/Icon';
import QuizResult from '../../../components/QuizResult/QuizResult';
import { ADD_QUESTION, ADD_QUESTIONS, DEFAULT_STATE, DELETE_QUESTION, RESET_FORM, SET_EDIT_DATA, UPDATE_QUESTION } from '../../../actions';
import { getQuestion } from '../../../utils';
import AddQuestions from '../../../components/AddQuestions/AddQuestions';
import ActionButtons from '../../../components/ActionButtons/ActionButtons';

// Util Functions
const mapQuestionsForTable = (questions: QuestionType[], editQuestion: (id: string) => void, deleteQuestion: (id: string) => void) => {
	return questions.length > 0
		? questions.map((question: QuestionType, index: number) => {
				const { question: questionString, options, correctOption } = question;
				const extraOptions = [];

				const questionElement = <Text text={questionString} />;
				const optionElements = options.map((option) => <Text text={option} />);
				const correctOptionElement = <Text text={`${correctOption + 1}`} />;

				for (let i = 0; i < 4 - options.length; i++) {
					extraOptions.push(<Text text='' />);
				}

				return [
					questionElement,
					...optionElements,
					...extraOptions,
					correctOptionElement,
					<IconColumn>
						<IconItem>
							<Icon icon='fa fa-pencil' onClick={() => editQuestion(question.id)} />
						</IconItem>
						<IconItem>
							<Icon icon='fa fa-trash' onClick={() => deleteQuestion(question.id)} />
						</IconItem>
					</IconColumn>,
				];
		  })
		: [];
};

// Renders the content based on the current status of the quiz app
const makeContent = (
	status: QuizStatus,
	playerName: string,
	score: number,
	totalQuestions: number,
	timeTaken: string,
	question: QuestionType,
	currentQuestion: number,
	selectedOption: number,
	initialFormValues: FormQuestion,
	type: FormType,
	submitButtonText: string,
	allQuestions: JSX.Element[][],
	formRef: RefObject<HTMLFormElement>,
	generateRandomQues: MouseEventHandler<HTMLButtonElement>,
	startQuiz: MouseEventHandler<HTMLButtonElement>,
	resumeQuiz: MouseEventHandler<HTMLButtonElement>,
	cancelQuiz: MouseEventHandler<HTMLButtonElement>,
	saveOption: (option: number) => void,
	addQuestions: MouseEventHandler<HTMLButtonElement>,
	saveQuestion: (values: FormQuestion, type: FormType) => void,
	cancelAddQuestions: MouseEventHandler<HTMLButtonElement>,
	cancelUpdateQuestion: MouseEventHandler<HTMLButtonElement>
) => {
	switch (status) {
		case 'submitted':
			return (
				<Fragment>
					<QuizResult playerName={playerName} score={score} totalQuestions={totalQuestions} timeTaken={timeTaken} />
					<ActionButtons status={status} generateRandomQues={generateRandomQues} addQuestions={addQuestions} startQuiz={startQuiz} resumeQuiz={resumeQuiz} cancelQuiz={cancelQuiz} />
				</Fragment>
			);

		case 'default':
		case 'paused':
			return <ActionButtons status={status} generateRandomQues={generateRandomQues} addQuestions={addQuestions} startQuiz={startQuiz} resumeQuiz={resumeQuiz} cancelQuiz={cancelQuiz} />;
		case 'in-progress':
			return <Question question={question} currentQuestion={currentQuestion} selectedOption={selectedOption} saveOption={saveOption} />;
		case 'add-questions':
			return <AddQuestions initialFormValues={initialFormValues} type={type} submitButtonText={submitButtonText} allQuestions={allQuestions} formRef={formRef} saveQuestion={saveQuestion} cancelAddQuestions={cancelAddQuestions} cancelUpdateQuestion={cancelUpdateQuestion} />;
	}
};

// Props
interface ContentProps {
	generateRandomQues: MouseEventHandler<HTMLButtonElement>;
	startQuiz: MouseEventHandler<HTMLButtonElement>;
	resumeQuiz: MouseEventHandler<HTMLButtonElement>;
	cancelQuiz: MouseEventHandler<HTMLButtonElement>;
	saveOption: (option: number) => void;
}

// Component
const Content: React.FC<ContentProps> = ({ generateRandomQues, startQuiz, resumeQuiz, cancelQuiz, saveOption }) => {
	// States
	const quiz: QuizState = useSelector((state: RootState) => state.quiz);
	const questionState: QuestionsState = useSelector((state: RootState) => state.question);
	const formState: FormState = useSelector((state: RootState) => state.formState);
	const dispatch = useDispatch();

	// Hooks
	const formRef = useRef<HTMLFormElement>(null);

	// ==== Callbacks ====
	// Triggers when user clicks on edit question button
	const editQuestion = useCallback(
		(id: string) => {
			const question = getQuestion(questionState.questions, id);
			const updatedInitialValues: FormQuestion = { ...question, correctOption: `${question.correctOption + 1}` };
			const type: FormType = 'edit';
			const buttonText: string = UpdateQuestion;

			dispatch({ type: SET_EDIT_DATA, payload: { initialValue: updatedInitialValues, questionId: id, type: type, submitButtonText: buttonText } });

			formRef.current!.scrollIntoView();
		},
		[questionState.questions, dispatch]
	);
	// ---------------------------------------------------

	// Triggers when user clicks on delete question button
	const deleteQuestion = useCallback(
		(id: string) => {
			dispatch({ type: DELETE_QUESTION, payload: { questionId: id } });

			alert('Question deleted successfully');
		},
		[dispatch]
	);
	// ---------------------------------------------------

	// Triggers when user clicks on save question button
	const saveQuestion = useCallback(
		(values: FormQuestion, type: FormType) => {
			const question: QuestionType = {
				id: type === 'create' ? uuid() : formState.questionId,
				question: values.question,
				options: values.options,
				correctOption: parseInt(values.correctOption) - 1,
			};

			if (formState.type === 'create') {
				dispatch({ type: ADD_QUESTION, payload: { question: question } });

				alert('Question created successfully');
			} else {
				dispatch({ type: UPDATE_QUESTION, payload: { question: question, questionId: formState.questionId } });
				dispatch({ type: RESET_FORM });

				alert('Question updated successfully');
			}
		},
		[dispatch, formState]
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

	// Triggers when the user clicks the cancel button when updating question
	const cancelUpdateQuestion = useCallback(() => {
		dispatch({ type: RESET_FORM });
	}, [dispatch]);
	// ---------------------------------------------------

	// Variables to be passed as props
	const totalQuestions: number = questionState.questions.length;
	const question: QuestionType = questionState.questions[quiz.currentQuestion];
	const allQuestions: JSX.Element[][] = mapQuestionsForTable(questionState.questions, editQuestion, deleteQuestion);

	const renderContent = useMemo(() => {
		return makeContent(quiz.status, quiz.playerName, quiz.score, totalQuestions, quiz.timeTaken, question, quiz.currentQuestion, quiz.selectedOption, formState.initialValues, formState.type, formState.submitButtonText, allQuestions, formRef, generateRandomQues, startQuiz, resumeQuiz, cancelQuiz, saveOption, addQuestions, saveQuestion, cancelAddQuestions, cancelUpdateQuestion);
	}, [quiz, totalQuestions, question, formState, allQuestions, formRef, generateRandomQues, startQuiz, resumeQuiz, cancelQuiz, saveOption, addQuestions, saveQuestion, cancelAddQuestions, cancelUpdateQuestion]);

	return <ContentWrapper>{renderContent}</ContentWrapper>;
};

export default Content;
