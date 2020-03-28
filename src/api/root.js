import axios from '../middleware/axios'
class Root{
    list(){//管理员数据
        let url='/mall/root/find'
        return axios.get(url)
    }
    del(_id){//删除
        let url='/mall/root/del'
        return axios.post(url,_id) 
    }
    add(payload){//添加
        let url ='/mall/root/add'
        return axios.post(url,payload)
    }
}
export default new Root()