import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width:'100%',
    },
    title: {
      flexGrow: 1,
    },
  }));

const Header = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                      Manager Portal
                  </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
