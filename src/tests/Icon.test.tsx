import { fireEvent, render } from '@testing-library/react';
import Icon from '../components/Icon/Icon';

const mockedClick = jest.fn();
const component: JSX.Element = <Icon icon='fa fa-search' onClick={mockedClick} />;

xtest('i is present and has the class fa fa-search', () => {
	const { container } = render(component);

	expect(container.querySelector('span')?.firstChild).toHaveClass('fa fa-search');
});

xtest('click is working', () => {
	const { container } = render(component);

	const elements = container.getElementsByTagName('span');

	expect(elements.length).toBeGreaterThan(0);

	fireEvent.click(elements[0]);

	expect(mockedClick).toHaveBeenCalled();
});
