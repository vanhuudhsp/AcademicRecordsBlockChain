import React, { useEffect } from 'react';
import {Navigate} from 'react-router-dom';
import { useMaterialUIController } from 'context';
import { logout } from 'context';

function SignOut()
{
    const [controller, dispatch] = useMaterialUIController();
    useEffect(()=>logout(dispatch,null),[dispatch]);
    return (
        <Navigate to="*" replace={true}/>
    );
}

export default SignOut;