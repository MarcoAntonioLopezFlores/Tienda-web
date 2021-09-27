import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../util/authentication';
import Nav from '../admin/Nav';
import decode from 'jwt-decode';

const AdminRoute = ({ component: Component, role, ...rest }) => {

    var ROLE=1
    
    if(localStorage.getItem('token')!==null){
        ROLE = (decode(localStorage.getItem("token"))).perfil[0].rol.id
    }

    return (
        <Route {...rest} render={props => (
            isLogin() && role === ROLE ?
                <Nav>
                    <Component {...props} />
                </Nav>
                : <Redirect to="/" />
        )} />
    );

};

export default AdminRoute;
