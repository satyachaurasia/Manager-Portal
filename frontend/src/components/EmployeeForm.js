import React from 'react'
import ReactDOM from 'react-dom'
import {Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'



  




function EmployeeForm(props) {

    const initialValues = {
        employee_id:'',
        email:'',
        first_name:'',
        last_name:'',
        address:'',
        dob:'',
        company:'',
        mobile:'',
        city:'',
    }

    const phoneRegExp = /^[6-9]\d{9}$/
    
    const validationSchema = Yup.object({
        employee_id: Yup.string().required('Required'),
        email: Yup.string().email().required('Required'),
        first_name: Yup.string().required('Required'),
        last_name: Yup.string().required('Required'),
        address : Yup.string().required('Required'),
        dob : Yup.date().required('Required'),
        company: Yup.string().required('Required'),
        city:Yup.string().required('Required'),
        mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required')

    })

    const {open, setOpen, fetchData, updateEmployee } = props

    const handleClose = () => {
        setOpen(false);
    };


    const onSubmit = (values,onSubmitProps) => {
        
        updateEmployee ?
                axios.patch(`http://127.0.0.1:8000/employee/${updateEmployee.id}/`,{
                    ...values
                }, {withCredentials: true})
                .then((response) => {
                    onSubmitProps.resetForm()
                    setOpen(false);
                    fetchData()
                }, (error) =>{
                    alert("Something went wrong check console")
                    console.log(error.response.data);
                    console.log(error)
                })
                :
                axios.post('http://127.0.0.1:8000/employee/', {
                    ...values
                },{withCredentials: true})
                .then((response) =>{
                    onSubmitProps.resetForm()
                    setOpen(false);
                    fetchData()       
                }, (error) => {
                    alert("Something went wrong check console")
                    console.log(error.response.data);
                    console.log(error)
                })
            
    }

    return ReactDOM.createPortal(
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Employee Registeration</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={updateEmployee ? updateEmployee : initialValues}
                            validationSchema = {validationSchema}
                            onSubmit={onSubmit}
                        >
                            {
                                formik =>(
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <FormikControl 
                                                    control='input'
                                                    type='text'
                                                    label='Employee ID'
                                                    name='employee_id'
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikControl 
                                                    control='input'
                                                    type='text'
                                                    label='Email'
                                                    name='email'
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikControl 
                                                    control='input'
                                                    type='text'
                                                    label='First name'
                                                    name='first_name'
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikControl 
                                                    control='input'
                                                    type='text'
                                                    label='Last Name'
                                                    name='last_name'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormikControl 
                                                    control='input'
                                                    type='text'
                                                    multiline
                                                    label='Address'
                                                    name='address'
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikControl 
                                                    control='input'
                                                    type='text'
                                                    multiline
                                                    label='City'
                                                    name='city'
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikControl 
                                                    control='date'
                                                    label='Date of Birth'
                                                    name='dob'
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <FormikControl 
                                                    control='input'
                                                    type='text'
                                                    label='Company'
                                                    name='company'
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <FormikControl 
                                                    control='input'
                                                    type='text'
                                                    label='Mobile Number'
                                                    name='mobile'
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6} container>
                                                <Grid item xs={6}>
                                                    <Button variant="contained" onClick={handleClose} color="secondary">
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Button variant="contained" type="submit" color="primary">
                                                        Submit
                                                    </Button>
                                                </Grid>
                                                
                                            </Grid>
                                            
                                        </Grid>
                                    </Form>
                                )
                            } 
                        </Formik>
                    </DialogContent>
            </Dialog>
            
        </div>,
        document.getElementById('portal-root')
    )
}

export default EmployeeForm
