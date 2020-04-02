import React, { Component } from 'react';
import {Route,HashRouter,Redirect} from 'react-router-dom'
import loading from '../utils/loadLabe'

// 路由懒加载
const Box = loading(()=>import('../pages/Box'))
const Login = loading(()=>import('../pages/Login'))
const Root = loading(()=>import('../pages/Root'))
const Goodsupdate = loading(()=>import('../pages/Goods/goodsupdate'))
const Goodsadd = loading(()=>import('../pages/Goods/goodsadd'))
const User = loading(()=>import('../pages/User'))
const ClassifyUpdate = loading(()=>import('../pages/Classify/ClssifyUpdate/index.js'))
const ClssifyAdd = loading(()=>import('../pages/Classify/ClassifyAdd/index.js'))
const Sort = loading(()=>import('../pages/Classify/Sort/sort'))
const Ad = loading(()=>import('../pages/Ad/index'))
const Mysetting = loading(()=>import('../pages/Mysetting'))
const GoodsList = loading(()=>import('../pages/Goods/goodslist'))

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


               <Route path="/box/classifylist" component={Sort}></Route>
               <Route path="/box/classifyadd" component={ClssifyAdd}></Route>
               <Route path="/box/classifyupdate" component={ClassifyUpdate}></Route>

               <Route path="/box/mysetting" component={Mysetting}></Route>

               <Route path="/box/goodskind" component={Sort}></Route>
               <Route path="/box/advertisement" component={Ad}></Route>
               <Redirect from="/box" to="/box/root" />
            </Box>
          )
        }}>
          
        </Route>
        <Redirect from="/" to="/login" />
      </HashRouter>
     );
  }
}

export default Router;