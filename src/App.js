import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from './redux/actions/user';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Preferences from './Components/Preferences';

function App() {
  const { token, user } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  let unAuthenticatedRoutes = (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/sign-in'>
            <Login />
          </Route>
          <Route exact path='/sign-up'>
            <SignUp />
          </Route>
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </div>
    </div>
  );

  const handleClickLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeUser());
  };

  let view;

  if (token && user.userTypeId == 2) {
    view = (
      <div className='wrapper'>
        <Switch>
          <Route exact path='/manage-profile'>
            <Profile />
          </Route>
          <Route exact path='/manage-preferences'>
            <Preferences />
          </Route>
          <Route>
            <Redirect to='/manage-preferences' />
          </Route>
        </Switch>
      </div>
    );
  } else if (token && user.userTypeId == 1) {
    view = (
      <div className='wrapper'>
        <Switch>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
          <Route exact path='/manage-profile'>
            <Profile />
          </Route>
          <Route exact path='/manage-preferences'>
            <Preferences />
          </Route>
          <Route>
            <Redirect to='/dashboard' />
          </Route>
        </Switch>
      </div>
    );
  } else {
    view = unAuthenticatedRoutes;
  }

  return (
    <Router>
      <div className='App'>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
          <div className='mx-3'>
            <Link className='navbar-brand' to={'/sign-in'}>
              Students Matching With Dissertation Topics System
            </Link>
          </div>
          <div className='container'>
            <div className='collapse navbar-collapse justify-content-end' id='navbarTogglerDemo02'>
              {!token ? (
                <ul className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/sign-in'}>
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to={'/sign-up'}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className='navbar-nav ml-auto'>
                  <li className='nav-item'>
                    <p className='text-muted my-2 small'>
                      {user.userTypeId == 1 ? 'Supervisor Account' : 'Student Account'}
                    </p>
                  </li>
                  <li className='nav-item'>
                    <Link onClick={handleClickLogout} className='nav-link'>
                      | &nbsp; Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
        {view}
      </div>
    </Router>
  );
}
export default App;
