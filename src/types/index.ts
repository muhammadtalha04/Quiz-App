export type Width = 'full' | 'auto';
export type QuizStatus = 'default' | 'in-progress' | 'paused' | 'submitted' | 'add-questions';
export type TextTypes = 'default' | 'error';
export type ButtonType = 'button' | 'submit' | 'reset' | undefined;
export type FormType = 'create' | 'edit';

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
}

export interface FormState {
	initialValues: FormQuestion;
	type: FormType;
	submitButtonText: string;
	questionId: string;
}
