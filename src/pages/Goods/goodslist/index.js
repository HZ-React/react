import React, { Component } from 'react';
import api from '../../../api/goods';
import style from './index.module.less'
import { Card, Table,Button,Modal,Popconfirm ,Input,Pagination, message} from 'antd';
import { SearchOutlined ,PlusCircleTwoTone} from '@ant-design/icons';
class Goods extends Component {
  state = { 
    now:1,
    page:1,
    pageSize:3,
    count:0,
    searchValue:'',
    visible:false,
    type:false,
    typeValue:'',
    dataSource:[],
    columns:[ {title: '_id',dataIndex: '_id',key: '_id',width:180,fixed:'left'},
    {title: '名称',dataIndex: 'name',key: 'name',width:120},
    {title: '描述',dataIndex: 'desc',key: 'desc',width:180},
    {title: '价格',dataIndex: 'price',key: 'price',width:80},
    {title: '缩略图',dataIndex: 'path',key: 'path',width:200,render(path){
      return( <img width ='150' height='80'src={path}/>)
    }},
    {title: '库存',dataIndex: 'stock',key: 'stock',width:80},
    {title: '发布状态',dataIndex: 'putaway',key: 'putaway',width:120},
    {title: '类型',dataIndex: 'type',key: 'type',width:120},
    {title: '操作',key: 'action',width:120,fixed:'right',fixed:'right',render:(recode)=>{
      return(
        <div>
          <Popconfirm title='你确定要删除该商品嘛?'
          onConfirm={()=>{
            // console.log(recode._id)
            this.delList(recode._id)
            if(this.state.now===1){
              this.renderListByPage()
            }else if(this.state.now===2){
              this.GoodsfindByKw(this.state.searchValue)
            }else{
              this.GoodsfindByType(this.state.typeValue)
            } 
         
          }         
          }
            
          >
            <Button type='danger' size='small'>删除</Button>
          </Popconfirm>
         
          <Button type='primary' size='small' onClick={()=>{
        
           this.props.history.push('/box/goodsupdate?'+recode._id)
           console.log(this)
          }}>修改</Button>
        </div>
      )
    }}
  ]
   }
   componentDidMount(){
  //  this.renderList()
   this.renderListByPage()
   }
   //分页查询方法
   renderListByPage=async()=>{
    let {page,pageSize}  = this.state
     let result=await api.goodsbypage(page,pageSize)  
     let {msg,data}=result
     let count=result.allCount
    this.setState({dataSource:data,count,now:1}) 
   }
  
   //添加商品
   addList=async(payload)=>{
     let result=await api.goodsAddList(payload)
   
   }
   //删除商品
   delList=async(_id)=>{
    let result=await api.goosListDel(_id)
    this.renderListByPage()
   }
   //模糊查询
   GoodsfindByKw=async(kw)=>{
    this.setState({visible:false})
    if(kw==''){
      message.error('输入不能为空')
      this.setState({visible:true})
    }
    let {page,pageSize}  = this.state
    // console.log(this.state.searchValue)
    let result = await api.goodsbykw(kw,page,pageSize)
    let count=result.allCount
    let {err,msg,list}=result
    
    this.setState({dataSource:list,count,now:2})  
    // console.log(this.state.dataSource)
   }
   hideModal=()=>{
     this.setState({visible:false})
     this.setState({type:false})
    //  console.log(this)
   }
   //商品类别查询
   GoodsfindByType=async(type)=>{
     if(type==''){
      return message.error('输入不能为空')
     }
    this.setState({type:false})
    let {page,pageSize}  = this.state
    let result=await api.goodsbytype(type,page,pageSize)
    console.log(result)
    let {err,msg,list}=result
    let data=list.result
    let count=list.allCount
    if(count===0){
      message.error('未找到相关商品信息请输入正确的类型')
    }
    this.setState({dataSource:data,count,now:3}) 

   }
   //图片上传
   
  render() { 
    let {dataSource,columns,page,pageSize,count} = this.state
    return ( 
      <Card title="这里是商品列表管理">
        <Button type="primary"
        icon={<PlusCircleTwoTone />}
        onClick={()=>{
          this.props.history.push('/box/goodsadd')
        }}>添加</Button>
         
    <Button type="primary" icon={<SearchOutlined />}
    onClick={()=>{
      this.setState({visible:true})
    }}
    >
      模糊查询  </Button>
  <Button type="primary" icon={<SearchOutlined />}
   onClick={()=>{
     this.setState({type:true})
   }}
  >分类查询</Button>
  <Button type="primary" icon={<SearchOutlined />}
  onClick={()=>{
    this.renderListByPage()
  }}
  >查询所有商品</Button>
 <span >
 pageSize:<input   value={this.state.pageSize} onChange={(e)=>{
    this.setState({pageSize:e.target.value},()=>{
        // if(pageSize instanceof String){
        //  return message.error('输入不能未空')
        // }
        if(this.state.now===1){
          this.renderListByPage()
        }else if(this.state.now===2){
          this.GoodsfindByKw(this.state.searchValue)
        }else{
          this.GoodsfindByType(this.state.typeValue)
        } 
     
    })
   
  }}></input>
 </span>
        <Table dataSource={dataSource} columns={columns} rowKey='_id'  pagination={false}  scroll={{x:500}}/>
        {/* 模糊查询界面 */}
        <Modal
          title="模糊搜索界面"
          visible={this.state.visible}
          onOk={this.GoodsfindByKw.bind(this,this.state.searchValue
            )
          }
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <Input placeholder='请输入你要搜索的内容' value={this.state.searchValue} onChange={(e)=>{
            this.setState({searchValue:e.target.value})
          }}/>
        </Modal>
        {/* 类型查询界面 */}
        <Modal 
         title="类型搜索界面"
         visible={this.state.type}
         onCancel={this.hideModal}
         onOk={this.GoodsfindByType.bind(this,this.state.typeValue)}
         okText="确认"
         cancelText="取消" 
         >
         <Input placeholder='请输入要搜索的商品类型' value={this.state.typeValue} onChange={(e)=>{
           this.setState({typeValue:e.target.value})
          //  console.log(this.state.typeValue)
         }}></Input>
         </Modal>
             {/* 分页器 */}
             <Pagination  current={page}total={count} showQuickJumper pageSize={pageSize}
            onChange={(page,pageSize)=>{
              //只要页码数发生改变就会触发          
              this.setState({page},()=>{
                console.log(this.state.now)
                if(this.state.now===1){
                  console.log(page)
                  this.renderListByPage()
                }else if(this.state.now===2){
                  this.GoodsfindByKw(this.state.searchValue)
                }else{
                  this.GoodsfindByType(this.state.typeValue)
                }
                
              })   
            }}
            />
      </Card>
     );
  }
}

export default Goods;