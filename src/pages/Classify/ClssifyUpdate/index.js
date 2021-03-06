import React,{Component} from 'react'
import {Card,Input, Button,Tooltip,notification} from 'antd'
import classifyApi from '../../../api/classify.js'

class ClassifyUpdate extends Component{
    constructor(props){
        super(props)
    }
    state={
        'header':'',
        "key":'',
    }
    update=async(payload)=>{//修改方法
        let result=await classifyApi.update(payload)
        switch(result.code){
            case -998:
                notification.error({description:'权限不足',message:'错误',duration:2})
               break;
             case -997:
               notification.error({description:'token缺失',message:'错误',duration:2})
               break;
             case -1:
               notification.error({description:'修改失败',message:'错误',duration:2})
                 break; 
             default:
               notification.success({description:'商品分类修改ok，模态框即将关闭',message:'成功',duration:2})
              break;
        }
    }
    componentDidMount(){
        let token=localStorage.getItem("userToken")
        let _id=this.props.history.location.state._id//传过来的id
        let Cindex=this.props.history.location.state.Cindex//传过来的key后一位
        let header=this.props.history.location.state.header//传过来的header
        classifyApi.find({_id,token}).then(result=>{
            let key=`${result.data.key}-${Cindex}`
            this.setState({key,header})//设定修改时的默认header和key内容
        })
        
    }
    render(){
        let{header,key}=this.state
        return(
            <div>
                <Card title='分类修改'>
                    类名:<Input value={header} onChange={(e)=>{
                         this.setState({header:e.target.value})//header值修改成输入的值
                    }}/><br/><br/>

               <Tooltip placement="right" title="key值固定无需手动修改">
               <span>key:{key}</span>
               </Tooltip><br/><br/>

               <Button type='primary' onClick={()=>{
                    let token=localStorage.getItem("userToken")
                    let _id=this.props.history.location.state._id//传过来的id
                    let Cindex=this.props.history.location.state.Cindex-1
                    classifyApi.find({_id,token})
                    .then(result=>{
                        let data=result.data.childern.splice(Cindex,1,{header:header,key:`${result.data.key}-${Cindex+1}`})
                        this.update(result.data)
                        this.props.history.replace('/box/classifylist')
                    })
               }}>修改</Button>

               <Button onClick={()=>{
                   this.props.history.replace('/box/classifylist')
               }}>取消修改</Button>
                </Card>
            </div>
        )
    }
}
export default ClassifyUpdate