import React, { Component } from 'react';
import { Card, Table } from 'antd';
class User extends Component {
  state = { 
    dataSource:[],
    columns:[]
   }
  render() { 
    let {dataSource,columns} = this.state
    return ( 
      <Card title="这里是用户管理">
        <Table dataSource={dataSource} columns={columns} />
      </Card>
     );
  }
}

export default User;