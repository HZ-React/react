import React, { Component } from 'react';
import {Route,HashRouter} from 'react-router-dom'
import Box from '../pages/Box'
import Login from '../pages/Login'
class Router extends Component {
  state = {  }
  render() { 
    return ( 
      <HashRouter>
        <Route path="/login" component={Login}></Route>
        <Route path="/Box" component={Box}></Route>
      </HashRouter>
     );
  }
}
 
export default Router;