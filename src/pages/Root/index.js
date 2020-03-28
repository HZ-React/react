import React, { Component } from 'react';
import { Card, Table ,Spin,Popconfirm,Button,message,Modal,notification,Pagination } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import rootApi from '../../api/root.js'
import style from './index.module.less'
class Root extends Component {
  state = { 
    dataSource:[],//表单里的值
    visible:false,
    spinning:false,
    count:0, //总数量
    columns:[//分类
      {
        title:'id',
        dataIndex:'_id',
        key:'id'
      },
      {
        title:'管理员',
        dataIndex:'us',
        key:'us'
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
            }
              >
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
    let result=await rootApi.del(_id)
    console.log(result)
    if(result.code!== 0){ return false }
    this.refreshList()
  }

  handleOk=async()=>{
    let userName = this.refs.us.value
    let passWord = this.refs.ps.value
    let result=await rootApi.add({userName,passWord})
    if (result.code!==0){ return notification.error({description:'管理员添加失败，请详细检查传输',message:'错误',duration:1.5})}
    notification.success({description:'管理员添ok，模态框即将关闭',message:'成功',duration:1.5})
    console.log(result)
    this.setState({visible:false})
    this.refreshList()
  }

   async componentDidMount(){//渲染页面
     let result =await rootApi.list()
     let count=result.data.length
     this.setState({dataSource:result.data})
   }



  render() { 
    let {dataSource,columns,spinning,visible,count} = this.state
    return ( 
      <div className={style.box}>
         <Card title="管理员管理" className={style.card}>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={()=>{
          this.setState({visible:true})
        }}>添加</Button>
       <Spin spinning={spinning}>
        <Table dataSource={dataSource} columns={columns}  rowKey='_id'/>
        </Spin>
        {/* 分页器 */}
        <Pagination defaultCurrent={1} total={count} pageSize={4}/>
      </Card>
      {/* 模态框 */}
      <Modal
          title="管理员添加"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          userName:<input type="text" ref='us'/><br/>
          passWord:<input type="text" ref='ps'/><br/>
        </Modal>
      </div>
     
      
     );
  }
}

export default Root;