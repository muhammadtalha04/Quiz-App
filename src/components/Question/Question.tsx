import React, { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Options, QuestionsState, QuestionType, QuizState } from '../../types';
import Option from '../Option/Option';
import Text from '../Text/Text';
import { QuestionWrapper } from './Style';

const makeOptions = (options: string[], selectedInd: number, saveOption: (option: number) => void) => {
    return options.map((o, ind) => {
        return (
            <Option
                optInd={ind}
                key={o}
                text={o}
                selected={selectedInd === ind ? true : false}
                optNo={Options[ind]}
                saveOption={saveOption}
            />
        );
    });
}

interface QuestionProps {
    saveOption: (option: number) => void;
}

const Question: React.FC<QuestionProps> = (props: QuestionProps) => {
    const questionState: QuestionsState = useSelector((state: RootState) => state.question);
    const quiz: QuizState = useSelector((state: RootState) => state.quiz);

    const qNo = quiz.currentQuestion;
    const question: QuestionType = questionState.questions[qNo];

    const renderOptions = useMemo(() => {
        return makeOptions(question.options, quiz.selectedOption, props.saveOption);
    }, [props.saveOption, question.options, quiz.selectedOption]);

    return (
        <Fragment>
            <Text text={`${qNo + 1} .`} fontWeight="bold" fontSize={15} />

            <QuestionWrapper>
                <Text text={question.question} fontWeight="bold" fontSize={12} />
            </QuestionWrapper>

            {
                renderOptions
            }
        </Fragment>
    );
}

export default Question;