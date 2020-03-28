import React, { Component, Fragment } from 'react';
import {SearchOutlined,BellOutlined,UserOutlined} from '@ant-design/icons';
import {Input,Badge,Avatar } from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import actionsCreator from '../../store/actionsCerator'
class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      BadgeCount:9,
    }
  }
  render() { 
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
        <span>{this.props.name}</span>
        </div>
      </Fragment>
     );
  }
}
 
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionsCreator,dispatch)
})(Header);