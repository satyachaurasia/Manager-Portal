import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EmployeeForm from './EmployeeForm';
import Pagination from '@material-ui/lab/Pagination';
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom"

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginTop:'3rem',
    },
    card :{
        height:'100%'
    }
  });


function Dashboard(props) {

    const [employee, setEmployee] = useState([])
    const [updateEmployee, setUpdateEmployee] = useState(null)
    const [count, setCount] = useState(0)
    const classes = useStyles();

    const { page } = useParams();

    console.log(page)

    const fetchData = () =>{
        const url = page ? `http://127.0.0.1:8000/employee/?page=${page}` : 'http://127.0.0.1:8000/employee/'
        axios.get(url, {withCredentials: true})
        .then(res => {
            setEmployee(res.data.results)
            setCount(res.data.count/8>>0)
        })
        .catch(err => {
            if(err.response.status === 401){
                alert("Token expired")
                setTimeout(function(){
                    props.history.push("/log-in/");
                }, 3000);
            }
            alert("Something went wrong check console")
            console.log(err)
        })
    }

    const isInitialMount = useRef(true);

    useEffect(() =>{
        fetchData();
    },[page])

    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current = false;
        }
        else{
            setOpen(true)
        }
        
    }, [updateEmployee])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setUpdateEmployee(null);
        setOpen(true)
    };

    const handleUpdate = (empID) => {

        axios.get(`http://127.0.0.1:8000/employee/${empID}`, {withCredentials: true})
        .then(res => {
            setUpdateEmployee(res.data)
        })
        .catch(err => {
            if(err.response.status === 401){
                props.history.push("/log-in/");
            }
            alert("Something went wrong check console")
            console.log(err)
        })
    }

    const handleDelete = (empID) =>{
        axios.delete(`http://127.0.0.1:8000/employee/${empID}`, {withCredentials: true})
        .then(res => {
            fetchData();
        })
        .catch(err => {
            if(err.response.status === 401){
                props.history.push("/log-in/");
            }
            alert("Something went wrong check console")
            console.log(err)
        })

        
    }

    const handleChange = (event, value) => {
        props.history.push(`/employee/${value}`);
    };
    

    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={2} />
                <Grid item xs={8} container spacing={2}>
                    <Grid item xs={12} style={{marginBottom:'1rem'}}>
                        <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>Create a new Employee</Button>
                    </Grid>
                    { employee.map(emp =>(
                        <Grid item xs={12} sm={3} key={emp.id}>
                            <Card variant="outlined" className={classes.card}>
                                <CardContent>
                                    <Typography variant="body1" component="h1">
                                        {emp.employee_id }
                                    </Typography>
                                    <Typography variant="body1" component="h1">
                                        {emp.email}
                                    </Typography>
                                    <Typography variant="body1" component="h1">
                                        {emp.first_name} {emp.last_name}
                                    </Typography>
                                    <Typography variant="body1" component="h1">
                                        {emp.address}
                                    </Typography>

                                    <Typography variant="body1" component="h1">
                                        {emp.dob}
                                    </Typography>

                                    <Typography variant="body1" component="h1">
                                        {emp.company}
                                    </Typography>

                                    <Typography variant="body1" component="h1">
                                        {emp.mobile}
                                    </Typography>

                                    <Typography variant="body1" component="h1">
                                        {emp.city}
                                    </Typography>
                                        
                                </CardContent>
                                <CardActions>
                                    <Button size="small" variant="contained" color="secondary" onClick={()=>handleDelete(emp.id)} name={emp.id}>DELETE</Button>
                                    <Button size="small" variant="contained" color="primary" onClick={()=> handleUpdate(emp.id)}>UPDATE</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                    }
                    <Grid item xs={12} justify="center" alignItems="center" container>
                        <Pagination count={count ? count : 1} color="secondary" page={parseInt(page)} onChange={handleChange}/>
                    </Grid>
                </Grid>

                <Grid item xs={2} />
                
            </Grid>

            <EmployeeForm open={open} 
                setOpen={setOpen}
                fetchData = {fetchData}
                updateEmployee = {updateEmployee}
            />
            
        </div>
    )
}

export default withRouter(Dashboard)
