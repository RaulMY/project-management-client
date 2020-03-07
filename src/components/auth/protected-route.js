// auth/protected-route.js

import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import MyContext from '../../context';

const ProtectedRoute  = ({component: Component, ...rest}) => {
    const { user } = useContext(MyContext);
    return (
      <Route
        {...rest}
        render={ props  => {
            if(user){
              return <Component {...props} />
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default ProtectedRoute;