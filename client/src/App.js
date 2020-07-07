import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Main from './components/Layout/Main'
import Home from './components/Auth/Home'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Main>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
