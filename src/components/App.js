/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route } from 'react-router-dom';
import HomePage from './HomePage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    const activeStyle = { color: 'blue' };
    return (
      <div className="container-fluid">
        <nav >
          <NavLink exact to="/" activeStyle={activeStyle}>Profile</NavLink>
          {' | '}
          <NavLink to="/trending" activeStyle={activeStyle}>Trending</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/profile" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;