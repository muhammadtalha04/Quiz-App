import React from 'react';
import { blue } from '../../../../colors';
import Text from '../../../../components/Text/Text';
import Time from '../../../../components/Time/Time';
import { QuizStatsWrapper, Width100 } from './Style';

interface QuizResultProps {
	playerName: string;
	score: number;
	totalQuestions: number;
	timeTaken: string;
}

const QuizResult: React.FC<QuizResultProps> = ({ playerName, score, totalQuestions, timeTaken }) => {
	return (
		<QuizStatsWrapper>
			<Width100>
				<Text text={playerName} color={blue} fontWeight='bold' fontSize={20} />
			</Width100>
			<Width100>
				<Text text={`You scored ${score} out of ${totalQuestions}.`} fontWeight='bold' />
			</Width100>
			<Width100>
				<Text text={`You finished the quiz in`} fontWeight='bold' />
				<Time time={timeTaken} />
			</Width100>
		</QuizStatsWrapper>
	);
};

export default QuizResult;
