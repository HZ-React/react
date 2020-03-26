import state from './state'
import {CHANGE_NAME} from './actionsTypes'
export default (prevState = state,actions)=>{
  let newData = JSON.parse(JSON.stringify(prevState))

  let {type,payload} = actions
  switch(type){
    case [CHANGE_NAME]:
      newData.name = payload
      break;
      default:
        break;
  }
  return newData
}