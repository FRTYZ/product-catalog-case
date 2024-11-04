import { 
    TextField, 
    InputAdornment,
    InputLabel
} from '@mui/material';

type XInputProps = {
    type: string,
    label: string,
    name?: string,
    value?: string | number,
    placeholder: string,
    hasError?: string,
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    [key: string]: any
}

const XInput  = ({
    type = 'text', 
    label, 
    name, 
    value, 
    placeholder, 
    hasError, 
    handleChange, 
    ...rest
}:XInputProps ) => {

    return (
        <>
            <InputLabel shrink>{label}</InputLabel>
            <TextField
                type={type}
                fullWidth
                name={name}
                placeholder={placeholder ? placeholder : ''}
                value={value}
                error={hasError ? true : false}
                onChange={handleChange}
                InputProps={type == 'email' ? {
                    endAdornment: (
                      <InputAdornment position="end">
                            @
                      </InputAdornment>
                    ),
                }: {}
                }
                {...rest}
            />
        </>       
    )
}

export default XInput