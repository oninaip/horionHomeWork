import React, { Component } from 'react';
import './css/styles.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './components/Main';
import {Login} from './components/Login';
import {Registration} from './components/Registration';
import Thank from './components/Thank';
import {Edit} from './components/Edit';
import {ReminderList} from './components/ReminderList';
class App extends Component {
  
  render() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route  path="/Login" component={Login}/>
                <Route  path="/Registration" component={Registration}/>
                <Route  path="/Thank" component={Thank}/>
                <Route  path="/ReminderList" component={ReminderList}/>
                <Route  path="/Edit" component={Edit}/>
            </Switch>
            
        </Router>
    );
  }
}

export default App;
