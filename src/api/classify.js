import axios from '../middleware/axios'
class Classify{
    list(){//商品分类数据
        let token=localStorage.getItem("userToken")
        let url=`/mall/classify/getinfo?token=${token}`
        return axios.get(url,token)
    }
    del(payload){//删除
        let url='/mall/classify/classifydel'
        console.log(payload)
        return axios.post(url,payload) 
    }
    add(payload){//添加
        let url ='/mall/classify/classifyadd'
        return axios.post(url,payload)
    }
    update(payload){//修改
        let url ='/mall/classify/classifyupdate'
        return axios.post(url,payload)
    }
}
export default new Classify()