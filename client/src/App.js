import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './scenes/login/login';
import adminHome from './scenes/admin/adminHome';
import Error from './scenes/error/error';
import Home from './scenes/home/home';
import Calendar from './components/calendar/calendar';
import userHome from './scenes/userHome/userHome';
// import userHome from './scenes/userHome/userHome'

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/adminHome" component={adminHome} />
          <Route path="/login" component={Login} />
          <Route path="/hrHome" component={Home} />
          <Route path="/calendar" component={Calendar} />
          <Route path='/userHome' component={userHome} />
          <Route component={Error} />
        </Switch>
      </main>
    );
  }
}

export default App;
