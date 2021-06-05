import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar';

// Pages
import Index from '../pages/index';
import Show from '../pages/show';

function Default() {
  return (
    <React.Fragment>
      <NavBar />

      <Switch>
        <Route exact path='/' render={(props) => <Index {...props} />} />
        <Route path='/show/:id' render={(props) => <Show {...props} />} />
      </Switch>
    </React.Fragment>
  );
}

export default Default;
