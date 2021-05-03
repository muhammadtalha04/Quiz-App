import { initTime } from '../constants';
import { questionsData } from '../data';
import { FormQuestion, QuestionType } from '../types';
import { FormikErrors } from 'formik';

// This function decrements one second from the timer
export const decrementTimer = (time: string) => {
	let [min, sec] = time.split(' : ');
	let newTime = '';
	let secToNum = parseInt(sec);

	// If the countdown has not finished.
	if (time !== '00 : 00') {
		if (secToNum <= 10) {
			if (secToNum === 0) {
				if (min !== '00') {
					sec = '59';
					let minToNum = parseInt(min);

					if (minToNum < 10) {
						minToNum--;
						min = `0${minToNum}`;
					}
				}
			} else {
				secToNum--;
				sec = `0${secToNum}`;
			}
		} else {
			secToNum--;
			sec = `${secToNum}`;
		}
	}

	if (time === '00 : 00') {
		newTime = time;
	} else {
		newTime = `${min} : ${sec}`;
	}

	return newTime;
};
// ------------------------------------------------------

// This function increments the time taken to solve the quiz
export const addTime = (totalTime: string, timeToAdd: string = ''): string => {
	let newTime = [0, 0, 0];

	let [tHours, tMins, tSecs] = totalTime.split(' : ').map((t) => parseInt(t));
	let [initMins, initSecs] = initTime.split(' : ').map((t) => parseInt(t));
	let [mins, secs] = timeToAdd.split(' : ').map((t) => parseInt(t));

	let initial = new Date().setHours(0, initMins, initSecs, 0);
	let current = new Date().setHours(0, mins, secs, 0);

	let diff = (initial - current) / 1000; // Number of seconds taken to solve a question.

	// Adding seconds
	let addedSecs = tSecs + diff;
	let carryMins = 0;

	newTime[2] = addedSecs % 60;
	if (addedSecs >= 60) {
		carryMins += Math.floor(addedSecs / 60);
	}

	// Adding minutes
	let addedMins = tMins + carryMins;
	let carryHours = 0;

	newTime[1] = addedMins % 60;
	if (addedMins >= 60) {
		carryHours += Math.floor(addedMins / 60);
	}

	// Adding hours
	newTime[0] = tHours + carryHours;

	return newTime.map((t) => `${t}`).join(' : ');
};
// ------------------------------------------------------

// This function generates non repeated random indexes
const generateRandomIndexes = (range: number) => {
	const indx: number[] = [];

	for (let i = 0; i < range; ) {
		const num: number = Math.floor(Math.random() * (range + 1));

		if (indx.indexOf(num) === -1) {
			indx.push(num);
			i++;
		}
	}

	return indx;
};
// ------------------------------------------------------

// This function generates random questions
export const generateRandomQuestions = (range: number) => {
	const indx = generateRandomIndexes(range);

	return indx.map((ind) => questionsData[ind]);
};
// ------------------------------------------------------

// This function validates the form created using formik
export const validateForm = (values: FormQuestion) => {
	const errors: FormikErrors<FormQuestion> = {};
	const optionErrors: string[] = [];

	// Validates question
	if (!values.question) {
		errors.question = 'Question is required';
	}

	// Validates each option
	values.options.forEach((option, index) => {
		if (!option) {
			optionErrors.push(`Option ${index + 1} is required`);
		} else {
			optionErrors.push('');
		}
	});

	// Filtering the errors to check if there is any error or not
	const filteredOptionErrors = optionErrors.filter((option) => option !== '');

	// If there are errors then storing them in options in errors
	if (filteredOptionErrors.length > 0) {
		errors.options = optionErrors;
	}

	// Validates correct option
	if (!values.correctOption) {
		errors.correctOption = 'Correct option is required';
	}

	return errors;
};
// ------------------------------------------------------

// This function deletes the question with the specified id
export const updateQuestion = (questions: QuestionType[], updatedQuestion: QuestionType, id: string) => {
	return questions.map((question) => {
		if (question.id === id) {
			return updatedQuestion;
		}

		return question;
	});
};
// ------------------------------------------------------

// This function deletes the question with the specified id
export const deleteQuestion = (questions: QuestionType[], id: string) => {
	return questions.filter((question: QuestionType) => question.id !== id);
};
// ------------------------------------------------------

// This function traverses the question array to find question whose id matches the given id
export const getQuestion = (questions: QuestionType[], id: string) => {
	const question = questions.find((question: QuestionType) => question.id === id);

	if (question !== undefined) {
		return question;
	}

	return {
		id: '',
		question: '',
		options: ['', ''],
		correctOption: -1,
	};
};
// ------------------------------------------------------
