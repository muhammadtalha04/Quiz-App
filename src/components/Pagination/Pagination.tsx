import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { secondary } from '../../colors';
import { RootState } from '../../store';
import { QuestionsState, QuestionType, QuizState } from '../../types';
import Icon from '../Icon/Icon';
import { ActivePaginationItem, PaginationItem, PaginationWrapper } from './Style';

const generatePageNums = (questions: QuestionType[], currentQuestion: number) => {
    return Object.keys(questions).map(q => {
        const qNo = parseInt(q);

        if (qNo < currentQuestion) {
            return (<PaginationItem checked={true} key={qNo}><Icon icon="fa fa-check" color={secondary} /></PaginationItem>);
        } else if (qNo === currentQuestion) {
            return (<ActivePaginationItem checked={false} key={qNo}>{qNo + 1}</ActivePaginationItem>);
        } else {
            return (<PaginationItem checked={false} key={qNo}>{qNo + 1}</PaginationItem>);
        }
    });
}

const Pagination: React.FC = () => {
    const questionState: QuestionsState = useSelector((state: RootState) => state.question);
    const quiz: QuizState = useSelector((state: RootState) => state.quiz);

    const render = useMemo(() => {
        return generatePageNums(questionState.questions, quiz.currentQuestion);
    }, [questionState, quiz.currentQuestion]);

    return (
        <PaginationWrapper>
            {render}
        </PaginationWrapper>
    );
}

export default Pagination;