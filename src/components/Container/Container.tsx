import React, { ChangeEvent, MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { blue } from '../../colors';
import { AddQues, Cancel, Play, Random, Resume } from '../../constants';
import { RootState } from '../../store';
import { QuestionsState, QuizState } from '../../types';
import Button from '../Button/Button';
import Form from '../Form/Form';
import Question from '../Question/Question';
import Text from '../Text/Text';
import Time from '../Time/Time';
import { ButtonsWrapper, ContainerWrapper, QuizStatsWrapper, Width100 } from './Style';

interface ContainerProps {
    generateRandomQues: MouseEventHandler<HTMLButtonElement>;
    addQuestions: MouseEventHandler<HTMLButtonElement>;
    startQuiz: MouseEventHandler<HTMLButtonElement>;
    resumeQuiz: MouseEventHandler<HTMLButtonElement>;
    cancelQuiz: MouseEventHandler<HTMLButtonElement>;
    saveOption: (option: number) => void;
    onQuestionChange: (event: ChangeEvent<HTMLInputElement>, qIndex: number) => void;
    onOptionChange: (event: ChangeEvent<HTMLInputElement>, index: number, qIndex: number) => void;
    onCorrectOptionChange: (event: ChangeEvent<HTMLInputElement>, qIndex: number) => void;
    onClickAddOption: (qIndex: number) => void;
    onClickAddQues: MouseEventHandler<HTMLButtonElement>;
    onSaveQuestion: MouseEventHandler<HTMLButtonElement>;
    onCancel: MouseEventHandler<HTMLButtonElement>;
}

const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
    const quiz: QuizState = useSelector((state: RootState) => state.quiz);
    const questionState: QuestionsState = useSelector((state: RootState) => state.question);

    const quesLen: number = questionState.questions.length;

    return (
        <ContainerWrapper>
            {
                quiz.status === "submitted" &&
                (
                    <QuizStatsWrapper>
                        <Width100>
                            <Text text={quiz.playerName} color={blue} fontWeight="bold" fontSize={20} />
                        </Width100>
                        <Width100>
                            <Text text={`You scored ${quiz.score} out of ${quesLen}.`} fontWeight="bold" />
                        </Width100>
                        <Width100>
                            <Text text={`You finished the quiz in`} fontWeight="bold" />
                            <Time />
                        </Width100>
                    </QuizStatsWrapper>
                )
            }
            {
                (quiz.status === "default" || quiz.status === "submitted") &&
                (
                    <ButtonsWrapper>
                        {/* Random Questions Button */}
                        <Button
                            text={Random}
                            gradient={true}
                            width="full"
                            onClick={props.generateRandomQues}
                            margin={true}
                        />
                        {/* Make Quiz Button */}
                        <Button
                            text={AddQues}
                            gradient={true}
                            width="full"
                            onClick={props.addQuestions}
                            margin={true}
                        />
                        {/* Play Quiz Button */}
                        <Button
                            text={Play}
                            gradient={true}
                            width="full"
                            onClick={props.startQuiz}
                            margin={true}
                        />
                    </ButtonsWrapper>
                )
            }
            {
                quiz.status === "paused" &&
                <ButtonsWrapper>
                    {/* Resume Quiz Button */}
                    <Button
                        text={Resume}
                        gradient={true}
                        width="full"
                        onClick={props.resumeQuiz}
                        margin={true}
                    />
                    {/* Cancel Quiz Button */}
                    <Button
                        text={Cancel}
                        gradient={true}
                        width="full"
                        onClick={props.cancelQuiz}
                        margin={true}
                    />
                </ButtonsWrapper>
            }
            {
                quiz.status === "in-progress" &&
                (
                    <Question
                        saveOption={props.saveOption}
                    />
                )
            }
            {
                quiz.status === "add-questions" &&
                (
                    <Form
                        onQuestionChange={props.onQuestionChange}
                        onOptionChange={props.onOptionChange}
                        onCorrectOptionChange={props.onCorrectOptionChange}
                        onClickAddOption={props.onClickAddOption}
                        onClickAddQues={props.onClickAddQues}
                        onSaveQuestion={props.onSaveQuestion}
                        onCancel={props.onCancel}
                    />
                )
            }
        </ContainerWrapper>
    );
}

export default Container;