import React, { Fragment, MouseEventHandler, RefObject, useCallback } from 'react';
import { Formik, FieldArray } from 'formik';
import { FormElement, FormGroup, QuestionsWrapper } from './Style';
import { AddOption, Cancel, GoBack, OptionPlaceholder, QuestionPlaceholder } from '../../../../../constants';
import Button from '../../../../../components/Button/Button';
import Input from '../../../../../components/Input/Input';
import { FormQuestion, FormType } from '../../../../../types';
import { validateForm } from '../../../../../utils';
import InputWithCheck from '../../../../../components/InputWithCheck/InputWithCheck';

// Util functions
const makeOptionInputs = (values: FormQuestion) => {
	return values.options.map((_, index) => {
		const optionChecked: boolean = parseInt(values.correctOption) === index + 1 ? true : false;
		const optionValue: string = `${index + 1}`;

		return (
			<FormGroup key={`${index}`}>
				<InputWithCheck checked={optionChecked} name='correctOption' value={optionValue} inputName={`options.${index}`} inputPlaceholder={`${OptionPlaceholder} ${index + 1}`} />
			</FormGroup>
		);
	});
};

// Props
interface FormProps {
	initialValues: FormQuestion;
	type: FormType;
	submitButtonText: string;
	formRef: RefObject<HTMLFormElement>;
	saveQuestion: (values: FormQuestion, type: FormType) => void;
	onCickGoBack: MouseEventHandler<HTMLButtonElement>;
	onCancel: MouseEventHandler<HTMLButtonElement>;
}

// Component
const Form: React.FC<FormProps> = ({ initialValues, type, submitButtonText, formRef, saveQuestion, onCickGoBack, onCancel }) => {
	const renderOptionInputs = useCallback((values: FormQuestion) => {
		return makeOptionInputs(values);
	}, []);

	return (
		<Fragment>
			<Formik
				initialValues={initialValues}
				validate={validateForm}
				enableReinitialize={true}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(false);
					saveQuestion(values, type);
					resetForm();
				}}
			>
				{({ values, handleSubmit, isSubmitting }) => (
					<FormElement onSubmit={handleSubmit} ref={formRef}>
						<QuestionsWrapper>
							{/* Question */}
							<FormGroup>
								<Input name='question' placeholder={QuestionPlaceholder} />
							</FormGroup>

							{/* Options along with buttons */}
							<FieldArray name='options'>
								{({ push }) => (
									<Fragment>
										{/* Options input boxes */}
										{renderOptionInputs(values)}

										{/* Buttons group */}
										<FormGroup>
											{values.options.length < 4 && (
												<Fragment>
													{/* Add option button */}
													<Button type='button' text={AddOption} width='auto' gradient={true} onClick={() => push('')} />
												</Fragment>
											)}

											{/* Submit question button */}
											<Button type='submit' text={submitButtonText} width='auto' gradient={true} margin={values.options.length < 4 ? true : false} disabled={isSubmitting} />

											{type === 'create' ? <Button type='button' text={GoBack} width='auto' gradient={true} margin={values.options.length < 4 ? false : true} onClick={onCickGoBack} /> : <Button type='button' text={Cancel} width='auto' gradient={true} margin={values.options.length < 4 ? false : true} onClick={onCancel} />}
										</FormGroup>
									</Fragment>
								)}
							</FieldArray>
						</QuestionsWrapper>
					</FormElement>
				)}
			</Formik>
		</Fragment>
	);
};

export default Form;
