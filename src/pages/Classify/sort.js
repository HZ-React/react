import React, { Component } from 'react'
import style from './index.moudle.less'
import { Collapse, Card,Button } from 'antd';
const {Panel} = Collapse
    class Sort extends Component {
    constructor(props){
        super(props)
        this.state={
            listData: [
                {
                    header:"推荐专区",
                    key:"1",
                    childer:[
                        {
                            header:"充值特惠",
                            key:"1-1"
                        },
                        {
                            header:"口碑好物",
                            key:"1-2"
                        },
                        {
                            header:"快手新菜",
                            key:"1-3"
                        }
                    ]
                },
                {
                    header:"宅家防护",
                    key:"2",
                    childer:[
                        {
                            header:"消毒杀菌",
                            key:"2-1"
                        },
                        {
                            header:"换季单品",
                            key:"2-2"
                        },
                        {
                            header:"滋补美食",
                            key:"2-3"
                        }
                    ]
                }

            ]
        }
    }
    listRender=(list)=>{
        return list.map(item=>{
            if(item.childer){
                return (
                    <Panel header={item.header} key={item.key}>
                        <Collapse defaultActiveKey={item.key}>
                            {this.listRender(item.childer)}
                        </Collapse>
                    </Panel>
                )
            }else{
                return (
                    <Panel header={item.header} key={item.key}> 
                        <Button type="primary">点击管理</Button>
                    </Panel>
                )
            }
        })
    }
    render() {
        return (
            <div className={style.box}>
                <Card title="商品分类管理" className={style.card}>
                    <Collapse>
                        {this.listRender(this.state.listData)}
                        <Panel header="爆品专区" key="3">
                                <Collapse defaultActiveKey="3">
                                <Panel header="居家生活" key="3-1">
                                  <Button type="primary">点击管理</Button>
                                </Panel>
                                <Panel header="服饰鞋包" key="3-2">
                                    <Button type="primary">点击管理</Button>
                                </Panel>
                                <Panel header="美食酒水" key="3-3">
                                  <Button type="primary">点击管理</Button>
                                </Panel>
                            </Collapse>
                        </Panel>
                    </Collapse>
                </Card>
            </div>
        )
    }
}
export default Sort