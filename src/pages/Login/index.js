import React, { Component } from 'react';
import { Form, Input, Button ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import login from '../../api/login'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import actionsCreator from '../../store/actionsCerator'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  onFinish=(e)=>{
    let {CHANGE_NAME,CHANGE_EMAIL,CHANGE_AVATORURL,CHANGE__ID} = this.props
    // 登陆
      login(e)
      .then(res=>{
        // 登陆失败不跳转
        if(res.code){return message.error('用户名或密码错误')}
        // 成功跳转
        localStorage.setItem('userToken',res.token)
        CHANGE_NAME(res.data.us)
        CHANGE_EMAIL(res.data.email)
        CHANGE_AVATORURL(res.data.avatorUrl)
        CHANGE__ID(res.data._id)
        console.log(this.props)
        this.props.history.push('/box')
      })
  }
  render() {
    return (
      <Form
        name="normal_login"
        className="login-form "
        initialValues={{
          remember: true,
        }}
        style={{textAlign:"center",paddingTop:"10%"}}
        onFinish={this.onFinish}
      >
        {/* 用户名 */}
        <Form.Item
          name="us"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
            {min:2,message:'用户名不得少于2位'},
            {max:8,message:'用户名不得超过8位'}
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} style={{width:400,height:40}} placeholder="用户名" />
        </Form.Item>
        {/* 密码 */}
        <Form.Item
          name="ps"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
            style={{width:400,height:40}}
          />
        </Form.Item>
        {/* 记住密码 */}
        <Form.Item>
          <input type="checkbox" ref="checkbox"/> 记住密码
        </Form.Item>
          {/* 登录按钮 */}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button ">
            登陆
          </Button>
          {/* 跳转注册页 */}
        </Form.Item>
      </Form>
    )
    
  }
}
 
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(actionsCreator,dispatch)
})(Login);