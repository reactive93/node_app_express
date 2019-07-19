import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from './components/layout/Landing';
import NavBar from './components/layout/NavBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
const App = ()=> {
  return (
    <BrowserRouter>
      <Fragment>
        <NavBar />
        <Route exact path="/" component = {Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component = {Register} />
            <Route exact path="/login" component = {Login} />
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
