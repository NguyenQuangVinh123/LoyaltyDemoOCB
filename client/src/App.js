import React from 'react';
import './App.scss';
import { Switch,Route } from 'react-router-dom'

import AdminPage from './containers/admin/admin.component'
import HomePage from './containers/client/Home/index'


function App() {
  return (
    <div>
      <Switch>
          <Route exact path= "/admin" component = {AdminPage} />
          <Route  path= "/home"  component = {HomePage} />
          <Route  path= "/"  component = {HomePage} />

      </Switch>
    </div>
  );
}

export default App;
