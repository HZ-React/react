import axios from '../middleware/axios';
let saveMySetting = async (payload)=>{
  let url ='mall/root/update'
  let token = localStorage.getItem('userToken')
  payload.token = token
  axios.post(url,payload)
}
export default saveMySetting