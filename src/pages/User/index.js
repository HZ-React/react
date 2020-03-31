import React, { Component } from 'react';
import { Card, Table, Button, Modal, Input, notification, Spin,Popconfirm,message,Pagination,showQuickJumper } from 'antd';
import { PlusOutlined,UserOutlined,UnlockOutlined } from '@ant-design/icons';
import user from '../../api/user'
class User extends Component {
  state = {
    page:1,//页码数
    pageSize:2,//每页显示的条数
    list:[], //列表数据
    count:0, //总数量
    visible: false,
    spinning: false,
    columns: [
      {
        title: 'id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: '账号',
        dataIndex: 'us',
        key: 'us',
      },
      {
        title: '操作',
        key: 'action',

        //自定义渲染的列
        render: (h) => {
          console.log(h)
          return (
            <div>
              <Popconfirm
                title="你真的要删除吗 亲"
                onConfirm={()=>{
                  this.del(h._id)
                }}
                onCancel={()=>{
                  message.error('取消删除')
                }}
              >
                <Button type='danger' size='small'>删除</Button>
              </Popconfirm>

            </div>

          )
        }
      },

    ]
  }
  componentDidMount() {
    this.refreshlist()
  }
  //刷新数据
  refreshlist = async () => {
    let {page,pageSize}  = this.state
    this.setState({ spinning: true })
    let result = await user.userlist(page,pageSize)
    // let result = await user.userlist(page,pageSize)
    console.log(result)
    this.setState({  list: result.data, spinning: false })
    // if(code !==0){ return message.error(msg)}
    // this.setState({list,count,spinning: false})
  }
  handleOk = async () => {
    let us = this.refs.us.state.value
    let ps = this.refs.ps.state.value
    console.log(us, ps)
    let result = await user.useradd(us, ps)
    console.log('tianjia',result)
    if (result.code !== 0) { return notification.error({ description: '你添加失败了哟', message: '错误', duration: 2.5 }) }
    notification.success({ description: '你添加成功了哟', message: '成功', duration: 2.5 })
    this.setState({ visible: false })
    this.refreshlist()
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }
  del = async (_id) => {
    console.log('删除', _id)
    let result = await user.userdel(_id)
    console.log(result)
    if (result.code !== 0) { return false }
    this.refreshlist()
  }
//  //获取数据列表
//  getListData=async ()=>{
//    let result
//  }


  render() {
    let { columns, visible, spinning,list } = this.state
    return (
      <div className='userlist' >
        <Card title="用户管理">

          <Button type="primary" icon={<PlusOutlined />} onClick={() => {
            this.setState({ visible: true })
          }}>添加</Button>
          <Spin spinning={spinning}>
            <Table    dataSource={list} columns={columns} rowKey='_id'></Table>
            {/* <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={()=>{

            }} /> */}
          </Spin>

        </Card>
        {/* 添加模态框 */}
        <Modal
          title="用户添加"
          visible={visible}
          onOk={this.handleOk}
          // confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          账号: <Input prefix={<UserOutlined />} type='text' ref='us'></Input>
          密码: <Input prefix={<UnlockOutlined />} type='text' ref='ps'></Input>
        </Modal>
      </div>

    );
  }
}

export default User;