import { QuestionType } from '../types';
import { v4 as uuid } from 'uuid';

export const questionsData: QuestionType[] = [
	{
		id: uuid(),
		question: 'Question 1',
		options: ['True', 'False'],
		correctOption: 1,
	},
	{
		id: uuid(),
		question: 'Question 2',
		options: ['True', 'False'],
		correctOption: 0,
	},
	{
		id: uuid(),
		question: 'Question 3',
		options: ['True', 'False'],
		correctOption: 0,
	},
	{
		id: uuid(),
		question: 'Question 4',
		options: ['True', 'False'],
		correctOption: 1,
	},
	{
		id: uuid(),
		question: 'Question 5',
		options: ['True', 'False'],
		correctOption: 0,
	},
];
