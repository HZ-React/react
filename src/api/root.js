import axios from '../middleware/axios'
class Root{
    list(){//管理员数据
        let token=localStorage.getItem("userToken")
        let url=`/mall/root/find?token=${token}`
        return axios.get(url,token)
    }
    del(_id,token){//删除
        let url='/mall/root/del'
        return axios.post(url,{_id,token}) 
    }
    add(payload){//添加
        let url ='/mall/root/add'
        console.log(payload)
        return axios.post(url,payload)
    }
}
export default new Root()