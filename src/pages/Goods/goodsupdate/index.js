import React, { Component } from 'react';
import { Card, Table,Button, message } from 'antd';
import style from  './index.module.less';
import api from '../../../api/goods'
class Goods extends Component {
  state = { 
    "name":"默认名字",
    "desc":'超好吃,是真的超好吃不是假的超好吃',
    "price":"555",
    "path":"http://www.baidu.com",
    "stock":"0",
    "putaway":"0",
    "type":"热菜"
   }
   componentDidMount=async()=>{
     let result=this.props.location.search
     let _id=result.split('?')[1]
     console.log(_id)
     let goodsOnlyOne=await api.goodsOne(_id)
     let{data}=goodsOnlyOne
     let {name,desc,price,path,stock,putaway,type}=data
    
     this.setState({name,desc,price,path,stock,putaway,type})
     console.log(this.state.name)
   }
   goodsUpdate=async(_id,payload)=>{
    console.log(payload)
    let result=await api.goodsUpdate(_id,payload)
    if(result.err == 0){
      message.success('更新成功')
      this.props.history.replace('/box/goodslist')
    }
   }
  render() { 
    let {name,desc,price,path,stock,putaway,type}=this.state
    return ( 
      <Card title="这里是商品修改"
      className={style.box}>
          <span>name:</span><input value={name} onChange={(e)=>{
               this.setState({name:e.target.value})
          }}></input><br/>
          <span>desc:</span><input value={desc} onChange={(e)=>{
              this.setState({desc:e.target.value})
          }}></input><br/>
          <span>price:</span><input value={price} onChange={(e)=>{
              this.setState({price:e.target.value})
          }}></input><br/>
          <span>path:</span><input value={path} onChange={(e)=>{
              this.setState({path:e.target.value})
          }}></input><br/>
          <span>stock:</span><input value={stock} onChange={(e)=>{
              this.setState({stock:e.target.value})
          }}></input><br/>
          <span>putaway:</span><input value={putaway} onChange={(e)=>{
              this.setState({putaway:e.target.value})
          }}></input><br/>
          <span>type:</span><input value={type} onChange={(e)=>{
              this.setState({type:e.target.value})
          }}></input><br/>
         <Button onClick={()=>{
           let result=this.props.location.search
           let _id=result.split('?')[1]
          
          this.goodsUpdate(_id,this.state)
         }}>修改</Button>
      </Card>
     );
  }
}

export default Goods;