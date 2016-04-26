import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Authenticated from 'parts/auth/containers/authenticatedComponent'
import Application from 'parts/core/containers/application'
import Dashboard from 'parts/core/views/dashboard'
import Login from 'parts/auth/containers/login'
import Logout from 'parts/auth/containers/adminLogout'
import Signup from 'parts/auth/containers/signup'
import Forgot from 'parts/auth/containers/forgot'
import RegistrationComplete from 'parts/auth/containers/registrationComplete'
import ResetPassword from 'parts/auth/views/resetPassword'

import UsersView from 'parts/admin/usersView'
import AdminClientProfile from 'parts/admin/containers/clientProfile'
import AdminClientAdd from 'parts/admin/containers/clientAdd'

export default () => (
    <Route component={Application} name="home" path="/">
        <Route component={Application} name="home" path="coffee">
            <IndexRoute component={Dashboard}/>
            <Route component={Login} path="login"/>
            <Route component={Signup} path="signup"/>
            <Route component={Logout} path="logout"/>
            <Route component={Forgot} path="forgot"/>

            <Route component={RegistrationComplete} name="verifyEmail" path="verifyEmail/"/>
            <Route component={ResetPassword} name="ResetPasswordToken" path="resetPassword/:token"/>

            <Route path="admin" component={Authenticated}>
                <IndexRoute component={UsersView}/>
                <Route component={UsersView} path="users"/>
                <Route component={AdminClientAdd} path="client/new"/>
                <Route component={AdminClientProfile} path="client/:id"/>
            </Route>
        </Route>
    </Route>
);
