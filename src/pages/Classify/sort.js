import React, { Component } from 'react'
import style from './index.moudle.less'
import { Collapse, Card,Button } from 'antd';

class Sort extends Component {

    render() {
        let {Panel}=Collapse
        return (
            <div className={style.box}>
                <Card title="商品分类管理" className={style.card}>
                    <Collapse>
                        <Panel header="推荐专区" key="1">
                            <Collapse defaultActiveKey="1">
                               
                                <Panel header="充值特惠" key="1-1"> 
                                  <Button type="primary">点击管理</Button>
                                </Panel>
                                <Panel header="口碑好物" key="1-2">
                                    <Button type="primary">点击管理</Button>
                                </Panel>
                                <Panel header="快手新菜" key="1-3">
                                  <Button type="primary">点击管理</Button>
                                </Panel>
                            </Collapse>
                        </Panel>
                        <Panel header="宅家防护" key="2">
                               <Collapse defaultActiveKey="2"> 
                                <Panel header="消毒杀菌" key="2-1">
                                  <Button type="primary">点击管理</Button>
                                </Panel>
                                <Panel header="换季单品" key="2-2">
                                    <Button type="primary">点击管理</Button>
                                </Panel>
                                <Panel header="滋补美食" key="2-3">
                                  <Button type="primary">点击管理</Button>
                                </Panel>
                            </Collapse>
                        </Panel>
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