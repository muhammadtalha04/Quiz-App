import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Formik, FormikErrors } from 'formik';
import Input from '../components/Input/Input';
import { FormElement } from '../pages/Home/Body/AddQuestions/Form/Style';

const mockSubmit = jest.fn();

type mockedFormType = { name: string };

const mockValidation = (values: mockedFormType) => {
	const errors: FormikErrors<mockedFormType> = {};

	if (!values.name) {
		errors.name = 'Name is required';
	}

	return errors;
};

const MockForm = () => {
	return (
		<Formik initialValues={{ name: '' }} validate={mockValidation} onSubmit={mockSubmit}>
			{({ handleSubmit }) => (
				<FormElement className='form' onSubmit={handleSubmit}>
					<Input name='name' placeholder='Name' />
				</FormElement>
			)}
		</Formik>
	);
};

xtest('correct value is being entered in input element', async () => {
	const { getByPlaceholderText } = render(<MockForm />);

	const nameInput = getByPlaceholderText('Name');

	userEvent.type(nameInput, 'Dummy');

	await waitFor(() => {
		expect(nameInput).toHaveValue('Dummy');
	});
});

xtest('error is being displayed in case of empty input', async () => {
	const { container, getByText } = render(<MockForm />);

	const form = container.getElementsByClassName('form');

	expect(form.length).toBe(1);

	fireEvent.submit(form[0]);

	await waitFor(() => {
		expect(getByText(/name is required/i)).toBeInTheDocument();
		expect(getByText(/name is required/i)).toHaveStyle('color: red');
	});
});
