import styled from 'styled-components';
import { gradient_dark, gradient_light, secondary } from '../../colors';
import { Width } from '../../types';

interface ButtonProps {
    width: Width;
    gradient: boolean;
    margin?: boolean;
}

export const CustomButton = styled.button<ButtonProps>`
    width: ${props => props.width === "full" ? "100%" : props.width};
    border-radius: 20px;
    color: ${secondary};
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
    ${props => props.gradient === true ?
        `
            background: linear-gradient(to right, ${gradient_light}, ${gradient_dark});
            border-width: 0px;
            ${props.margin !== undefined && props.margin === true && 'margin: 0px 10px;'}
        ` :
        `
            background: transparent;
            border: 2px solid ${secondary};
            margin-left: 5px;
        `
    }
`;