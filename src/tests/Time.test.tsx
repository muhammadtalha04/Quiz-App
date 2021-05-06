import { render, screen } from '@testing-library/react';
import Time from '../components/Time/Time';

const timeProps = {
	time: '',
};

xtest('empty string passed instead of time should convert to 00:00:00', () => {
	render(<Time time={timeProps.time} />);

	expect(screen.getAllByText('00').length).toBe(3);
});

xtest('time is passed as tt :  : tt', () => {
	timeProps.time = '12   :  : 40';
	render(<Time time={timeProps.time} />);

	expect(screen.getAllByText('00').length).toBe(1);
	expect(screen.getByText('12')).toBeInTheDocument();
	expect(screen.getByText('40')).toBeInTheDocument();
});

xtest('more than 60 minutes and seconds are passed', () => {
	timeProps.time = '12   : 63 : 62';
	render(<Time time={timeProps.time} />);

	expect(screen.getByText('13')).toBeInTheDocument();
	expect(screen.getByText('04')).toBeInTheDocument();
	expect(screen.getByText('02')).toBeInTheDocument();
});

xtest('negative values are passed in time', () => {
	timeProps.time = '-12:-63:-32';
	render(<Time time={timeProps.time} />);

	expect(screen.getAllByText('00').length).toBe(3);
});

xtest('minutes are passed negative value', () => {
	timeProps.time = '12:-63:32';
	render(<Time time={timeProps.time} />);

	expect(screen.getByText('12')).toBeInTheDocument();
	expect(screen.getAllByText('00').length).toBe(1);
	expect(screen.getByText('32')).toBeInTheDocument();
});

xtest('time is passed as hours:min:sec:mili-sec', () => {
	timeProps.time = '12:13:32:34';
	render(<Time time={timeProps.time} />);

	expect(screen.getByText('12')).toBeInTheDocument();
	expect(screen.getByText('13')).toBeInTheDocument();
	expect(screen.getByText('32')).toBeInTheDocument();
});
