import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Posts from "./components/posts"
import PostsForm from "./components/postsForm";
import {Provider} from "react-redux";
//import { createStore } from '../../../../../AppData/Local/Microsoft/TypeScript/3.2/node_modules/redux';
import { createStore } from "../../../../../AppData/Local/Microsoft/TypeScript/3.2/node_modules/redux";


const store=createStore
class App extends Component {
  render() {

 
    return <Provider >
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
          </header>
          <PostsForm />
          <hr />
          <Posts />
        </div>
      </Provider>;
  }
}

export default App;
