import axios from '../middleware/axios'
let login =async (us,ps)=>{
  let url = 'locahost:3000/login'
  return axios.post(url,{us,ps})
}
export default login