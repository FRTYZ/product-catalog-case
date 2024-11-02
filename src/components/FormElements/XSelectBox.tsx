// Material UI elements
import { 
    TextField, 
    InputLabel,
    MenuItem
} from '@mui/material';

type XSelectProps = {
    label?: string, 
    name?: string, 
    value?: string, 
    selectItems: {
        id?: string,
        value?: string
    }[], 
    hasError?: boolean, 
    handleFormik?: any, 
    [key: string]: any
}

export const XSelectBox = ({label, name, value, selectItems , hasError, handleFormik, ...rest }: XSelectProps) => {

    return (
        <>
            <InputLabel shrink>{label}</InputLabel>
            <TextField
                select
                fullWidth
                size='small'
                name={name}
                value={value}
                error={hasError ? Boolean(value == '' && hasError) : false}
                onChange={handleFormik.handleChange}
                {...rest}
            >
                <MenuItem value="0">Choose</MenuItem>
                {selectItems.length > 0 && selectItems.map((selectItem, key) => (
                    <MenuItem value={selectItem.id} key={key}>
                        {selectItem.value}
                    </MenuItem>
                ))}
            </TextField>
        </>
    )
}