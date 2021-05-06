import { initTime } from '../constants';
import { questionsData } from '../data';
import { FormError, FormQuestion, FormValue, QuestionType, setFieldTouchedType } from '../types';
import { FormikErrors, FormikTouched } from 'formik';

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
export const validateForm = (values: FormValue) => {
	const errors: FormikErrors<FormError> = {};

	values.questions.forEach((value, index) => {
		const optionErrors: string[] = [];
		const error: FormikErrors<FormQuestion> = {};

		// Validates question
		if (!value.question) {
			error.question = 'Question is required';
		}

		// Validates each option
		value.options.forEach((option, index) => {
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
			error.options = optionErrors;
		}

		// Validates correct option
		if (!value.correctOption) {
			error.correctOption = 'Correct option is required';
		}

		if (Object.keys(error).length > 0) {
			if (errors.questions === undefined) {
				errors.questions = {};
			}
			errors.questions[index] = error;
		}
	});

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

// Sets initial values for form
export const setInitialValues = (questions: QuestionType[]) => {
	let initialValues: FormQuestion[] = [];

	initialValues = questions.map((singleQuestion: QuestionType) => {
		return {
			...singleQuestion,
			correctOption: String(singleQuestion.correctOption + 1),
		};
	});

	return initialValues;
};
// ------------------------------------------------------

// Touches every field in the current index so that errors are displayed if any
const touchFields = (questionIndex: number, setFieldTouched: setFieldTouchedType) => {
	setFieldTouched(`questions.${questionIndex}.question`, true, true);
	setFieldTouched(`questions.${questionIndex}.options.0`, true, true);
	setFieldTouched(`questions.${questionIndex}.options.1`, true, true);
	setFieldTouched(`questions.${questionIndex}.options.2`, true, true);
	setFieldTouched(`questions.${questionIndex}.options.3`, true, true);
	setFieldTouched(`questions.${questionIndex}.correctOption`, true, true);
};
// ------------------------------------------------------

// Checks if the current state of form is valid or not.
export const isFormValid = (isValid: boolean, touched: FormikTouched<FormValue>, currentQuestionIndex: number, totalQuestions: number, setFieldTouched: setFieldTouchedType) => {
	if (currentQuestionIndex < totalQuestions - 1) {
		touchFields(totalQuestions - 1, setFieldTouched);
		return false;
	}

	// If there are errors
	if (isValid === false) {
		return false;
	}

	// If no validation errors
	const fieldsTouchedCount: number = Object.keys(touched).length;

	if (totalQuestions <= 1) {
		if (fieldsTouchedCount === 0) {
			touchFields(currentQuestionIndex, setFieldTouched);
			return false;
		}
	} else {
		if (currentQuestionIndex === totalQuestions - 1) {
			if (fieldsTouchedCount === 0) {
				touchFields(currentQuestionIndex, setFieldTouched);
				return false;
			}
		}
	}

	return true;
};
// ------------------------------------------------------

// Checks if minutes or seconds are greater than 60 then fixes them
const checkAndFixTime = (hours: string, minutes: string, seconds: string) => {
	let hoursInt: number = parseInt(hours);
	let minutesInt: number = parseInt(minutes);
	let secondsInt: number = parseInt(seconds);

	let fixedHours: string = hours;
	let fixedMinutes: string = minutes;
	let fixedSeconds: string = seconds;

	let carryHours: number = 0;
	let carryMinutes: number = 0;

	if (secondsInt >= 60) {
		carryMinutes = Math.floor(secondsInt / 60);
		secondsInt %= 60;
	}

	minutesInt += carryMinutes;

	if (minutesInt >= 60) {
		carryHours = Math.floor(minutesInt / 60);
		minutesInt %= 60;
	}

	hoursInt += carryHours;

	fixedHours = hoursInt < 0 ? '00' : `${hoursInt >= 10 ? '' : 0}${hoursInt}`;
	fixedMinutes = minutesInt < 0 ? '00' : `${minutesInt >= 10 ? '' : 0}${minutesInt}`;
	fixedSeconds = secondsInt < 0 ? '00' : `${secondsInt >= 10 ? '' : 0}${secondsInt}`;

	return [fixedHours, fixedMinutes, fixedSeconds];
};
// ------------------------------------------------------

// Splits and assigns the time correctly to hours, minutes, and seconds
export const splitTime = (time: string) => {
	const splittedTime: string[] = time.split(':');
	let hours: string = '00';
	let minutes: string = '00';
	let seconds: string = '00';

	if (splittedTime.length > 0) {
		// Removing extra spaces
		const mappedTime = splittedTime.map((time: string) => time.replace(/ /g, ''));

		// Filtering empty strings
		const filteredTime: string[] = mappedTime.filter((time: string) => time !== '');
		const filteredTimeLength: number = filteredTime.length;

		if (filteredTimeLength > 0) {
			switch (filteredTimeLength) {
				case 1: {
					seconds = filteredTime[0];
					break;
				}
				case 2: {
					minutes = filteredTime[0];
					seconds = filteredTime[1];
					break;
				}
				case 3: {
					hours = filteredTime[0];
					minutes = filteredTime[1];
					seconds = filteredTime[2];
					break;
				}
				default: {
					const slicedTime = filteredTime.slice(0, 3);

					hours = slicedTime[0];
					minutes = slicedTime[1];
					seconds = slicedTime[2];

					break;
				}
			}

			const [fixedHours, fixedMinutes, fixedSeconds] = checkAndFixTime(hours, minutes, seconds);

			hours = fixedHours;
			minutes = fixedMinutes;
			seconds = fixedSeconds;
		}
	}

	return [hours, minutes, seconds];
};
// ------------------------------------------------------
