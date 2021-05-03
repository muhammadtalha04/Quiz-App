import React, { MouseEventHandler } from 'react';
import Icon from '../../../../../../components/Icon/Icon';
import Text from '../../../../../../components/Text/Text';
import { AddQuestionsHeaderWrapper, IconColumn, IconItem, TextColumn } from './Style';

interface FormHeaderProps {
	currentQuestionNumber: number;
	totalQuestions: number;
	deleteQuestion: MouseEventHandler<HTMLSpanElement>;
}

const FormHeader: React.FC<FormHeaderProps> = ({ currentQuestionNumber, totalQuestions, deleteQuestion }) => {
	return (
		<AddQuestionsHeaderWrapper>
			<TextColumn>
				<Text text={`${currentQuestionNumber} / ${totalQuestions}`} fontWeight='bold' />
			</TextColumn>

			{currentQuestionNumber !== totalQuestions && (
				<IconColumn>
					<IconItem>
						<Icon icon='fa fa-trash' onClick={deleteQuestion} />
					</IconItem>
				</IconColumn>
			)}
		</AddQuestionsHeaderWrapper>
	);
};

export default FormHeader;
