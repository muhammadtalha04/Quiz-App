import React, { MouseEventHandler } from 'react';
import { ActionButtons, ModalContent, ModalDiv, TextWrapper } from './Style';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { No, Yes } from '../../constants';

interface ModalProps {
    text: string;
    onClickYes: MouseEventHandler<HTMLButtonElement>;
    onClickNo: MouseEventHandler<HTMLButtonElement>;
}

const Modal: React.FC<ModalProps> = ({ text, onClickYes, onClickNo }) => {
    return (
        <ModalDiv>
            <ModalContent>
                <TextWrapper>
                    <Text text={text} />
                </TextWrapper>

                <ActionButtons>
                    <Button
                        text={Yes}
                        gradient={true}
                        width="auto"
                        margin={true}
                        onClick={onClickYes}
                    />
                    <Button
                        text={No}
                        gradient={true}
                        width="auto"
                        margin={true}
                        onClick={onClickNo}
                    />
                </ActionButtons>
            </ModalContent>
        </ModalDiv>
    );
}

export default Modal;