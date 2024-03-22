import { createBrowserRouter } from 'react-router-dom'
import Main from '../../Layout/Main'
import Home from '../../Pages/Home/Home'
import Login from '../../Pages/Login/Login';
import Signup from '../../Pages/Login/Signup';
import Checkout from '../../Pages/Checkout/Checkout';
import Orders from '../../Pages/Orders/Orders';
import PrivateRoute from '../PrivateRoute/PrivateRoute';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/checkout/:id',
                loader: async ({ params }) => {
                    return fetch(`https://genius-car-server-nine-rho.vercel.app/services/${params.id}`)
                },
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            {
                path: '/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>
            }

        ]
    },
]);

export default router;
