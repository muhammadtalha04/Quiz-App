import React, { Fragment, useMemo } from 'react';
import { Options, QuestionType } from '../../types';
import Option from '../Option/Option';
import Text from '../Text/Text';
import { QuestionWrapper } from './Style';

const makeOptions = (options: string[], selectedOption: number, saveOption: (option: number) => void) => {
	return options.map((option, index) => <Option optionIndex={index} key={option} text={option} selected={selectedOption === index ? true : false} optionNumber={Options[index]} saveOption={saveOption} />);
};

interface QuestionProps {
	question: QuestionType;
	currentQuestion: number;
	selectedOption: number;
	saveOption: (option: number) => void;
}

const Question: React.FC<QuestionProps> = ({ question, currentQuestion, selectedOption, saveOption }) => {
	const renderOptions = useMemo(() => {
		return makeOptions(question.options, selectedOption, saveOption);
	}, [saveOption, question.options, selectedOption]);

	return (
		<Fragment>
			<Text text={`${currentQuestion + 1} .`} fontWeight='bold' fontSize={15} />

			<QuestionWrapper>
				<Text text={question.question} fontWeight='bold' fontSize={12} />
			</QuestionWrapper>

			{renderOptions}
		</Fragment>
	);
};

export default Question;
