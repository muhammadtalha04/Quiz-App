import styled from 'styled-components';

interface FormProps {
	displayQueustion: boolean;
	isLoading: boolean;
}

export const FormElement = styled.form``;

export const FormWrapper = styled.div``;

export const FormGroup = styled.div`
	margin: 10px 0px;
`;

export const ButtonGroup = styled(FormGroup)`
	line-height: 3;
`;

export const QuestionsWrapper = styled.div<FormProps>`
	display: ${(props) => (props.displayQueustion === true ? 'block' : 'none')};
	margin-bottom: 20px;
	opacity: ${(props) => (props.isLoading === true ? '0.5' : '1')};
`;
