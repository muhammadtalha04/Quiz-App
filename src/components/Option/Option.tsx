import React from 'react';
import { secondary } from '../../colors';
import Text from '../Text/Text';
import { Opt, OptionWrapper } from './Style';

interface OptionProps {
    text: string;
    optInd: number;
    optNo: string;
    selected: boolean;
    saveOption: (option: number) => void;
}

const Option: React.FC<OptionProps> = (props: OptionProps) => {
    return (
        <OptionWrapper selected={props.selected} onClick={() => props.saveOption(props.optInd)}>
            <Opt selected={props.selected}>{`${props.optNo} .`}</Opt>
            {
                props.selected === true ?
                    (<Text text={props.text} fontWeight="bold" margin={0} color={secondary} />) :
                    (<Text text={props.text} fontWeight="bold" margin={0} />)
            }

        </OptionWrapper>
    );
}

export default Option;