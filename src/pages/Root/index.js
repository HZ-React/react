import React, { Component } from 'react';
import { Card, Table } from 'antd';
class Root extends Component {
  state = { 
    dataSource:[],
    columns:[]
   }
  render() { 
    let {dataSource,columns} = this.state
    return ( 
      <Card title="这里是管理员管理">
        <Table dataSource={dataSource} columns={columns} />
      </Card>
     );
  }
}

export default Root;