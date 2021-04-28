import React, { Fragment, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { QuizState } from '../../types';
import { TimeBlock, TimeWrapper } from './Style';
import Text from '../Text/Text';
import { Hours, Minutes, Seconds } from '../../constants';

// FUNCTIONS
const makeTimeBlock = (timeTaken: string) => {
    const [hours, minutes, seconds] = timeTaken.split(" : ");

    return (
        <TimeWrapper>
            {/* HOURS */}
            <TimeBlock marginLeft={false} marginRight={true} morePadding={true}>
                {/* Time */}
                <Text text={hours} fontWeight="bold" fontSize={18} />
                {/* Heading */}
                <Text text={Hours} fontWeight="normal" fontSize={10} />
            </TimeBlock>

            {/* MINUTES */}
            <TimeBlock marginLeft={true} marginRight={true} morePadding={false}>
                {/* Time */}
                <Text text={minutes} fontWeight="bold" fontSize={18} />
                {/* Heading */}
                <Text text={Minutes} fontWeight="normal" fontSize={10} />
            </TimeBlock>

            {/* SECONDS */}
            <TimeBlock marginLeft={true} marginRight={false} morePadding={false}>
                {/* Time */}
                <Text text={seconds} fontWeight="bold" fontSize={18} />
                {/* Heading */}
                <Text text={Seconds} fontWeight="normal" fontSize={10} />
            </TimeBlock>
        </TimeWrapper>
    );
}

// COMPONENT
const Time: React.FC = () => {
    const quiz: QuizState = useSelector((state: RootState) => state.quiz);

    const renderTime = useMemo(() => {
        return makeTimeBlock(quiz.timeTaken);
    }, [quiz.timeTaken]);

    return (
        <Fragment>
            {renderTime}
        </Fragment>
    );
}

export default Time;