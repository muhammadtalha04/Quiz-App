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

const Option: React.FC<OptionProps> = ({ text, optInd, optNo, selected, saveOption }) => {
    return (
        <OptionWrapper selected={selected} onClick={() => saveOption(optInd)}>
            <Opt selected={selected}>{`${optNo} .`}</Opt>
            {
                selected === true ?
                    (<Text text={text} fontWeight="bold" margin={0} color={secondary} />) :
                    (<Text text={text} fontWeight="bold" margin={0} />)
            }
        </OptionWrapper>
    );
}

export default Option;