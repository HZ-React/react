import React, { Component } from 'react';
import { Card,Button,Input} from 'antd';
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
               <div style={{
                  float:"right"
               }}>
                  <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="" style={{borderRadius:'50%',width:100}}/>
                  <br/>
                  <Button  style={{marginTop:20}}>更换头像</Button>
               </div>
            </Card>
      );
   }
}

export default User