import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Application from 'parts/core/containers/application';
import AdminLanding from 'parts/core/views/adminLanding';
import ClientLanding from 'parts/core/views/clientLanding';

import Authenticated from 'parts/auth/containers/authenticatedComponent';
import Login from 'parts/auth/containers/login';
import AdminLogout from 'parts/auth/containers/adminLogout';
import ClientLogout from 'parts/auth/containers/clientLogout';
import Signup from 'parts/auth/containers/signup';
import Forgot from 'parts/auth/containers/forgot';
import RegistrationComplete from 'parts/auth/containers/registrationComplete';
import ResetPassword from 'parts/auth/views/resetPassword';

import MyProfile from 'parts/profile/containers/myProfile';

import ClientProfile from 'client/profile/containers/profile';

import UsersView from 'parts/admin/usersView';
import AdminClientView from 'parts/admin/containers/client';
import AdminClientAdd from 'parts/admin/containers/clientAdd';
import AdminUserManagementList from 'parts/admin/containers/userManagementList';
import AdminUserManagementAdd from 'parts/admin/containers/userManagementAdd';
import AdminUserManagementEdit from 'parts/admin/containers/userManagementEdit';

export default () => (
    <Route component={Application} name="home" path="/">

        {/*admin page*/}

        <Route component={Application} name="home" path="coffee">
            <IndexRoute component={AdminLanding}/>
            <Route component={Login} path="login"/>
            <Route component={Signup} path="signup"/>
            <Route component={AdminLogout} path="logout"/>
            <Route component={Forgot} path="forgot"/>

            <Route component={RegistrationComplete} name="verifyEmail" path="verifyEmail/"/>
            <Route component={ResetPassword} name="ResetPasswordToken" path="resetPassword/:token"/>

            <Route path="admin" component={Authenticated}>
                <IndexRoute component={UsersView}/>
                <Route component={UsersView} path="users"/>
                <Route component={AdminClientAdd} path="client/new"/>
                <Route component={AdminClientView} path="client/:id"/>
                <Route path="account">
                  <IndexRoute component={AdminUserManagementList}/>
                  <Route component={AdminUserManagementAdd} path="new"/>
                  <Route component={AdminUserManagementEdit} path=":id"/>
                </Route>
            </Route>

            <Route path="app" component={Authenticated}>
                <IndexRoute component={MyProfile}/>
                <Route name="account" path="my">
                    <Route component={MyProfile} path="profile"/>
                </Route>
            </Route>
        </Route>

        {/*client page*/}

        <Route component={Application} name="home" path="i">
            <IndexRoute component={ClientLanding}/>
            <Route component={Login} path="login"/>
            <Route component={Signup} path="signup"/>
            <Route component={ClientLogout} path="logout"/>
            <Route component={Forgot} path="forgot"/>

            <Route path="client" component={Authenticated}>
                <IndexRoute component={ClientProfile}/>
                <Route component={ClientProfile} path="profile"/>
            </Route>
        </Route>
    </Route>
);
