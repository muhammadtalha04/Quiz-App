import styled from "styled-components";
import { secondary } from "../../colors";

export const ContainerWrapper = styled.div`
    background: ${secondary};
    border-radius: 30px;
    padding: 40px;
    margin-bottom: 40px;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
`;

export const QuizStatsWrapper = styled.div`
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Width100 = styled.div`
    width: 100%;
    margin: 5px auto;
`;

