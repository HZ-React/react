import React, { Component } from 'react';
import api from '../../../api/goods'
import { Card, Table,Button,Modal,Popconfirm } from 'antd';
class Goods extends Component {
  state = { 
  
    dataSource:[],
    columns:[ {title: '_id',dataIndex: '_id',key: '_id',width:120,fixed:'left'},
    {title: '名称',dataIndex: 'name',key: 'name',width:120},
    {title: '描述',dataIndex: 'desc',key: 'desc',width:80},
    {title: '价格',dataIndex: 'price',key: 'price',width:120},
    {title: '路径',dataIndex: 'path',key: 'path',width:120},
    {title: '库存',dataIndex: 'stock',key: 'stock',width:120},
    {title: '状态',dataIndex: 'putaway',key: 'putaway',width:120},
    {title: '类型',dataIndex: 'type',key: 'type',width:120},
    {title: '操作',key: 'action',width:120,fixed:'right',render:(recode)=>{
      return(
        <div>
          <Popconfirm title='你确定要删除该商品嘛?'
          onConfirm={()=>{
            // console.log(recode._id)
            this.delList(recode._id)}}
          >
            <Button type='danger' size='small'>删除</Button>
          </Popconfirm>
       
          <Button type='primary' size='small' onClick={()=>{
        
           this.props.history.push('/box/goodsupdate?'+recode._id)
          }}>修改</Button>
        </div>
      )
    }}
  ]
   }
   componentDidMount(){
   this.renderList()
   }
   renderList=async()=>{
    let result=await api.goodsList()
    let {msg,data}=result
    this.setState({dataSource:data})  
   }
   addList=async(payload)=>{
     let result=await api.goodsAddList(payload)
   
   }
   delList=async(_id)=>{
     console.log(_id)
    let result=await api.goosListDel(_id)
    this.renderList()
    console.log(result)
   }
  render() { 
    let {dataSource,columns,visible,confirmLoading} = this.state
    return ( 
      <Card title="这里是商品列表管理">
        <Button onClick={()=>{
          console.log(this)
          this.props.history.push('/box/goodsadd')
        }}>添加</Button>
        <Table dataSource={dataSource} columns={columns} rowKey='_id'/>
      </Card>
     );
  }
}

export default Goods;