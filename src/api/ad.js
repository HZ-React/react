import axios from '../middleware/axios'

class Ad {
    getToken() {
        return localStorage.getItem('userToken')
    }
    //列表渲染
    adList(page = 1, pageSize = 2) {
        let url = `/mall/ad/list?token=${this.getToken()}&page=${page}&pageSiz=${pageSize}`
        return axios.get(url)
    }
    //图片信息增加
    adAdd(name, address,jump,type) {
        let url = `/mall/ad/adadd?token=${this.getToken()}`
        return axios.post(url,{name,address,jump,type})
    }
    //广告删除
    adDel(_id) {
        let url = `/mall/ad/adadd?token=${this.getToken()}&_id=${_id}`
        return axios.get(url)
    }
    //分页
    adbypage(page=3,pageSize=2){
        let token = this.getToken()
        let url='/mall/ad/adbypage'
        // console.log(token)
        return axios.post(url,{token,page,pageSize})
      }
    //分类查询
    adbytype(type,page,pageSize){
        let token = this.getToken()
        let url='/mall/ad/adbytype'
        return axios.post(url,{type,token,page,pageSize})
  }

}
export default new Ad()