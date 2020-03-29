import React, { Component } from 'react';
import { Card, Table,Button,Modal,Input,notification,Spin} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
class User extends Component {

  render() { 
    return ( 
         <Card title="设置">
             <div style={{float:"left"}}>
                邮箱
                <Input placeholder="Basic usage" />
                <br/>
                昵称
                <Input placeholder="Basic usage" />
                <br/>
             </div>
             <div style={{float:"right"}}>
                <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="" style={{borderRadius:'50%',width:100}}/>
                <Button>更换头像</Button>
             </div>
         </Card>
     );
  }
}

export default User;