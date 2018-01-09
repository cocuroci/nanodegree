import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import CreateContact from './CreateContact';

const Routers = () => (
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/create' component={CreateContact} />
        </div>
    </BrowserRouter>
)

export default Routers;