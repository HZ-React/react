import React, { Component } from 'react';
import {Route,HashRouter,Redirect} from 'react-router-dom'
import Box from '../pages/Box'
import Login from '../pages/Login'
import Root from '../pages/Root'

import GoodsList from '../pages/Goods/goodslist'
import Goodsupdate from '../pages/Goods/goodsupdate'
import Goodsadd from '../pages/Goods/goodsadd'
import User from '../pages/User'

import Sort from '../pages/Classify/sort'//商品分类

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

               <Route path="/box/user" component={User}></Route>
               <Route path="/box/goodslist" component={GoodsList}></Route>
               <Route path="/box/goodsupdate" component={Goodsupdate}></Route>
               <Route path="/box/goodsadd" component={Goodsadd}></Route>

               <Route path="/box/goodskind" component={Sort}></Route>
            </Box>
          )
        }}>
          
        </Route>
        {/* <Redirect from="/" to="/login" /> */}
      </HashRouter>
     );
  }
}

export default Router;