import React from 'react'
import {Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MaterialDialog from './MaterialDialog';
import { withRouter } from "react-router-dom";

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop:'3rem',
    }
}));




function Signup(props) {  
    
    const initialValues = {
        email:'',
        first_name:'',
        last_name:'',
        password:'',
        address:'',
        dob:'',
        company:''
    }
    
    const validationSchema = Yup.object({
        email: Yup.string().email().required('Required'),
        first_name: Yup.string().required('Required'),
        last_name: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        address : Yup.string().required('Required'),
        dob : Yup.date().required('Required'),
        company: Yup.string().required('Required')
    })

    const onSubmit = (values, onSubmitProps) => {
       axios.post('http://127.0.0.1:8000/manager-register/', {
           ...values
       })
       .then((response) =>{
            setOpen(true);
            onSubmitProps.resetForm()

            setTimeout(function(){
                props.history.push("/log-in/");
            }, 3000);


       }, (error) => {
           alert("Something went wrong check console")
           console.log(error.response.data);
           console.log(error)
       })
       
    }

    const [open, setOpen] = React.useState(false);



    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={2} sm={4} />
                
                <Grid item xs={8} sm={4} container>
                   <Formik
                    initialValues={initialValues}
                    validationSchema = {validationSchema}
                    onSubmit={onSubmit}
                   >
                       {
                           formik => (
                                <Form>
                                    <Grid container spacing={2}>
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
                                                type='password'
                                                label='Password'
                                                name='password'
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <FormikControl 
                                                control='input'
                                                type='text'
                                                label='First Name'
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

                                        <Grid item xs={12} md={6}>
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
                                                label='Company'
                                                name='company'
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <FormikControl 
                                                control='date'
                                                label='Date of Birth'
                                                name='dob'
                                            />
                                        </Grid>



                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" type="submit">
                                                Sign Up
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                           )
                       }

                   </Formik>

                </Grid>

                <Grid item xs={2} sm={4} />

            </Grid>
            
            <MaterialDialog open={open} 
                setOpen={setOpen} 
                title="User Registered Successfully" 
                content="Shortly, you'll be taken to login page"
            />
        </div>
    )
}

export default withRouter(Signup)
