import React from 'react'
import {Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop:'3rem',
    }
}));


function Login(props) {  
    
    const initialValues = {
        email:'',
        password:'',
    }
    
    const validationSchema = Yup.object({
        email: Yup.string().email().required('Required'),
        password: Yup.string().required('Required')
    })

    const onSubmit = (values, onSubmitProps) => {
        axios.post('http://127.0.0.1:8000/token/', {
            ...values
        }, {withCredentials: true})
        .then((response) =>{
            onSubmitProps.resetForm()
            props.history.push("/employee/1");
        }, (error) => {
            alert(error.response.data.detail)
            console.log(error.response.data.detail);
            console.log(error)
        })
        
     }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={2} sm={4} />
                
                <Grid item xs={8} sm={3} container>
                   <Formik
                    initialValues={initialValues}
                    validationSchema = {validationSchema}
                    onSubmit={onSubmit}
                   >
                       {
                           formik => (
                                <Form>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <FormikControl 
                                                control='input'
                                                type='text'
                                                label='Email'
                                                name='email'
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikControl 
                                                control='input'
                                                type='password'
                                                label='Password'
                                                name='password'
                                            />
                                        </Grid>

                                        
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" type="submit">
                                                Log in
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
            
        </div>
    )
}

export default withRouter(Login)
