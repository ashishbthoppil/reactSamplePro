import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import { HashRouter, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();

class App extends Component{

  render(){
    return (
      <HashRouter basename='/'>
      <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
      </Provider>
      </HashRouter>
    );
  }
}

export default App;
