import React, { Component } from 'react';
import { Card,Button, message ,TreeSelect,Popconfirm} from 'antd';
import style from  './index.module.less';
import api from '../../../api/goods'
const { TreeNode } = TreeSelect;
class Goods extends Component {
  state = { 
    "name":"默认名字",
    "desc":'超好吃,是真的超好吃不是假的超好吃',
    "price":"555",
    "path":"http://www.baidu.com",
    "stock":"0",
    "putaway":"0",
    "type":"热菜",
    "value": "",
    data:[]
   }
   componentDidMount=async()=>{
     let result=this.props.location.search
     let _id=result.split('?')[1]
     console.log(_id)
     let goodsOnlyOne=await api.goodsOne(_id)
     let{data}=goodsOnlyOne
     console.log(data)
     let {name,desc,price,path,stock,putaway,type}=data
    
     this.setState({name,desc,price,path,stock,putaway,value:type})
     console.log(this.state.name)
     this.Classifyfind()
   }
   goodsUpdate=async(_id,payload)=>{
    console.log(payload)
    let result=await api.goodsUpdate(_id,payload)
    if(result.err == 0){
      message.success('更新成功')
      this.props.history.replace('/box/goodslist')
    }
   }
   GoodsImgUpload=async(payload)=>{
    let file=this.refs.img.files[0]
    console.log(file)
    let {size,type}=file
    if(size>1000000){
     return  message.warning('图片尺寸超过1兆')
    }
    let imgType=type.split('/')[1]
    let types=['webp','jpg','png','jpeg','gif']
    if(types.indexOf(imgType)===-1){
    return  message.warning('图片格式只允许jpg,jpeg,png,gif,webp')
    }
    let formdate=new FormData()
    formdate.append('hehe',file)
    let {err,msg,path}=await api.imgupload(formdate)
    
    this.setState({path})
    console.log(path)
    // console.log(result)
  }
  onChange = value => {
    console.log(value);
    this.setState({ value });
  }
  Classifyfind=async()=>{
    let data=await api.classifygetinfo()
    let {msg,code,result}=data
    this.setState({data:result})
  }
  listRender=(list)=>{
    return list.map((item,index)=>{
      if(!item.childern) {
        return (
          <TreeNode value={item.key} key={item.key} title={item.header}>        
          </TreeNode>
        )
      }
      else{
        return (
          <TreeNode value={item.key} key={item.key} title={item.header}> 
          {this.listRender(item.childern)}       
          </TreeNode>
        )
      }
    })  
}
  render() { 
    let {name,desc,price,path,stock,putaway,type,value}=this.state
    return ( 
      <Card title="这里是商品修改界面"
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
          <span>图片地址:</span><input value={path} onChange={(e)=>{
              this.setState({path:e.target.value})
          }}></input><br/>
          <span>stock:</span><input value={stock} onChange={(e)=>{
              this.setState({stock:e.target.value})
          }}></input><br/>
          <span>商品状态:</span>
         <select value={putaway} onChange={(e)=>{
              this.setState({putaway:e.target.value})
              console.log(e.target.value)
            }}>
              <option value='下架'>下架</option>
              <option value='未上架'>未上架</option>
              <option value='上架'>上架</option>
            </select>
            
            <br/>
          {/* <span>type:</span><input value={type} onChange={(e)=>{
              this.setState({type:e.target.value})
          }}></input><br/> */}
          <span>type:</span>
             <TreeSelect
        showSearch
        style={{ width: '25%'}}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请输入商品类型"
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
        {this.listRender(this.state.data)}
      </TreeSelect>
      <br/>
         修改图片<input type='file' ref='img'></input>
          <img width='100' height='120' src={path} ></img>
          <button
          onClick={()=>{
            this.GoodsImgUpload()
          }}
          >上传图片</button>
          <br/>
          <Popconfirm title='你确定要修改该商品嘛?' onConfirm={()=>{
              let result=this.props.location.search
              let _id=result.split('?')[1]
              let name=this.state.name
              let desc=this.state.desc
              let price=this.state.price
              let path=this.state.path
              let stock=this.state.stock
              let putaway=this.state.putaway
              let type=this.state.value
              let obj={name,desc,price,path,stock,putaway,type}
             this.goodsUpdate(_id,obj)
          }}>
          <Button>修改</Button>
          </Popconfirm>
        
         
        
      </Card>
     );
  }
}

export default Goods;