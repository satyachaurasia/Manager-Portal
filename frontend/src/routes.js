import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';


const BaseRouter = () =>(
    <div>
        <Route exact path='/' component={Signup}/>
        <Route exact path='/log-in/' component={Login}/>
        <Route exact path='/employee/:page?' component={Dashboard}/>
    </div>
);

export default BaseRouter;