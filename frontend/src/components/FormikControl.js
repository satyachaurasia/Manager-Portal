import React from 'react'
import MaterialDate from './MaterialDate'
import MaterialInput from './MaterialInput'

function FormikControl(props) {
    const { control, ...rest } = props
    switch(control){
        case 'input':
            return <MaterialInput {...rest} />
        case 'select':
        case 'radio':
        case 'checkbox':
        case 'date':
            return <MaterialDate {...rest} />
        case 'switch':
        default: return null
    }
}

export default FormikControl
