import React, { ChangeEvent } from 'react';
import { InputElement } from './Style';

interface InputProps {
    value: string;
    placeholder: string;
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
    return (
        <InputElement value={props.value} onChange={props.onInputChange} placeholder={props.placeholder} />
    );
}

export default Input;