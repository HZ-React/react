import React, { Component } from 'react';
import {Route,HashRouter} from 'react-router-dom'
import Box from '../pages/Box'
import Login from '../pages/Login'
import Root from '../pages/Root'
class Router extends Component {
  state = {  }
  render() { 
    return ( 
      <HashRouter>
        <Route path="/login" component={Login}></Route>
        <Route path="/box" render={()=>{
          return (
            <Box>
              {/* box组件内容区显示的组件,通过props.children传递 */}
               <Route path="/box/root" component={Root}></Route>
            </Box>
          )
        }}>
          
        </Route>
      </HashRouter>
     );
  }
}
 
export default Router;