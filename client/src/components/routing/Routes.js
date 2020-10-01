import React from 'react';
import { Route, Switch,BrowserRouter } from 'react-router-dom';

import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';

import Users from '../users/Users'
import UserDetails from '../users/userDetails'

import LuggerReport from '../Lugger/luggerReport'


import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import ViewProfile from '../users/Viewprofile';
import LuggerRequestDetails from '../Lugger/LuggerRequestDetails';
import editProfile from '../users/editProfile';
import Reports from '../report/Reports';
import reportDetails from '../report/reportDetails';
import Notifications from '../dashboard/Notifications'

const Routes = props => {
  return (
    <section >
      <Alert />
      <Switch>
     
     
    

        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
        <PrivateRoute exact path="/editProfile" component={editProfile}/>

        <PrivateRoute exact path="/users" component={Users}/>
        <PrivateRoute exact path="/users/:id" component={UserDetails}/>

        <PrivateRoute exact path="/userdetail" component={UserDetails}/>

        
        <PrivateRoute exact path="/viewprofile" component={ViewProfile}/>


        <PrivateRoute exact path="/lugger" component={LuggerReport}/>
        <PrivateRoute exact path="/lugger/:id" component={LuggerRequestDetails}/>




        <PrivateRoute exact path="/report" component={Reports}/>
        <PrivateRoute exact path="/report/:id" component={reportDetails}/>

        
        <PrivateRoute exact path="/dashboard/notifications" component={Notifications}/>
        
        
        
        {
        //   <Route exact path="/profiles" component={Profiles} />
        // <Route exact path="/profile/:id" component={Profile} />
        // <PrivateRoute exact path="/dashboard" component={Dashboard} />
        // <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        // <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        // <PrivateRoute exact path="/add-experience" component={AddExperience} />
        // <PrivateRoute exact path="/add-education" component={AddEducation} />
        // <PrivateRoute exact path="/posts" component={Posts} />
        // <PrivateRoute exact path="/posts/:id" component={Post} />
        
        
        }
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
