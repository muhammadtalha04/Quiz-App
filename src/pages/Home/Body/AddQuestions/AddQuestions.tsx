import React, { Fragment, MouseEventHandler, RefObject } from 'react';
import Form from './Form/Form';
import Table from '../../../../components/Table/Table';
import { TableHeadings } from '../../../../constants';
import { FormQuestion, FormType } from '../../../../types';
import { HR } from './Style';

interface AddQuestionsProps {
	initialFormValues: FormQuestion;
	type: FormType;
	submitButtonText: string;
	formRef: RefObject<HTMLFormElement>;
	saveQuestion: (values: FormQuestion, type: FormType) => void;
	cancelAddQuestions: MouseEventHandler<HTMLButtonElement>;
	cancelUpdateQuestion: MouseEventHandler<HTMLButtonElement>;
	allQuestions: JSX.Element[][];
}

const AddQuestions: React.FC<AddQuestionsProps> = ({ initialFormValues, type, submitButtonText, allQuestions, formRef, saveQuestion, cancelAddQuestions, cancelUpdateQuestion }) => {
	return (
		<Fragment>
			<Form initialValues={initialFormValues} type={type} submitButtonText={submitButtonText} formRef={formRef} saveQuestion={saveQuestion} onCickGoBack={cancelAddQuestions} onCancel={cancelUpdateQuestion} />

			<HR />

			{/* Table to display added questions */}
			<Table tableHeadings={TableHeadings} tableData={allQuestions} />
		</Fragment>
	);
};

export default AddQuestions;
