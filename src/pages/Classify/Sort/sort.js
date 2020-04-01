import React, { Component, Fragment } from 'react'
import style from './index.moudle.less'
import { Collapse, Card, Button,notification,Popconfirm,message} from 'antd';
import classifyApi from '../../../api/classify'
import { PlusCircleOutlined} from '@ant-design/icons';
const { Panel } = Collapse
class Sort extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listData: [],
            header:'',
        }
    }

    
    listRender = (list) => {
        if(!list){return message.error('登陆失效，重新登陆')}
        return list.map(item => {
            if (item.childern) {
                return (
                    <Panel header={item.header} key={item.key}>

                    {/* 点击跳转到添加页面，并传递_id过去 */}
                    <Button type="primary" icon={<PlusCircleOutlined />} onClick={()=>{
                        // this.props.history.replace(`/box/classifyadd?_id=${item._id}`)
                        this.props.history.replace({pathname:'/box/classifyadd',state:{_id:item._id}})//跳转+传id
                      }}>添加分类</Button>

                        <Collapse defaultActiveKey={item.key}>
                            {this.listRender(item.childern)}
                        </Collapse>
                    </Panel>
                )
            } else {
                return (
                    <Panel header={item.header} key={item.key}>
                        <Button type="primary" onClick={()=>{
                            let index=item.key.split('-')[0]-1//这条数据的index
                            let _id=this.state.listData[index]._id
                            let Cindex=item.key.split('-')[1]//key后面的数字
                            let header=item.header
                            //是否需要Dindex？
                            this.props.history.replace({pathname:'/box/classifyupdate',state:{_id,Cindex,header}})//跳转+传id
                        }}>修改分类</Button> 

                         <Popconfirm
                         placement="right"
                         title='你确定要删除这个账号吗？'
                         onConfirm={()=>{
                             //利用key的第一个值可以获取到这条数据的_id,从而确定是哪一条数据
                             let index = item.key.split('-')[0] - 1//每一条数据的索引
                             let _id = this.state.listData[index]._id//每条数据最外部的id
                             let Cindex = item.key.split('-')[1] - 1//cindex是childern下面的的项的索引
                             let token=localStorage.getItem("userToken")
                             this.del({_id,Cindex,token})
                         }}
                         onCancel={()=>{
                            message.error('取消')
                         }}
                         >
                              <Button type="primary" type='danger'>删除分类</Button>
                        </Popconfirm>
                    </Panel>
                )
            }
        })
    }
    refreshList=async(token)=>{//刷新页面
        let result = await classifyApi.list(token)
        this.setState({listData:result.result},()=>{
        })
    }
    

    del=async(payload)=>{//删除方法
        let result=await classifyApi.del(payload)
        this.refreshList()
        switch (result.code) {
            case -998:
                notification.error({description:'权限不足',message:'错误',duration:1.5})
               break;
             case -997:
               notification.error({description:'token缺失',message:'错误',duration:1.5})
               break;
             case -1:
               notification.error({description:'删除失败',message:'错误',duration:1.5})
                 break; 
             default:
               notification.success({description:'商品分类删除ok，模态框即将关闭',message:'成功',duration:1.5})
              break;
           }
    }

    async componentDidMount(token){//渲染页面
        let result =await classifyApi.list(token)
        this.setState({listData:result.result}

    )}
    render() {
        let {listData}=this.state
        return (
            <div className={style.box}>
                <Card title='商品分类管理' className={style.card}>
                <Collapse>
                    {this.listRender(listData)}
                    </Collapse>
                </Card>
            </div>
        )
    }
}
export default Sort