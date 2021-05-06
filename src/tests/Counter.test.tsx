import { render, waitFor } from '@testing-library/react';
import { useState } from 'react';
import Counter from '../components/Counter/Counter';

let mockTime: string = '3';

const MockComponent: React.FC<{ time: string }> = ({ time }) => {
	const [remainingTime, setRemainingTime] = useState<number>(parseInt(time));

	const ticker = () => {
		setInterval(() => remainingTime > 0 && setRemainingTime(remainingTime - 1), 1000);
	};

	return <Counter time={`${remainingTime}`} tick={ticker} />;
};

xtest('counter is working properly on correct time input', async () => {
	jest.useFakeTimers();

	const { getByText } = render(<MockComponent time={mockTime} />);

	await waitFor(() => {
		expect(getByText('3')).toBeInTheDocument();
		jest.advanceTimersByTime(1000);
		expect(getByText('2')).toBeInTheDocument();
		jest.advanceTimersByTime(1000);
		expect(getByText('1')).toBeInTheDocument();
		jest.advanceTimersByTime(1000);
		expect(getByText('0')).toBeInTheDocument();
		jest.advanceTimersByTime(1000);
		expect(getByText('0')).toBeInTheDocument();
	});
});

xtest('counter is working properly on negative time input', async () => {
	jest.useFakeTimers();

	mockTime = '-1';
	const { getByText } = render(<MockComponent time={mockTime} />);

	await waitFor(() => {
		expect(getByText('-1')).toBeInTheDocument();
		jest.advanceTimersByTime(1000);
		expect(getByText('-1')).toBeInTheDocument();
	});
});
