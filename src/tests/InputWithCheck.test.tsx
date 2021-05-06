import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, FormikErrors } from 'formik';
import InputWithCheck from '../components/InputWithCheck/InputWithCheck';
import { FormElement } from '../pages/Home/Body/AddQuestions/Form/Style';

const mockSubmit = jest.fn();

type mockedFormType = { option1: string; option2: string; correctOption: string };

const mockValidation = (values: mockedFormType) => {
	const errors: FormikErrors<mockedFormType> = {};

	if (!values.option1) {
		errors.option1 = 'Option 1 is required';
	}

	if (!values.option2) {
		errors.option2 = 'Option 2 is required';
	}

	if (!values.correctOption) {
		errors.correctOption = 'Correct option is required';
	}

	return errors;
};

const MockForm = () => {
	return (
		<Formik initialValues={{ option1: '', option2: '', correctOption: '' }} validate={mockValidation} onSubmit={mockSubmit}>
			{({ handleSubmit }) => (
				<FormElement className='form' onSubmit={handleSubmit}>
					<InputWithCheck name='correctOption' value='A' inputName='option1' inputPlaceholder='Option 1' checked={false} />
					<InputWithCheck name='correctOption' value='B' inputName='option2' inputPlaceholder='Option 2' checked={false} />
				</FormElement>
			)}
		</Formik>
	);
};

xtest('correct value is being entered in option input and radio buttons are working', async () => {
	const { getByPlaceholderText, getAllByRole } = render(<MockForm />);

	const option1 = getByPlaceholderText('Option 1');
	const option2 = getByPlaceholderText('Option 2');
	const correctOptions = getAllByRole('radio');

	expect(correctOptions.length).toBe(2);

	userEvent.type(option1, 'One');
	userEvent.type(option2, 'Two');

	fireEvent.change(correctOptions[1], { target: { checked: true } });

	await waitFor(() => {
		expect(option1).toHaveValue('One');
		expect(option2).toHaveValue('Two');
		expect(correctOptions[0]).not.toBeChecked();
		expect(correctOptions[1]).toBeChecked();
	});
});

xtest('error is being displayed in case of empty options', async () => {
	const { container, getByPlaceholderText, getAllByRole, getByText } = render(<MockForm />);

	const option1 = getByPlaceholderText('Option 1');
	const option2 = getByPlaceholderText('Option 2');
	const correctOptions = getAllByRole('radio');
	const form = container.getElementsByClassName('form');

	expect(form.length).toBe(1);

	expect(correctOptions.length).toBe(2);

	fireEvent.submit(form[0]);

	await waitFor(() => {
		expect(getByText(/option 1 is required/i)).toBeInTheDocument();
		expect(getByText(/option 1 is required/i)).toHaveStyle('color: red');

		expect(getByText(/option 2 is required/i)).toBeInTheDocument();
		expect(getByText(/option 2 is required/i)).toHaveStyle('color: red');
	});
});

xtest('error is being displayed in case of correct option not being selected', async () => {
	const { container, getByPlaceholderText, getAllByRole, getAllByText } = render(<MockForm />);

	const option1 = getByPlaceholderText('Option 1');
	const option2 = getByPlaceholderText('Option 2');
	const correctOptions = getAllByRole('radio');
	const form = container.getElementsByClassName('form');

	expect(form.length).toBe(1);

	expect(correctOptions.length).toBe(2);

	userEvent.type(option1, 'One');
	userEvent.type(option2, 'Two');

	fireEvent.submit(form[0]);

	await waitFor(() => {
		expect(getAllByText(/correct option is required/i).length).toBe(2);

		expect(getAllByText(/correct option is required/i)[0]).toHaveStyle('color: red');
	});
});
