import Button from '@mui/material/Button';
import { MouseEventHandler } from "react";

interface XButtonProps {
    text?: string;
    onClick: MouseEventHandler;
    buttonSize?: "large" | "small";
    buttonDisabled?: boolean;
    [key: string]: any
}

export function XButton({
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