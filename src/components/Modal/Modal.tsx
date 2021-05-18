import React, { Fragment, MouseEventHandler } from 'react';
import { ActionButtons, ModalContent, ModalDiv, TextWrapper } from './Style';
import Text from '../Text/Text';
import Button from '../Button/Button';
import { No, Ok, Yes } from '../../constants';
import { ModalType } from '../../types';

interface ModalProps {
	text: string;
	type: ModalType;
	onClickYes: MouseEventHandler<HTMLButtonElement>;
	onClickNo: MouseEventHandler<HTMLButtonElement>;
	onClickOk: MouseEventHandler<HTMLButtonElement>;
}

const Modal: React.FC<ModalProps> = ({ text, type, onClickYes, onClickNo, onClickOk }) => {
	return (
		<ModalDiv>
			<ModalContent>
				<TextWrapper>
					<Text text={text} />
				</TextWrapper>

				<ActionButtons>
					{type === 'dialogue' && (
						<Fragment>
							<Button text={Yes} gradient={true} width='auto' margin={true} onClick={onClickYes} />
							<Button text={No} gradient={true} width='auto' margin={true} onClick={onClickNo} />
						</Fragment>
					)}

					{type === 'alert' && <Button text={Ok} gradient={true} width='auto' margin={true} onClick={onClickOk} />}
				</ActionButtons>
			</ModalContent>
		</ModalDiv>
	);
};

export default Modal;
