export type Width = 'full' | 'auto';
export type QuizStatus = 'default' | 'in-progress' | 'paused' | 'submitted' | 'add-questions';
export type ChangeHandlerType = 'ques' | 'option' | 'correctOpt' | 'incrementOption';

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
	numOfOptions: number;
}

export interface FormState {
	questions: FormQuestion[];
	numOfQuestions: number;
}
