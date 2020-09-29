import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, HashRouter , Route, Switch } from 'react-router-dom';

import Routes from './components/routing/Routes';
import DashboardActions from './components/dashboard/DashboardActions';
import Login from './components/auth/Login';

import 'react-toastify/dist/ReactToastify.css';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import ForgotPassword from './components/auth/ForgotPassword';
import forgotCode from './components/auth/ForgotCode';
import ResetPassword from './components/auth/ResetPassword';

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      {/* <BrowserRouter basename="/lug_react"> */}
      <HashRouter>
        <Fragment>
        {
          <DashboardActions />
}
          <Switch>
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route exact path="/forgotcode" component={forgotCode} />
            <Route exact path="/resetpassword" component={ResetPassword} />
            <Route exact path="/" component={Login} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
        </HashRouter>
      {/* </BrowserRouter> */}
    </Provider>
  );
};

export default App;
