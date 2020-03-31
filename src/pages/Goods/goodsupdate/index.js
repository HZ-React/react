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
    "value": ""
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
  };
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