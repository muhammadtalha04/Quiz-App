import React, { ChangeEvent } from 'react';
import { InputElement } from './Style';

interface InputProps {
    value: string;
    placeholder: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, placeholder, onInputChange }) => {
    return (
        <InputElement value={value} onChange={onInputChange} placeholder={placeholder} />
    );
}

export default Input;