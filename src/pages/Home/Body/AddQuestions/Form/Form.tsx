import React, { Fragment, MouseEventHandler, useCallback, useState } from 'react';
import { Formik, FieldArray } from 'formik';
import { ButtonGroup, FormElement, FormGroup, QuestionsWrapper } from './Style';
import { AddOption, AddQuestion, GoBack, Next, OptionPlaceholder, Previous, QuestionPlaceholder, SaveQuestion } from '../../../../../constants';
import Button from '../../../../../components/Button/Button';
import Input from '../../../../../components/Input/Input';
import { FormQuestion, FormValue } from '../../../../../types';
import { isFormValid, validateForm } from '../../../../../utils';
import InputWithCheck from '../../../../../components/InputWithCheck/InputWithCheck';
import FormHeader from './FormHeader/FormHeader';
import { emptyQuestion } from '../../../../../data';

// Util functions
const makeOptionInputs = (values: FormQuestion, questionIndex: number) => {
	return values.options.map((_, index) => {
		const optionChecked: boolean = parseInt(values.correctOption) === index + 1 ? true : false;
		const optionValue: string = `${index + 1}`;

		return (
			<FormGroup key={`${index}`}>
				<InputWithCheck checked={optionChecked} name={`questions.${questionIndex}.correctOption`} value={optionValue} inputName={`questions.${questionIndex}.options.${index}`} inputPlaceholder={`${OptionPlaceholder} ${index + 1}`} />
			</FormGroup>
		);
	});
};

// Props
interface FormProps {
	initialValues: FormValue;
	saveQuestion: (values: FormValue) => void;
	onCickGoBack: MouseEventHandler<HTMLButtonElement>;
}

// Component
const Form: React.FC<FormProps> = ({ initialValues, saveQuestion, onCickGoBack }) => {
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(initialValues.questions.length);
	const [loading, setLoading] = useState(false);

	// Decrements the current question number
	const previousQuestion = useCallback(
		(isValid: boolean) => {
			if (isValid === true) {
				setLoading(true);
				setTimeout(() => {
					setCurrentQuestionNumber(currentQuestionNumber - 1);
					setLoading(false);
				}, 1000);
			}
		},
		[currentQuestionNumber]
	);

	// Increments the current question number
	const nextQuestion = useCallback(
		(isValid: boolean) => {
			if (isValid === true) {
				setLoading(true);
				setTimeout(() => {
					setCurrentQuestionNumber(currentQuestionNumber + 1);
					setLoading(false);
				}, 1000);
			}
		},
		[currentQuestionNumber]
	);

	// Sets the current question number to last question
	const lastQuestion = useCallback((index: number) => {
		setLoading(true);
		setTimeout(() => {
			setCurrentQuestionNumber(index);
			setLoading(false);
		}, 1000);
	}, []);

	// Renders output input boxes
	const renderOptionInputs = useCallback((values: FormQuestion, questionIndex: number) => {
		return makeOptionInputs(values, questionIndex);
	}, []);

	return (
		<Fragment>
			<Formik
				initialValues={initialValues}
				validate={validateForm}
				enableReinitialize={true}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(false);
					saveQuestion(values);
					lastQuestion(values.questions.length + 1);
					resetForm();
				}}
			>
				{({ values, handleSubmit, isSubmitting, isValid, touched, setFieldTouched }) => (
					<FormElement onSubmit={handleSubmit}>
						<FieldArray name='questions'>
							{({ push, remove }) =>
								values.questions.map((question, questionIndex) => {
									const displayQuestion: boolean = questionIndex + 1 === currentQuestionNumber;
									const key: string = question.id === undefined ? `${questionIndex}` : question.id;
									const optionsLength: number = question.options.length;
									const totalQuestions: number = values.questions.length;

									return (
										<QuestionsWrapper key={key} displayQueustion={displayQuestion} isLoading={loading}>
											<FormHeader
												currentQuestionNumber={currentQuestionNumber}
												totalQuestions={totalQuestions}
												deleteQuestion={() => {
													remove(questionIndex);
													lastQuestion(totalQuestions - 1);
												}}
											/>

											{/* Question */}
											<FormGroup>
												<Input name={`questions.${questionIndex}.question`} placeholder={QuestionPlaceholder} />
											</FormGroup>

											{/* Options along with buttons */}
											<FieldArray name={`questions.${questionIndex}.options`}>
												{({ push: optionsPush }) => (
													<Fragment>
														{/* Options input boxes */}
														{renderOptionInputs(question, questionIndex)}

														{/* Buttons group */}
														<ButtonGroup>
															{optionsLength < 4 && (
																<Fragment>
																	{/* Add option button */}
																	<Button type='button' text={AddOption} width='auto' gradient={true} onClick={() => optionsPush('')} />
																</Fragment>
															)}

															{/* Add question button */}
															<Button
																type='button'
																text={AddQuestion}
																width='auto'
																gradient={true}
																margin={optionsLength < 4 ? true : false}
																disabled={isSubmitting}
																onClick={() => {
																	if (isFormValid(isValid, touched, questionIndex, totalQuestions, setFieldTouched) === true) {
																		push(emptyQuestion);
																		lastQuestion(totalQuestions + 1);
																	} else {
																		lastQuestion(totalQuestions);
																	}
																}}
															/>

															{/* Submit question button */}
															<Button type='submit' text={SaveQuestion} width='auto' gradient={true} margin={optionsLength < 4 ? false : true} disabled={isSubmitting} />

															{currentQuestionNumber !== 1 && (
																// Previous question button
																<Button type='button' text={Previous} width='auto' gradient={true} margin={optionsLength < 4 ? true : false} disabled={isSubmitting} onClick={() => previousQuestion(isValid)} />
															)}

															{currentQuestionNumber !== totalQuestions && (
																// Next question button
																<Button type='button' text={Next} width='auto' gradient={true} margin={currentQuestionNumber !== 1 ? false : true} disabled={isSubmitting} onClick={() => nextQuestion(isValid)} />
															)}

															<Button type='button' text={GoBack} width='auto' gradient={true} margin={currentQuestionNumber !== totalQuestions || totalQuestions === 1 ? true : false} onClick={onCickGoBack} />
														</ButtonGroup>
													</Fragment>
												)}
											</FieldArray>
										</QuestionsWrapper>
									);
								})
							}
						</FieldArray>
					</FormElement>
				)}
			</Formik>
		</Fragment>
	);
};

export default Form;
