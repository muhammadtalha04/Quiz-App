import React from 'react';
import { secondary } from '../../colors';
import Text from '../Text/Text';
import { OptionNumber, OptionWrapper } from './Style';

interface OptionProps {
	text: string;
	optionIndex: number;
	optionNumber: string;
	selected: boolean;
	saveOption: (option: number) => void;
}

const Option: React.FC<OptionProps> = ({ text, optionIndex, optionNumber, selected, saveOption }) => {
	return (
		<OptionWrapper selected={selected} onClick={() => saveOption(optionIndex)}>
			<OptionNumber selected={selected}>{`${optionNumber} .`}</OptionNumber>

			{selected === true ? <Text text={text} fontWeight='bold' margin={0} color={secondary} /> : <Text text={text} fontWeight='bold' margin={0} />}
		</OptionWrapper>
	);
};

export default Option;
