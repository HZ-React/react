import React, { Component } from 'react';
import { Card, Table } from 'antd';
class Goods extends Component {
  state = { 
    dataSource:[],
    columns:[]
   }
  render() { 
    let {dataSource,columns} = this.state
    return ( 
      <Card title="这里是商品管理">
        <Table dataSource={dataSource} columns={columns} />
      </Card>
     );
  }
}

export default Goods;