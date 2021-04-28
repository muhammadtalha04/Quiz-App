import React, { ChangeEvent, MouseEventHandler, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AddOption, AddQuestion, Cancel, CorrectOptPlaceholder, OptionPlaceholder, QuestionPlaceholder, SaveQuestion } from '../../constants';
import { RootState } from '../../store';
import { FormState } from '../../types';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Text from '../Text/Text';
import { FormGroup, FormWrapper, HR, QuestionsWrapper } from './Style';

// ================ INTERFACES ==========================
interface OptionProps {
    value: string[];
    onOptionChange: (event: ChangeEvent<HTMLInputElement>, index: number, qIndex: number) => void;
}

interface FormProps {
    onQuestionChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    onOptionChange: (event: ChangeEvent<HTMLInputElement>, index: number, qIndex: number) => void;
    onCorrectOptionChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
    onClickAddOption: (qIndex: number) => void;
    onClickAddQues: MouseEventHandler<HTMLButtonElement>;
    onSaveQuestion: MouseEventHandler<HTMLButtonElement>;
    onCancel: MouseEventHandler<HTMLButtonElement>;
}

interface QuestionProps extends FormProps, FormState {
}

// ================ FUNCTIONS ==========================
const makeOptionInputs = (numOfOpt: number, qNo: number, formProps: OptionProps) => {
    const { value, onOptionChange } = formProps;
    const optInputs: JSX.Element[] = [];

    for (let i = 0; i < numOfOpt; i++) {
        const elem: JSX.Element = (
            <FormGroup key={i}>
                <Input
                    value={value[i]}
                    placeholder={`${OptionPlaceholder} ${i + 1}`}
                    onInputChange={(e) => onOptionChange(e, i, qNo)}
                />
            </FormGroup>
        );

        optInputs.push(elem);
    }

    return optInputs;
}

const makeQuestions = (form: QuestionProps) => {
    const questions: JSX.Element[] = [];

    for (let i = 0; i < form.numOfQuestions; i++) {
        const ques: JSX.Element = (
            <QuestionsWrapper key={i}>
                <Text text={`${i + 1}.`} fontWeight="bold" />

                {/* Question */}
                <FormGroup>
                    <Input
                        value={form.questions[i].question}
                        placeholder={QuestionPlaceholder}
                        onInputChange={(e) => form.onQuestionChange(e, i)}
                    />
                </FormGroup>

                {/* Options */}
                {
                    makeOptionInputs(form.questions[i].numOfOptions, i, { value: form.questions[i].options, onOptionChange: form.onOptionChange })
                }

                {/* Correct Option */}
                <FormGroup>
                    <Input
                        value={form.questions[i].correctOption}
                        placeholder={CorrectOptPlaceholder}
                        onInputChange={(e) => form.onCorrectOptionChange(e, i)}
                    />
                </FormGroup>

                {/* Buttons for adding new options and saving question */}
                <FormGroup>
                    {
                        form.questions[i].numOfOptions < 4 &&
                        (
                            // Add new option button
                            <Button
                                text={AddOption}
                                width="auto"
                                gradient={true}
                                onClick={() => form.onClickAddOption(i)}
                            />
                        )
                    }
                </FormGroup>

                <HR />
            </QuestionsWrapper>
        );

        questions.push(ques);
    }

    return questions;
}

// ================== COMPONENT ========================
const Form: React.FC<FormProps> = ({ onQuestionChange, onOptionChange, onCorrectOptionChange, onClickAddOption, onClickAddQues, onSaveQuestion, onCancel }) => {
    const formState: FormState = useSelector((state: RootState) => state.form);

    const renderQuestions = useMemo(() => {
        const params: QuestionProps = {
            questions: formState.questions,
            numOfQuestions: formState.numOfQuestions,
            onQuestionChange: onQuestionChange,
            onOptionChange: onOptionChange,
            onCorrectOptionChange: onCorrectOptionChange,
            onClickAddOption: onClickAddOption,
            onClickAddQues: onClickAddQues,
            onSaveQuestion: onSaveQuestion,
            onCancel: onCancel,
        }

        return makeQuestions(params);
    }, [formState, onQuestionChange, onOptionChange, onCorrectOptionChange, onClickAddOption, onClickAddQues, onSaveQuestion, onCancel]);

    return (
        <FormWrapper>
            {
                renderQuestions
            }

            {/* Buttons for save, add, and cancel */}
            <FormGroup>
                {/* Save question button */}
                <Button
                    text={AddQuestion}
                    width="auto"
                    gradient={true}
                    onClick={onClickAddQues}
                />

                {/* Save question button */}
                <Button
                    text={SaveQuestion}
                    width="auto"
                    gradient={true}
                    onClick={onSaveQuestion}
                    margin={true}
                />

                {/* Cancel Button */}
                <Button
                    text={Cancel}
                    width="auto"
                    gradient={true}
                    onClick={onCancel}
                />
            </FormGroup>
        </FormWrapper>
    );
}

export default Form;