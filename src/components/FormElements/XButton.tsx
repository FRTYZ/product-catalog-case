import Button from '@mui/material/Button';
import { MouseEventHandler, ReactElement } from "react";

interface XButtonProps {
    text?: ReactElement | string;
    onClick?: MouseEventHandler;
    buttonSize?: "large" | "small";
    buttonDisabled?: boolean;
    [key: string]: any
}

function XButton({
    text, 
    onClick,
    buttonSize, 
    buttonDisabled,
    ...rest
}: XButtonProps) {
    return (
        <Button 
            variant='contained'
            disabled={buttonDisabled}
            onClick={onClick}
            size={buttonSize}
            {...rest}
        >{text}</Button>
    )
}

export default XButton