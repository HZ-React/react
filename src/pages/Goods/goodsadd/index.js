import React, { Component } from 'react';
import { Card, Table,Button } from 'antd';
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
   addList=async(payload)=>{
    console.log(payload)
    let result=await api.goodsAddList(payload)
   }
  render() { 
    let {name,desc,price,path,stock,putaway,type}=this.state
    return ( 
      <Card title="这里是商品添加"
      className={style.box}>
          <span>name:</span><input ref='name' ></input><br/>
          <span>desc:</span><input ref='desc' ></input><br/>
          <span>price:</span><input ref='price' ></input><br/>
          <span>path:</span><input ref='path'></input><br/>
          <span>stock:</span><input ref='stock' ></input><br/>
          <span>putaway:</span><input ref='putaway' ></input><br/>
          <span>type:</span><input ref='type' ></input><br/>
         <Button onClick={()=>{
           let name=this.refs.name.value
           let desc=this.refs.desc.value
           let price=this.refs.price.value
           let path=this.refs.path.value
           let stock=this.refs.stock.value
           let putaway=this.refs.putaway.value
           let type=this.refs.type.value
           let obj={name,desc,price,path,stock,putaway,type}
           console.log(obj)
          this.addList(obj)
         }}>添加</Button>
      </Card>
     );
  }
}

export default Goods;