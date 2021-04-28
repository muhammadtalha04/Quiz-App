import styled from 'styled-components';
import { blue, secondary } from '../../colors';

interface PaginationItemProps {
    checked: boolean;
}

export const PaginationWrapper = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center
`;

export const PaginationItem = styled.span<PaginationItemProps>`
    color: ${secondary};
    border: 2px solid ${secondary};
    border-radius: 50%;
    padding: ${props => props.checked === true ? "11px 12px" : "10px 15px"};
    font-weight: bold;
    cursor: default;
    margin: 0px 5px;
`;

export const ActivePaginationItem = styled(PaginationItem)`
    color: ${blue};
    background: ${secondary};
`;