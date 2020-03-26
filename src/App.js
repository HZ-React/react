import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './store/store'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <Provider store={store}>
        app
      </Provider>
     );
  }
}
 
export default App;