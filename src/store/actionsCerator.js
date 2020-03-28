import {CHANGE_NAME} from './actionsTypes';
export default {
  [CHANGE_NAME](payload){
    let action = {
      type: 'CHANGE_NAME',
      payload: payload
    }
    return action
  }
}