import React, { Component } from 'react';
import { Card, Table,Button, message ,TreeSelect} from 'antd';
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
   }
   addList=async(payload)=>{
    // console.log(payload)
    console.log(this.state.path)
    if(!this.state.path){
     return message.warning('请先上传图片')
    }
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
  };
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
        <TreeNode value="居家生活" title="居家生活">
          <TreeNode value="口碑好物header" title="口碑好物">
            <TreeNode value="口碑好物" title="口碑好物" />
            <TreeNode value="抑菌除螨" title="抑菌除螨" />
            <TreeNode value="春夏好物" title="春夏好物" />
            <TreeNode value="主题床品" title="主题床品" />
            <TreeNode value="北欧原木" title="北欧原木" />
            <TreeNode value="餐厨爆款清单" title="餐厨爆款清单" />
          </TreeNode>
          <TreeNode value="床上生活" title="床上生活">
            <TreeNode value="床品件套" title="床品件套" />
            <TreeNode value="被枕盖毯" title="被枕盖毯" />
            <TreeNode value="床垫床褥" title="床垫床褥" />
          </TreeNode>
          <TreeNode value="家居饰品" title="家居饰品">
            <TreeNode value="抱枕靠垫" title="抱枕靠垫" />
            <TreeNode value="家饰" title="家饰" />
            <TreeNode value="居家布艺" title="居家布艺" />
          </TreeNode>
        </TreeNode>
        <TreeNode value="服饰鞋包" title="服饰鞋包">
          <TreeNode value="当季热销" title="当季热销">
            <TreeNode value="热销爆款" title="热销爆款" />
            <TreeNode value="好物上新" title="好物上新" />
            <TreeNode value="抄底特惠" title="抄底特惠" />
          </TreeNode>
          <TreeNode value="男装" title="男装">
            <TreeNode value="男式T恤/POLO" title="男式T恤/POLO" />
            <TreeNode value="男式衬衫" title="男式衬衫" />
            <TreeNode value="男式裤装" title="男式裤装" />
            <TreeNode value="男式牛仔" title="男式牛仔" />
            <TreeNode value="男式针织衫/卫衣" title="男式针织衫/卫衣" />
            <TreeNode value="男式外套" title="男式外套" />
          </TreeNode>
          <TreeNode value="女装" title="女装">
            <TreeNode value="女式T恤/POLO" title="女式T恤/POLO" />
            <TreeNode value="女式裙装" title="女式裙装" />
            <TreeNode value="女士半裙" title="女士半裙" />
          </TreeNode>
        </TreeNode>
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
           console.log(obj)
          this.addList(obj)
         
         }}>添加</Button>
       </div>
      </Card>
     );
  }
}

export default Goods;