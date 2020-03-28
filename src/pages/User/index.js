import React, { Component } from 'react';
import { Card, Table,Button,Modal,Input,notification,Spin} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import user from '../../api/user'
class User extends Component {
  state = { 
    visible:false,
    spinning:false,
    dataSource:[],
    columns:[
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
        render:(h)=>{
          console.log(h)
          return(
            <Button type='danger' size='small' onClick={()=>{
             this.del(h._id)
            }}>删除</Button>
          )
        }
      },

    ]
   }
   componentDidMount(){
      this.refreshlist()
   }
   //刷新数据
   refreshlist= async()=>{
     this.setState({spinning:true})
    let result=await user.userlist()
    console.log(result)
    this.setState({dataSource:result.data,spinning:false})
   }
    handleOk= async()=>{
     let us=this.refs.us.state.value
     let ps=this.refs.ps.state.value
     console.log(us,ps)
     let result=await user.useradd(us,ps)
     console.log(result)
     if(result.code!==0){ return notification.error({description:'你添加失败了哟',message:'错误',duration:2.5})}
     notification.success({description:'你添加成功了哟',message:'成功',duration:2.5})
     this.setState({visible:false})
     this.refreshlist()
   }
   handleCancel=()=>{
    this.setState({visible:false})
   }
   del= async (_id)=>{
    console.log('删除',_id)
     let result=await user.userdel(_id)
     console.log(result)
     if(result.code!==0){return false}
     this.refreshlist()
   }



  render() { 
    let {dataSource,columns,visible,spinning} = this.state
    return ( 
      <div className='userlist' >
         <Card title="这里是用户管理">

            <Button type="primary" icon={<PlusOutlined />} onClick={()=>{
              this.setState({visible:true})
            }}>添加</Button>
            <Spin spinning={spinning}>
             <Table dataSource={dataSource} columns={columns} rowKey='_id'></Table>
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
         账号: <Input type='text' ref='us'></Input>
         密码: <Input type='text' ref='ps'></Input>
        </Modal>
      </div>
     
     );
  }
}

export default User;