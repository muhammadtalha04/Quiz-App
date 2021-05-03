import React, { Fragment } from 'react';
import Input from '../Input/Input';
import Text from '../Text/Text';
import { useField } from 'formik';
import { RadioButton, RadioButtonInInput } from './Style';

interface InputWithCheckProps {
	name: string;
	value: string;
	inputName: string;
	inputPlaceholder: string;
	checked: boolean;
}

const InputWithCheck: React.FC<InputWithCheckProps> = ({ name, value, inputName, inputPlaceholder, checked }) => {
	const [field, meta] = useField(name);
	const [, inputMeta] = useField(inputName);
	const invalid: boolean = Boolean(meta.touched && meta.error);
	const inputInvalid: boolean = Boolean(inputMeta.touched && inputMeta.error);

	return (
		<Fragment>
			<RadioButtonInInput>
				<Input name={inputName} placeholder={inputPlaceholder} hideError={true} />
				<RadioButton name={name} type='radio' value={value} onChange={field.onChange} checked={checked} />
			</RadioButtonInInput>

			{/* Validation error for radio button */}
			{!inputInvalid && invalid && <Text text={meta.error !== undefined ? meta.error : ''} type='error' />}

			{/* Validation error for input */}
			{inputInvalid && <Text text={inputMeta.error !== undefined ? inputMeta.error : ''} type='error' />}
		</Fragment>
	);
};

export default InputWithCheck;
