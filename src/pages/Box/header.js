import React, { Component, Fragment } from 'react';
import {SearchOutlined,BellOutlined,UserOutlined,DownOutlined} from '@ant-design/icons';
import {Input,Badge,Avatar, Button , Menu, Dropdown } from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import actionsCreator from '../../store/actionsCerator'
import {withRouter} from 'react-router-dom';
import Root from '../../api/root'

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      BadgeCount:9,
    }
  }
  islogin=(name)=>{
    return (name!='未登录'?<Dropdown overlay={this.menu}>
    <a>
       {name} <DownOutlined />
     </a>
   </Dropdown>:<Button onClick={()=>{
                this.props.history.replace('/login')
    }}>登陆</Button>
  )}
  async componentDidMount() {
    let _id = localStorage.getItem('user_id')
    try{
      let {CHANGE_NAME,CHANGE_EMAIL,CHANGE_AVATORURL} = this.props
      // 获取用户id
      let token = localStorage.getItem('userToken')
      // 没有token直接结束
      if(!token || token == 'null'){return false}
      if(_id === '5e7df387a0d79a3538887dad'){return false}
      // 获取个人信息
      let result=await Root.findOne(_id)
      let {us,email,avatorUrl} = result.data
      // 改变全局状态
      CHANGE_NAME(us)
      CHANGE_EMAIL(email)
      CHANGE_AVATORURL(avatorUrl)
    }catch{
      
    }
  }
  menu=()=>{
    return (
      <Menu>
            <Menu.Item>
              <span onClick={this.quit}>
                退出登陆
              </span>
            </Menu.Item>
          </Menu>
    )
  }
  quit=()=>{
    this.props.history.replace('/login')
    localStorage.removeItem('user_id')
    localStorage.removeItem('userToken')
  }
  render() { 
    let {us:name} = this.props
    return ( 
      <Fragment>
        <div  style={{
          borderRadius:"50%",
          width:50,
          height:50,
          marginLeft:20,
          background:"url(/img/4334c6c0c6b16da2cdb7ec26920baaa5_121_121.jpg)",
          backgroundSize:"cover"
        }}></div> 
        <div style={{
            width:300,
            display:'flex',
            justifyContent:'space-between',
            marginRight:50,
            alignItems:'center'
          }}>
          
          <Input size="small" style={{width:150,borderRadius:10}} placeholder="输入关键字" prefix={<SearchOutlined  style={{fontSize:20}}/>} />
          <Badge count={this.state.BadgeCount}>
            <BellOutlined style={{fontSize:20}}/>
          </Badge>
          <Avatar size={30} icon={<UserOutlined />} />
          <span>{this.islogin(name)}</span>
          
        </div>
      </Fragment>
     );
  }
}
 
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionsCreator,dispatch)
})(withRouter(Header))