import React, { Component } from 'react';
import { Card, Table ,Spin,Popconfirm,Button,message,Modal,notification,Input} from 'antd';
import { PlusCircleOutlined ,UserOutlined,LockOutlined} from '@ant-design/icons';
import rootApi from '../../api/root.js'
import style from './index.module.less'
class Root extends Component {
  state = { 
    dataSource:[],//表单里的值
    visible:false,
    spinning:false,
    us:'',
    ps:'',
    columns:[//分类
      {
        title:'id',
        dataIndex:'_id',
        key:'id'
      },
      {
        title:'管理员',
        dataIndex:'us',
        key:'us',
      },
      {
        title:'操作',
        key:'action',
        render:(record)=>{
          return(
            <div>
              {/* 模态框 */}
              <Popconfirm
              placement='top'
              title='你确定要删除这个账号吗'
              onConfirm={() => {
                this.del(record._id)
            }}
            onCancel={() => {
                message.error('取消')
            }
            }>
                <Button type='danger' small='samll'>删除</Button>
              </Popconfirm>
            </div>
          )
        }
      }
    ],
   }

  handleCancel=()=>{//点击取消关闭气泡框
    this.setState({visible:false})
  }

  refreshList=async()=>{//刷新页面
    let result = await rootApi.list()
    this.setState({ dataSource: result.data})//将请求到的数据渲染到页面上
}

  del=async(_id)=>{//删除
    let token=localStorage.getItem("userToken")
    let result=await rootApi.del(_id,token)
    console.log(result)
    this.refreshList()
    switch (result.code) {
      case 0:
        return notification.error({description:'管理员删除失败，请详细检查传输',message:'错误',duration:1.5})
        break;
     case -998:
        return notification.error({description:'权限不足',message:'错误',duration:1.5})
        break;
      case -997:
        return notification.error({description:'token缺失',message:'错误',duration:1.5})
        break;
      case -1:
          return notification.error({description:'删除失败',message:'错误',duration:1.5})
          break; 
      default:
       return notification.success({description:'管理员删除ok，模态框即将关闭',message:'成功',duration:1.5})
       break;
    }
  }

  handleOk=async()=>{
    let {us,ps}=this.state
    console.log(us,ps)
    let token=localStorage.getItem("userToken")
    let result=await rootApi.add({us,ps,token})
    console.log(result)
    this.setState({visible:false})
    this.refreshList()
    switch (result.code) {
      case result.code!=0:
        return notification.error({description:'管理员添加失败，请详细检查传输',message:'错误',duration:1.5})
        break;
     case -998:
        return notification.error({description:'权限不足',message:'错误',duration:1.5})
        break;
      case -997:
        return notification.error({description:'token缺失',message:'错误',duration:1.5})
        break;
      case -1:
        return notification.error({description:'添加失败',message:'错误',duration:1.5})
        break;
      default:
       return notification.success({description:'管理员添加ok，模态框即将关闭',message:'成功',duration:1.5})
        break;
    }
  }

   async componentDidMount(){//渲染页面
     let result =await rootApi.list()
     this.setState({dataSource:result.data})
   }



  render() { 
    let {dataSource,columns,spinning,visible} = this.state
    return ( 
      <div className={style.box}>
         <Card title="管理员管理" className={style.card}>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={()=>{
          this.setState({visible:true})
        }}>添加</Button>
       <Spin spinning={spinning}>
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize:3}} rowKey='_id'/>
        </Spin>
      </Card>
      {/* 模态框 */}
      <Modal
          title="管理员添加"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          userName:<Input size="large" placeholder="添加管理员名" prefix={<UserOutlined/>} onChange={(e)=>{
            this.setState({us:e.target.value})
          }}/><br/>
          passWord:<Input.Password size="large" placeholder="管理员密码" prefix={<LockOutlined />} onChange={(e)=>{
            this.setState({ps:e.target.value})
          }}/><br/>
        </Modal>
      </div>
     
      
     );
  }
}

export default Root;