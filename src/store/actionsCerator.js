import {CHANGE_NAME,CHANGE_EMAIL,CHANGE_AVATORURL,CHANGE__ID} from './actionsTypes';
export default {
  [CHANGE_NAME](payload){
    let action = {
      type: 'CHANGE_NAME',
      payload: payload
    }
    return action
  },
  [CHANGE_EMAIL](payload){
    let action = {
      type: 'CHANGE_EMAIL',
      payload: payload
    }
    return action
  },
  [CHANGE_AVATORURL](payload){
    let action = {
      type: 'CHANGE_AVATORURL',
      payload: payload
    }
    return action
  },
  [CHANGE__ID](payload){
    let action = {
      type: 'CHANGE__ID',
      payload: payload
    }
    return action
  },
}