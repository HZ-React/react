import axios from '../middleware/axios'

class Ad {
    getToken() {
        return localStorage.getItem('userToken')
    }
    adList(page = 1, pageSize = 2) {
        let url = `/mall/ad/list?token=${this.getToken()}&page=${page}&pageSiz=${pageSize}`
        return axios.get(url)
    }
    adAdd(name, address,jump,type) {
        let url = `/mall/ad/adadd?token=${this.getToken()}`
        return axios.post(url,{name,address,jump,type})
    }

}
export default new Ad()