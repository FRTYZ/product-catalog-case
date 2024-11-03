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
    selectItems: SelectItemTypes[];
    hasError?: boolean;
    isFullWidth?: true | false;
    handleChange?:  any;
    [key: string]: any
}

const XSelectBox = ({label, name, value, selectItems , hasError, isFullWidth, handleChange, ...rest }: XSelectProps) => {

    return (
        <>
            <InputLabel shrink>{label}</InputLabel>
            <TextField
                select
                fullWidth={isFullWidth}
                size='small'
                name={name}
                value={value}
                error={hasError ? Boolean(value == '' && hasError) : false}
                onChange={handleChange}
                {...rest}
            >
                <MenuItem value="0">Seç</MenuItem>
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