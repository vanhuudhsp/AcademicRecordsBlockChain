import React from 'react';
import {Navigate, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import usersSlice from 'layouts/users/usersSlice';
import {userLoginState$} from '../../redux/selectors';

function PrivateRoute({ children, ...rest }) {
    const userLogin = useSelector(userLoginState$);
    return (
      <Route
        {...rest}
        render={({ location }) =>
            userLogin ? (
            children
          ) : (
            <Navigate to="/authentication/sign-in" replace={true}/>
          )
        }
      />
    );
  }

  export default PrivateRoute;