import { render, screen } from '@testing-library/react';
import Text from '../components/Text/Text';

const textProps = {
	text: ' Hello World',
};

xit('has text', () => {
	render(<Text text={textProps.text} />);

	expect(screen.getByText('Hello World')).toBeInTheDocument();
});
