import React, { Component } from 'react';
import { Card,Button,Input, message} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actionsCerator from '../../store/actionsCerator';
import Goods from '../../api/goods'
import saveMySetting from '../../api/mySetting'
class User extends Component {
   constructor(props){
      super(props)
      this.state ={
         avatorUrl : '',
         us: '',
         email:''
      }
   }
   
   save=async ()=>{
      let _id = localStorage.getItem('user_id')
      let {CHANGE_NAME,CHANGE_EMAIL,CHANGE_AVATORURL} = this.props
      if(!_id){return  message.error('请先登陆')}
      let {us,avatorUrl,email} = this.state
      CHANGE_NAME(us)
      CHANGE_EMAIL(email)
      CHANGE_AVATORURL(avatorUrl)
      let payload = {}
      if(us){payload.us = us}
      if(avatorUrl){payload.avatorUrl = avatorUrl}
      if(email){payload.email = email}
      payload._id = _id
      saveMySetting(payload).then(res=>{
         if(res.nModified){
            message.success('保存成功')
         }else{
            message.error('保存失败')
         }
      })
   }
   avator=()=>{
      let file = this.refs.img.files[0]
      if(!file){return false}
      let data = new FormData()
      data.append('hehe',file)
      Goods.imgupload(data).then(res=>{
         let {path} = res
         this.props.CHANGE_AVATORURL(path)
         this.setState({avatorUrl:path})
      })
   }
   render() { 
      let {us,email} = this.state
      return ( 
            <Card title="设置">
               <div>
                  <div style={{float:"left"}}>
                     邮箱
                     <Input placeholder={this.props.email} value={email} onChange={(e)=>{
                        this.setState({email:e.target.value})
                     }}/>
                     <br/>
                     昵称
                     <Input  placeholder={this.props.us} value={us} onChange={(e)=>{
                        this.setState({us:e.target.value})
                     }}/>
                     <br/>
                  </div>
                  <div style={{
                     float:"right"
                  }}>
                     <img src={this.props.avatorUrl || "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"} alt="" style={{borderRadius:'50%',width:100}}/>
                     <br/>
                     <input type="file" placeholder="更换头像" style={{margin:"20px 0"}} ref="img"/>
                     <br />
                     <Button type="primary" onClick={this.avator}>上传头像</Button>
                     <br />
                     <Button type="primary" style={{margin:"10px"}} onClick={this.save}>保存设置</Button>
                  </div>
               </div>
            </Card>
      );
   }
}

export default connect(state=>state,(dispatch)=>{
   return bindActionCreators(actionsCerator,dispatch)
})(User)