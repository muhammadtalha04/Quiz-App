import React, { Fragment, useMemo } from 'react';
import { TimeBlock, TimeWrapper } from './Style';
import Text from '../Text/Text';
import { Hours, Minutes, Seconds } from '../../constants';

const makeTimeBlock = (time: string) => {
	const [hours, minutes, seconds] = time.split(' : ');

	return (
		<TimeWrapper>
			{/* HOURS */}
			<TimeBlock marginLeft={false} marginRight={true} morePadding={true}>
				{/* Time */}
				<Text text={hours} fontWeight='bold' fontSize={18} />
				{/* Heading */}
				<Text text={Hours} fontWeight='normal' fontSize={10} />
			</TimeBlock>

			{/* MINUTES */}
			<TimeBlock marginLeft={true} marginRight={true} morePadding={false}>
				{/* Time */}
				<Text text={minutes} fontWeight='bold' fontSize={18} />
				{/* Heading */}
				<Text text={Minutes} fontWeight='normal' fontSize={10} />
			</TimeBlock>

			{/* SECONDS */}
			<TimeBlock marginLeft={true} marginRight={false} morePadding={false}>
				{/* Time */}
				<Text text={seconds} fontWeight='bold' fontSize={18} />
				{/* Heading */}
				<Text text={Seconds} fontWeight='normal' fontSize={10} />
			</TimeBlock>
		</TimeWrapper>
	);
};

interface TimeProps {
	time: string;
}

const Time: React.FC<TimeProps> = ({ time }) => {
	const renderTime = useMemo(() => {
		return makeTimeBlock(time);
	}, [time]);

	return <Fragment>{renderTime}</Fragment>;
};

export default Time;
