import React from 'react'
import { Field } from 'formik'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';



function MaterialInput(props) {
    const { label, name, ...rest} = props
    return (
        <div>
            <Field name={name}>
                {
                    ({field, form}) =>{
                        return <FormControl fullWidth error={form.errors[name] &&
                            form.touched[name]}>
                            <InputLabel htmlFor={name}>{label}</InputLabel>
                            <Input
                                id={name}
                                {...rest}
                                {...field}
                            />
                            {form.errors[name] && form.touched[name] &&
                                <FormHelperText>{form.errors[name]}</FormHelperText> }
                            
                        </FormControl>
                        
                    }
                }

            </Field>
        </div>
    )
}

export default MaterialInput
