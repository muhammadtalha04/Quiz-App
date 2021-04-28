import React, { Fragment, MouseEventHandler } from 'react';
import { RightAlign, LeftAlign, HeaderWrapper, Cols, CenterAlign, Rows } from './Style';
import Text from '../Text/Text';
import { secondary } from '../../colors';
import { Cancel, Finish, Submit, SuperQuiz } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { QuestionsState, QuizState } from '../../types';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Counter from '../Counter/Counter';
import Pagination from '../Pagination/Pagination';

interface HeaderProps {
    goBack: MouseEventHandler<HTMLSpanElement>;
    cancelQuiz: MouseEventHandler<HTMLButtonElement>;
    submitQues: MouseEventHandler<HTMLButtonElement>;
    onTimerEnd: () => void;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
    const questionState: QuestionsState = useSelector((state: RootState) => state.question);
    const quiz: QuizState = useSelector((state: RootState) => state.quiz);

    const quesLength = questionState.questions.length;

    return (
        <HeaderWrapper>
            {
                (quiz.status === "default" || quiz.status === "paused" || quiz.status === "submitted" || quiz.status === "add-questions") &&
                (
                    <Fragment>
                        <Text
                            text={SuperQuiz}
                            fontWeight="bold"
                            fontSize={30}
                            color={secondary}
                        />

                        <Text
                            text="Play Super Quiz and earn points"
                            color={secondary}
                        />
                    </Fragment>
                )
            }
            {
                quiz.status === "in-progress" &&
                <Rows>
                    <Cols>
                        {/* Icon to pause the quiz and go back to homepage */}
                        <LeftAlign>
                            <Icon
                                icon="fa fa-angle-left"
                                color={secondary}
                                size={25}
                                bold={true}
                                onClick={props.goBack}
                            />
                        </LeftAlign>

                        {/* Remaining time to attempt the current question */}
                        <CenterAlign>
                            <Counter
                                submit={props.onTimerEnd}
                            />
                        </CenterAlign>

                        {/* Buttons for submitting or quitting the quiz */}
                        <RightAlign>
                            <Button
                                text={Cancel}
                                gradient={false}
                                width="auto"
                                onClick={props.cancelQuiz}
                            />
                            {
                                (quiz.currentQuestion !== quesLength - 1) ?
                                    (
                                        <Button
                                            text={Submit}
                                            gradient={false}
                                            width="auto"
                                            onClick={props.submitQues}
                                        />
                                    ) :
                                    (
                                        <Button
                                            text={Finish}
                                            gradient={false}
                                            width="auto"
                                            onClick={props.submitQues}
                                        />
                                    )
                            }
                        </RightAlign>
                    </Cols>

                    <CenterAlign>
                        <Pagination />
                    </CenterAlign>
                </Rows>
            }
        </HeaderWrapper>
    );
}

export default Header;