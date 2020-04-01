import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { BarsOutlined} from '@ant-design/icons';
import listData from './listData'
import MyHeader from './header'
import  style from './index.module.less'
import {withRouter} from 'react-router-dom'

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;
class Box extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      // 侧边栏信息
      listData:listData
     }
  }
  handleClick=(e)=>{
    // 点解跳转对应的页面
    this.props.history.replace(e.item.props.path)
  }
  MenuRender=(list)=>{
    return list.map(item=>{
      if(item.children){
        return (
          <SubMenu
            key={item.key}
            path={item.path}
            title={
              <span>
                <BarsOutlined />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.MenuRender(item.children)}
          </SubMenu>
        )
      }else{
        return (
          <Menu.Item key={item.key} path={item.path}>
            <BarsOutlined />
            {item.title}
          </Menu.Item>
        )
      }
    })
  }
  componentDidMount() {
    let token = localStorage.getItem('userToken')
    if(!token || token === 'null'){
      this.props.history.replace('/login')
    }
  }
  
  render() { 
    return ( 
      <Layout style={{height:'100vh'}}>
         {/* 侧边栏 */}
      <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{height:'100vh'}}>
        <div style={{color:"#fff"}}>
          {/* logo */}
          <div style={{height:63,paddingTop:20,paddingLeft:30}}>
              网易严选后台管理
          </div>
          </div>
          {/* 按钮容器 */}
        <Menu  style={{ width: '100%',
              background:'#001529',
              color:'#ccc' 
              }} 
              mode="inline"
              theme="dark"
              onClick={this.handleClick}
          >  
          {this.MenuRender(this.state.listData)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* 头部 */}
        <Header className={"site-layout-background "+style.header} style={{ padding: 0 }}>
            <MyHeader></MyHeader>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '10px 16px',
            padding: 10,
            minHeight: 280,
          }}
        >
          {/* 内容来自Router组件*/}
          {this.props.children}
        </Content>
      </Layout>
    </Layout>
     );
  }
}
export default withRouter(Box)