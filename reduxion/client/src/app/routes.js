import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Application from 'parts/core/containers/application';
import Dashboard from 'parts/core/views/dashboard';

import Authenticated from 'parts/auth/containers/authenticatedComponent';
import Login from 'parts/auth/containers/login';

import ClientLogout from 'parts/auth/containers/clientLogout';
import Signup from 'parts/auth/containers/signup';
import Forgot from 'parts/auth/containers/forgot';

import ClientProfile from 'client/profile/containers/profile';
import ClientChangePassword from 'client/profile/containers/changePassword';
import ClientChangeEmail from 'client/profile/containers/changeEmail';

export default () => (
    <Route component={Application} name="home" path="/">
        <Route component={Application} name="home" path="i">
            <IndexRoute component={Dashboard}/>
            <Route component={Login} path="login"/>
            <Route component={Signup} path="signup"/>
            <Route component={ClientLogout} path="logout"/>
            <Route component={Forgot} path="forgot"/>

            <Route path="client" component={Authenticated}>
                <IndexRoute component={ClientProfile}/>
                <Route component={ClientProfile} path="profile"/>
                <Route component={ClientChangePassword} path="profile/change_password"/>
                <Route component={ClientChangeEmail} path="profile/change_email"/>
            </Route>
        </Route>
    </Route>
);
