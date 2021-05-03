import React, { Fragment, MouseEventHandler } from 'react';
import Form from './Form/Form';
import { FormValue, QuestionType } from '../../../../types';
import { emptyQuestion } from '../../../../data';
import { setInitialValues } from '../../../../utils';

interface AddQuestionsProps {
	questions: QuestionType[];
	saveQuestion: (values: FormValue) => void;
	cancelAddQuestions: MouseEventHandler<HTMLButtonElement>;
}

const AddQuestions: React.FC<AddQuestionsProps> = ({ questions, saveQuestion, cancelAddQuestions }) => {
	const initialValues: FormValue = {
		questions: [...setInitialValues(questions), emptyQuestion],
	};

	return (
		<Fragment>
			<Form initialValues={initialValues} saveQuestion={saveQuestion} onCickGoBack={cancelAddQuestions} />
		</Fragment>
	);
};

export default AddQuestions;
