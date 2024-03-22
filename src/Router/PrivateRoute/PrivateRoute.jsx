import React, { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <h1 className='text-3xl font-black'>Loading...</h1>
    }

    if (user && user.uid) {
        return children;
    }

    return <Navigate state={{ from: location }} to='/login' replace></Navigate>


};

export default PrivateRoute;