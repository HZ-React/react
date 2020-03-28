import axios from '../middleware/axios'
let login =async (e)=>{
  let url = '/mall/root/login'
  return axios.post(url,e)
}
export default login