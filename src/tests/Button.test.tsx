import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button/Button';

const handleClick = jest.fn();

const buttonProps = {
	text: '',
	disabled: false,
};

xit('has text', () => {
	buttonProps.text = 'Test Button';

	render(<Button text={buttonProps.text} gradient={false} width='full' disabled={buttonProps.disabled} onClick={handleClick} />);

	expect(screen.getByText('Test Button')).toBeInTheDocument();
});

xit('is not disabled and click is working', () => {
	render(<Button text={buttonProps.text} gradient={false} width='full' disabled={buttonProps.disabled} onClick={handleClick} />);

	const element = screen.getByText('Test Button');

	expect(element).not.toBeDisabled();

	fireEvent.click(element);

	expect(handleClick).toBeCalled();
});

xit('is disabled and click is not working', () => {
	buttonProps.disabled = true;

	render(<Button text={buttonProps.text} gradient={false} width='full' disabled={buttonProps.disabled} onClick={handleClick} />);

	expect(screen.getByText('Test Button')).toBeDisabled();

	fireEvent.click(screen.getByText('Test Button'));

	expect(handleClick).not.toBeCalled();
});
