import React, { Component } from 'react';
import { Card, Table ,Spin,Popconfirm,Button,message,Modal,notification,Input} from 'antd';
import { PlusCircleOutlined ,UserOutlined,LockOutlined} from '@ant-design/icons';
import rootApi from '../../api/root.js'
import style from './index.module.less'

import XLSX from 'xlsx'
class Root extends Component {
  state = { 
    dataSource:[],//表单里的值
    visible:false,
    spinning:false,
    us:'',
    ps:'',
    columns:[//分类
      {
        title:'管理员',
        dataIndex:'us',
        key:'us',
        width:'40%'
      },
      {
        title:'密码',
        dataIndex:'ps',
        key:'ps',
        width:'40%'
      },
      {
        title:'操作',
        key:'action',
        width:'20%',
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

  refreshList=async(token)=>{//刷新页面
    let result = await rootApi.list(token)
    this.setState({ dataSource: result.data})//将请求到的数据渲染到页面上
}

  del=async(_id)=>{//删除
    let token=localStorage.getItem("userToken")
    let result=await rootApi.del(_id,token)
    this.refreshList()
    switch (result.code) {
     case -998:
         notification.error({description:'权限不足',message:'错误',duration:1.5})
        break;
      case -997:
        notification.error({description:'token缺失',message:'错误',duration:1.5})
        break;
      case -1:
        notification.error({description:'删除失败',message:'错误',duration:1.5})
          break; 
      default:
        notification.success({description:'管理员删除ok，模态框即将关闭',message:'成功',duration:1.5})
       break;
    }
  }

  handleOk=async()=>{
    let {us,ps}=this.state
    let token=localStorage.getItem("userToken")
    let result=await rootApi.add({us,ps,token})
    this.setState({visible:false})
    this.refreshList()
    switch (result.code) {
      case 0:
        notification.success({description:'管理员添加ok，模态框即将关闭',message:'成功',duration:1.5})
        break;
     case -998:
        notification.error({description:'权限不足',message:'错误',duration:1.5})
        break;
      case -997:
        notification.error({description:'token缺失',message:'错误',duration:1.5})
        break;
      case -1:
        notification.error({description:'添加失败',message:'错误',duration:1.5})
        break;
      default:
       notification.error({description:'管理员添加失败，请详细检查传输',message:'错误',duration:1.5})
        break;
    }
  }

   async componentDidMount(token){//渲染页面
     let result =await rootApi.list(token)
     this.setState({dataSource:result.data})
   }

   exportAll=async(token)=>{//导出数据
    //获取表头(管理员，操作)
    let thead=this.state.columns.map((item)=>{return  item.title})
    let Athead=thead.slice(0,2)
    //获取要导出的数据（要发起请求获取数据）
    let {data} =await rootApi.list(token)
    let  ArrayData=data.map((item)=>{
      let arr=[]
      for (const key in item) {
        arr.push(item[key]) 
      }
     return arr
    }) 
    let Adata=ArrayData.map(
      item=>{return [item[1],item[2]]}
      )
    //讲数据合并成数组
    let result=[Athead,...Adata]
    //将表格的dom元素转化为excel的工作簿
    let sheet =XLSX.utils.aoa_to_sheet(result)
    //创建工作簿
    let wb=XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb,sheet)
    //将表格的工作簿导出为excel文件
    XLSX.writeFile(wb, "管理员列表.xlsx");
   }
   

  render() { 
    let {dataSource,columns,spinning,visible} = this.state
    return ( 
      <div className={style.box}>
         <Card title="管理员管理" className={style.card}>
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={()=>{
          this.setState({visible:true})
        }}>添加</Button>


        {/* 导出全部数据 */}
        <Button type='primary' onClick={this.exportAll}>导出数据</Button>


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