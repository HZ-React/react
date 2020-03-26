import {CHANGE_NAME} from './actionsTypes';
export default {
  [CHANGE_NAME](){
    let action = {
      type: 'CHANGE_NAME',
      payload: '嘻嘻'
    }
    return action
  }
}