import React, { Component } from 'react';
import { Card, Table, Button, Modal, Input,Popconfirm ,message,notification} from 'antd';
import Ad from '../../api/ad'
// import { List } from 'antd/lib/form/Form';
import { PlusOutlined, GithubOutlined, FileImageOutlined, BranchesOutlined, FileZipOutlined } from '@ant-design/icons';

class Advertisement extends Component {
    state = {
        visible: false,
        page: 1,
        pageSize: 2,
        list: [],
        columns: [
            
            {
                title: 'id',
                dataIndex: '_id',
                key: '_id',
                width:200,
                textWrap: 'word-break',
                ellipsis: true
            },
            {
                title: '图片名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '图片地址',
                dataIndex: 'address',
                key: 'address',
                width:200,
                textWrap: 'word-break',
                ellipsis: true
            },
            {
                title: '缩略图',
                dataIndex: 'address',
                key: 'address',
                render(address) {
                    return (<img width='100' height='60' src={address}/>)
                }
            },
            {
                title: '跳转地址',
                dataIndex: 'jump',
                key: 'jump',
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '操作',
                dataIndex: 'action',
                //自定义渲染的列
                render: (h) => {
                    console.log(h)
                    return (
                        <div>
                            <Popconfirm
                                title="你真的要删除吗 亲"
                                onConfirm={() => {
                                    // this.del(h._id)
                                }}
                                onCancel={() => {
                                    message.error('取消删除')
                                }}
                            >
                                <Button type='danger' size='small'>删除</Button>
                            </Popconfirm>
                            <Popconfirm
                                title="你真的要删除吗 亲"
                                onConfirm={() => {
                                    // this.del(h._id)
                                }}
                                onCancel={() => {
                                    message.error('取消删除')
                                }}
                            >
                                <Button ghost  size='small'>修改</Button>
                            </Popconfirm>

                        </div>

                    )
                }
            }
        ]

    }
    componentDidMount() {
        this.getListData()
    }
    getListData = async () => {
        let { page, pageSize } = this.state
        let { code, mes, data } = await Ad.adList(page, pageSize)

        if (code !== 0) { return false }
        this.setState({ list: data })
    }
    handleOk = async () => {
        let name = this.refs.name.state.value
        let address = this.refs.address.state.value
        let jump = this.refs.jump.state.value
        let type = this.refs.type.state.value
        console.log(name, address,jump,type)
        let result = await Ad.adAdd(name, address,jump,type)
        console.log('添加',result)
        if (result.err !== 0) { return notification.error({ description: '你添加失败了哟', message: '错误', duration: 2.5 }) }
        notification.success({ description: '你添加成功了哟', message: '成功', duration: 2.5 })
        this.setState({ visible: false })
        // this.refreshlist()
    }
    handleCancel = () => {
        this.setState({ visible: false })
    }
     //刷新数据
  refreshlist = async () => {
    // let {page,pageSize}  = this.state
    this.setState({ spinning: true })
    // let result = await user.userlist(page,pageSize)
    // let result = await user.userlist(page,pageSize)
    // console.log(result)
    // this.setState({  list: result.data, spinning: false })
    // if(code !==0){ return message.error(msg)}
    // this.setState({list,count,spinning: false})
  }
    render() {
        let { columns, list, visible } = this.state
        return (
            <div>
                <Card title='广告管理'>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => {
                        this.setState({ visible: true })
                    }}>添加</Button>
                    <Table columns={columns} dataSource={list} rowKey='_id'></Table>
                </Card>
                {/* 添加模态框 */}
                <Modal
                    title="用户添加"
                    visible={visible}
                    onOk={this.handleOk}
                    // // confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    图片名称: <Input prefix={<GithubOutlined />} type='text' ref='name'></Input>
                    图片地址: <Input prefix={<FileImageOutlined />} type='text' ref='address'></Input>
                    跳转地址: <Input prefix={<BranchesOutlined />} type='text' ref='jump'></Input>
                    类型: <Input prefix={<FileZipOutlined />} type='text' ref='type'></Input>
                </Modal>
            </div>
        )
    }
}
export default Advertisement