import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    margin: 30px 2%;
`;

export const Cols = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Rows = styled.div`
    display: flex;
    flex-direction: column;
`;

const Width100 = styled.div`
    width: 100%;
`;

export const LeftAlign = styled(Width100)`
    text-align: left;
`;

export const CenterAlign = styled(Width100)``;

export const RightAlign = styled(Width100)`
    display: flex;
    justify-content: flex-end;
`;