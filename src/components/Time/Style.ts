import styled from 'styled-components';
import { black } from '../../colors';

interface TimeProps {
    marginLeft: boolean;
    marginRight: boolean;
    morePadding: boolean;
}

export const TimeWrapper = styled.div`
    display: flex;
`;

export const TimeBlock = styled.div<TimeProps>`
    border-radius: 5px;
    padding: 10px ${props => props.morePadding === true ? "25" : "20"}px;
    ${props => props.marginLeft === true && 'margin-left: 10px;'}
    ${props => props.marginRight === true && 'margin-right: 10px;'}
    text-align: center;
    box-shadow: 0px 5px 10px ${black};
`;