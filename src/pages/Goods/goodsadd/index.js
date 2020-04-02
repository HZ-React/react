import React, { Component } from 'react';
import { Card,Button, message ,TreeSelect} from 'antd';
import style from  './index.module.less';
import api from '../../../api/goods';
const { TreeNode } = TreeSelect;
class Goods extends Component {
  state = { 
    "name":"zcj",
    "desc":'超好吃,是真的超好吃不是假的超好吃',
    "price":"555",
    "path":"",
    "stock":"0",
    "putaway":"0",
    "type":"热菜",
    value: undefined,
    data:[]
   }
   addList=async(payload)=>{
    // console.log(payload)
    // console.log(this.state.path)
    if(!this.state.path){
     return message.warning('请先上传图片')
    }
    let result=await api.goodsAddList(payload)
    let {err}=result
    if(err===-1){ message.error('商品添加失败，每一项都为必填项')}
    else{
      message.success('商品添加成功')
     this.props.history.push('/box/goodslist')
    }
   }
   GoodsImgUpload=async(payload)=>{
    let file=this.refs.img.files[0]
    // console.log(file)
    if(!file){ return message.error('请先上传图片')}
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
    let {path}=await api.imgupload(formdate)
    
    this.setState({path})
    // console.log(path)
    // console.log(result)
  }
  onChange = value => {
    // console.log(value);
  
    this.setState({ value });
  }
  componentDidMount=()=>{
    this.Classifyfind() 
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
  Classifyfind=async()=>{
    let data=await api.classifygetinfo()
    let {result}=data
    this.setState({data:result})
  }
  render() { 
    let {name,desc,price,path,stock,putaway,type}=this.state
    return ( 
      <Card title="这里是商品添加" style={{background:'#ccc'}}
      className={style.box}>
       <div className={style.main}>
       <span>name:</span><input ref='name' ></input><br/>
          <span>desc:</span><input ref='desc' ></input><br/>
          <span>price:</span><input ref='price' ></input><br/>
          {/* <span>path:</span><input ref='path'></input><br/> */}
          <span>stock:</span><input ref='stock' ></input><br/>
          <span>发布状态:</span><select value={putaway}
          onChange={(e)=>{
            this.setState({putaway:e.target.value})
          }}          
          >
            <option>下架</option>
            <option>上架</option>
            <option>未上架</option>
            </select><br/>

          <span>type:</span>
         
          <TreeSelect
        showSearch
        style={{ width: '20%'}}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请输入商品类型"
        allowClear
        treeDefaultExpandAll
        onChange={this.onChange}
      >
      {/* {this.renderClass(this.state.data)} */}
      {/* {this.Classifyfind()} */}
      {this.listRender(this.state.data)}
      </TreeSelect>
    
      <br/>
         <span> 图片：</span><input type='file' ref='img'></input>
         <Button type="primary"
          onClick={()=>{
            this.GoodsImgUpload()
          }}
          >上传图片</Button><br/>
          <span>缩略图：</span> <img width='100' height='120' src={path} className={style.img}></img>       
         <br/>
         <Button type="primary" onClick={()=>{
           let name=this.refs.name.value
           let desc=this.refs.desc.value
           let price=this.refs.price.value
           let path=this.state.path
           let stock=this.refs.stock.value
           let putaway=this.state.putaway
           let type=this.state.value
           let obj={name,desc,price,path,stock,putaway,type}
          //  console.log(obj)
          this.addList(obj)
         
         }}>添加</Button>
      
       </div>
      </Card>
     );
  }
}

export default Goods;