import React, { Fragment } from 'react';
import { InputElement } from './Style';
import { useField } from 'formik';
import Text from '../Text/Text';

interface InputProps {
	name: string;
	placeholder: string;
	hideError?: boolean;
}

const Input: React.FC<InputProps> = ({ name, placeholder, hideError }) => {
	const [field, meta] = useField(name);
	const invalid: boolean = Boolean(meta.touched && meta.error);

	return (
		<Fragment>
			<InputElement name={field.name} value={field.value} onChange={field.onChange} onBlur={field.onBlur} placeholder={placeholder} />

			{invalid && (hideError === undefined || hideError === false) && <Text text={meta.error !== undefined ? meta.error : ''} type='error' />}
		</Fragment>
	);
};

export default Input;
