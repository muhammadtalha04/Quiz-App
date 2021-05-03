export type Width = 'full' | 'auto';
export type QuizStatus = 'default' | 'in-progress' | 'paused' | 'submitted' | 'add-questions';
export type TextTypes = 'default' | 'error';
export type ButtonType = 'button' | 'submit' | 'reset' | undefined;
export type FormType = 'create' | 'edit';
type FormQuestionError = { [index: number]: FormQuestion };
export type setFieldTouchedType = (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;

export enum Options {
	A,
	B,
	C,
	D,
}

export interface Action {
	type: string;
	payload?: any;
}

// ---------- QUESTION ----------
export interface QuestionType {
	id: string;
	question: string;
	options: string[];
	correctOption: number;
}

export interface QuestionsState {
	questions: QuestionType[];
}

// ---------- QUIZ ----------
export interface QuizState {
	status: QuizStatus;
	score: number;
	playerName: string;
	currentQuestion: number;
	selectedOption: number;
	timeTaken: string;
}

// ---------- TIMER ----------
export interface TimerState {
	time: string;
	intervalId: number;
}

// ---------- FORM ----------
export interface FormQuestion {
	question: string;
	options: string[];
	correctOption: string;
	id?: string;
}

export interface FormValue {
	questions: FormQuestion[];
}

export interface FormState {
	initialValues: FormQuestion;
	type: FormType;
	submitButtonText: string;
	questionId: string;
}

export interface FormError {
	questions: FormQuestionError;
}
