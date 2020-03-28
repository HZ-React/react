import axios from '../middleware/axios'
let login =async (e)=>{
  let url = '/hehe/'
  return axios.post(url,e)
}
export default login