import axios from '../middleware/axios'
class Goods {
  getToken(){
    return localStorage.getItem('userToken')
  }
  goodsList(){
    let url=`/mall/goods/goodslist?token=${this.getToken()}`
    return axios.get(url)
  }
  goosListDel(_id){
    let url='/mall/goods/goodsdel'
    let token = this.getToken()
    // console.log(_id)
    return axios.post(url,{token,_id})
  }
  goodsAddList(payload){
    let token = this.getToken()
    let url='/mall/goods/goodsadd'
    payload.token = token
    return axios.post(url,payload)
  }
  goodsOne(_id){
  let token = this.getToken()
  // console.log(_id)
  let url='/mall/goods/goodsone'
  return axios.post(url,{_id,token})
  }
  goodsUpdate(_id,payload){
    let token = this.getToken() 
    payload.token = token
    payload._id = _id
    // console.log(payload)
    let url='/mall/goods/goodsupdate'
  return axios.post(url,payload)
  }
  //关键字查询
  goodsbykw(kw,page=1,pageSize=2){
    let token = this.getToken()
    // console.log()
    let url='/mall/goods/goodsbykw'
    return axios.post(url,{kw,token,page,pageSize})
  }
   //分类查询
   goodsbytype(type,page,pageSize){
    let token = this.getToken()
    // console.log()
    let url='/mall/goods/goodsbytype'
    return axios.post(url,{type,token,page,pageSize})
  }
  //分页查询
  goodsbypage(page=1,pageSize=2){
    let token = this.getToken()
    let url='/mall/goods/goodsbypage'
    // console.log(token)
    return axios.post(url,{token,page,pageSize})
  }
  imgupload(payload){
    let url='/mall/goods/img'
    console.log(payload)
    return axios.post(url,payload)
  }
  //分类返回的数据
  classifygetinfo(){
    let token = this.getToken()
    let url=`/mall/Classify/getinfo?token=${this.getToken()}`
    return axios.get(url)
  }

}




export default new Goods()