import React, { Component } from 'react';
import {Provider} from 'react-redux'
import store from './store/store'
import Router from './router'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <Provider store={store}>
        <Router></Router>
      </Provider>
     );
  }
}
 
export default App;