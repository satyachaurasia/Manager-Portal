import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'formik'



const useStyles = makeStyles((theme) => ({
    textField: {
      width: '100%',
    },
  }));

function MaterialDate(props) {
    const classes = useStyles();
    const { label, name, ...rest} = props
    return (
        <div>
            <Field name={name}>
                {
                    ({field, form}) => {
                        return  <TextField
                                    error={form.errors[name] &&
                                        form.touched[name]}
                                    id={name}
                                    style={{margin:0}}
                                    label={label}
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                        }}
                                    {...rest} {...field}
                                    helperText={ form.errors[name] && form.touched[name] ? form.errors[name] : null }
                                />
                                
                    }
                }
            </Field>
            
            
        </div>
    )
}

export default MaterialDate
