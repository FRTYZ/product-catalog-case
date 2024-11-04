// Material UI elements
import { 
    TextField, 
    InputLabel,
    MenuItem
} from '@mui/material';

export type SelectItemTypes = {
    id?: string,
    value?: string
}

interface XSelectProps {
    label?: string;
    name?: string;
    value?: string; 
    placeholder?: string;
    selectItems: SelectItemTypes[];
    hasError?: boolean;
    isFullWidth?: true | false;
    handleChange?:  any;
    [key: string]: any
}

const XSelectBox = ({label, name, value, selectItems , hasError, placeholder, isFullWidth, handleChange, ...rest }: XSelectProps) => {

    return (
        <>
            <TextField
                select
                fullWidth={isFullWidth}
                label={label}
                size='small'
                name={name}
                value={value}
                placeholder={placeholder}
                error={hasError ? Boolean(value == '' && hasError) : false}
                onChange={handleChange}
                {...rest}
            >
                {selectItems.length > 0 && selectItems.map((selectItem, key) => (
                    <MenuItem value={selectItem.id} key={key}>
                        {selectItem.value}
                    </MenuItem>
                ))}
            </TextField>
        </>
    )
}

export default XSelectBox