import React from 'react';
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';

// Layouts
import Layouts from './layout';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" render={(props) => <Layouts.Default {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
