import axios from '../middleware/axios'
class User {
    // userlist(token){//列表渲染
    //   let url = `/mall/user/list?token=${localStorage.getItem('userToken')}`
    //   return axios.get(url,token)
    // }
    userlist(token,page = 1,pageSize =2){//列表渲染
        let url = `/mall/user/list?token=${localStorage.getItem('userToken')}`
        return axios.get(url,token,{params:{page,pageSize}})
      }
    useradd(us,ps){//增加
        let url = '/mall/user/add'
        let token = localStorage.getItem('userToken')
        return axios.post(url,{us,ps,token})
      }
    userdel(_id){//删除
        let token = localStorage.getItem('userToken')
        let url = `/mall/user/del?token=${token}&_id=${_id}`
        return axios.get(url)
    }
}
export default new User()