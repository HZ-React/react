import axios from '../middleware/axios'
class Classify{
    getToken(){
        return localStorage.getItem('userToken')
    }
    list(){//商品分类数据
        let token=localStorage.getItem("userToken")
        let url=`/mall/classify/getinfo?token=${token}`
        return axios.get(url,token)
    }
    find(payload){//查询
        let url='/mall/classify/classifyfind'
        return axios.post(url,payload)
    }
    del(payload){//删除
        let url='/mall/classify/classifydel'
        return axios.post(url,payload) 
    }
    add(payload){//添加
        let url ='/mall/classify/classifyadd'
        payload = JSON.stringify(payload)
        let token = this.getToken()
        return axios.post(url,{payload,token}) 
    }
    update(payload){//修改
        let url ='/mall/classify/classifyupdate'
        payload = JSON.stringify(payload)
        let token = this.getToken()
        return axios.post(url,{payload,token})
    }
}
export default new Classify()