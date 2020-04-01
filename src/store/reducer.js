import state from './state'
import {CHANGE_NAME,CHANGE_AVATORURL,CHANGE_EMAIL,CHANGE__ID} from './actionsTypes'
export default (prevState = state,actions)=>{
  let newData = JSON.parse(JSON.stringify(prevState))

  let {type,payload} = actions
  switch(type){
    case CHANGE_NAME:
    newData.us = payload
    break;
    case CHANGE_AVATORURL:
    newData.avatorUrl = payload
    break;
    case CHANGE_EMAIL:
    newData.email = payload
    break;
    case CHANGE__ID:
    newData._id = payload
    break;
    default:
      break;
  }
  return newData
}