import React, { Component } from 'react';
import { Form, Input, Button, Checkbox ,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import login from '../../api/login'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  onFinish=(e)=>{
    console.log(e)
      login(e)
      .then(res=>{
        if(res.code){return message.error('用户名或密码错误')}
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
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href={ window.location.href }>
            忘记密码
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button ">
            登陆
          </Button>
          或者 <Link to="/user/reg">注册新用户</Link>
        </Form.Item>
      </Form>
    )
    
  }
}
 
export default Login;