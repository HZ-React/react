import axios from '../middleware/axios'
class User {
    userlist(token){
      let url = `/mall/user/list?token=${localStorage.getItem('userToken')}`
      return axios.get(url,token)
    }
    useradd(us,ps){
        let url = '/mall/user/add'
        let token = localStorage.getItem('userToken')
        return axios.post(url,{us,ps,token})
      }
    userdel(_id){
        let token = localStorage.getItem('userToken')
        let url = `/mall/user/del?token=${token}&_id=${_id}`
        return axios.get(url)
    }
}
export default new User()