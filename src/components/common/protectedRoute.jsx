import React from 'react';
import {getCurrentUser} from "../../services/userService";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute =({component:Component,render,...rest})=> {
    const user = getCurrentUser();
        return (
            <Route
                   {...rest}
                   render={props => {
                       if (!user) return <Redirect to={{
                           pathname:"/login",
                           state:{from:props.location}
                       }}/>
                       return Component ? <Component {...props}/> : render (props)
                   }}/>
        );
}

export default ProtectedRoute;