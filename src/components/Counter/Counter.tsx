import React, { useEffect } from 'react';
import { CounterWrapper } from './Style';

interface CounterProps {
	time: string;
	tick: () => void;
}

const Counter: React.FC<CounterProps> = ({ time, tick }) => {
	useEffect(() => {
		tick();
	}, [tick]);

	return <CounterWrapper>{time}</CounterWrapper>;
};

export default Counter;
