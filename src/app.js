import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import Header from './components/Header';
import ItemCreator from './components/ItemCreator';
import ItemsList from './components/ItemsList';
import CompletedFilter from './components/CompletedFilter';

import './app.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Header />
          <div className="todos-wrapper">
            <ItemCreator />
            <ItemsList />
            <CompletedFilter />            
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
