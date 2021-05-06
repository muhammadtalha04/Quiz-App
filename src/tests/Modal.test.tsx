import { fireEvent, render, screen } from '@testing-library/react';
import Modal from '../components/Modal/Modal';

const onClickYes = jest.fn();
const onClickNo = jest.fn();

const component: JSX.Element = <Modal text='Modal text' onClickYes={onClickYes} onClickNo={onClickNo} />;

xit('has text and working action buttons', () => {
	render(component);

	// Text is present
	expect(screen.getByText('Modal text')).toBeInTheDocument();

	// "Yes" action button
	expect(screen.getByText('Yes')).toBeInTheDocument();

	fireEvent.click(screen.getByText('Yes'));

	expect(onClickYes).toBeCalled();

	// "No" action button
	expect(screen.getByText('No')).toBeInTheDocument();

	fireEvent.click(screen.getByText('No'));

	expect(onClickNo).toBeCalled();
});
