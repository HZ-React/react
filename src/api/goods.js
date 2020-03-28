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
    console.log(_id)
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
  console.log(_id)
  let url='/mall/goods/goodsone'
  return axios.post(url,{_id,token})
  }
  goodsUpdate(_id,payload){
    let token = this.getToken() 
    payload.token = token
    payload._id = _id
    console.log(payload)
    let url='/mall/goods/goodsupdate'
  return axios.post(url,payload)
  }
  }



export default new Goods()