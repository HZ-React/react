import React,{Component} from 'react'
import {Card,Input, Button,Tooltip,notification} from 'antd'
import classifyApi from '../../../api/classify.js'
class ClassifyAdd extends Component{
    constructor(props){
        super(props)
    }
    state={
        'header':'',
        "key":'',
    }

     add=async(payload)=>{//添加方法
        let result=await classifyApi.add(payload)
        console.log(result)
        switch(result.code){
            case -998:
                notification.error({description:'权限不足',message:'错误',duration:2})
               break;
             case -997:
               notification.error({description:'token缺失',message:'错误',duration:2})
               break;
             case -1:
               notification.error({description:'添加失败',message:'错误',duration:2})
                 break; 
             default:
               notification.success({description:'商品分类添加ok，模态框即将关闭',message:'成功',duration:2})
              break;
        }
    }
    
    componentDidMount() {
        console.log(this.props.history.location.state._id)//获取到id
        let token=localStorage.getItem("userToken")
        let _id=this.props.history.location.state._id
        classifyApi.find({_id,token}).then(result=>{
            console.log(result)
            let key=`${result.data.key}-${result.data.childern.length+1}`
            this.setState({key})
        })
    }
    render(){
        let{header,key}=this.state
        return(
            <div>
              <Card title='分类添加'> 
              类名:<Input value={header} placeholder="请输入新增的分类" onChange={(e)=>{
                  this.setState({header:e.target.value})
              }}/><br/><br/>

              <Tooltip placement="right" title="key值固定无需手动添加">
              <span>key:{key}</span>
              </Tooltip><br/><br/>

              <Button type='primary' onClick={()=>{
                  let token=localStorage.getItem("userToken")
                  let _id=this.props.history.location.state._id
                  classifyApi.find({_id,token})
                  .then(result=>{
                    console.log('添加',result.data)  
                    let obj = {header,key}
                    result.data.childern.push(obj)
                    return result.data
                    })
                    .then(data=>{
                        this.add(data)
                        this.props.history.replace('/box/classifylist')
                    })
              }}>添加</Button>

            <Button onClick={()=>{
                  this.props.history.replace('/box/classifylist')
              }}>取消添加</Button>
              </Card>  
            </div>
        )
    }
}
export default ClassifyAdd