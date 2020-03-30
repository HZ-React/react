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
   addList=async(payload)=>{
    console.log(payload)
    let result=await api.goodsAddList(payload)
    let {err,msg}=result
    if(err==-1){ message.error('商品添加失败，每一项都为必填项')}
    else{
      message.success('商品添加成功')
     this.props.history.push('/box/goodslist')
    }
   }
   GoodsImgUpload=async(payload)=>{
    let file=this.refs.img.files[0]
    let formdate=new FormData()
    formdate.append('hehe',file)
    let {err,msg,path}=await api.imgupload(formdate)
    
    this.setState({path})
    console.log(path)
    // console.log(result)
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
          缩略图：<input type='file' ref='img'></input><button
          onClick={()=>{
            this.GoodsImgUpload()
          }}
          >上传图片</button>
          <img width='100' height='120' src={path} ></img>
         <Button onClick={()=>{
           let name=this.refs.name.value
           let desc=this.refs.desc.value
           let price=this.refs.price.value
           let path=this.state.path
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