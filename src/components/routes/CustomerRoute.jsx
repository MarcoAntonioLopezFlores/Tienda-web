import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../util/authentication';
import AppBarComponent from '../AppBarComponent';
import decode from 'jwt-decode';

const CustomerRoute = ({ component: Component, role, ...rest }) => {

    var ROLE=2
        
    if(localStorage.getItem('token')!==null){
        ROLE = (decode(localStorage.getItem("token"))).perfil[0].rol.id
    }

    return (
        <Route {...rest} render={props => (
            isLogin() && role === ROLE ?
                <AppBarComponent>
                    <Component {...props} />
                </AppBarComponent>
                : <Redirect to="/" />
        )} />
    );
};

export default CustomerRoute;