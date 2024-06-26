import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';

const Header = () => {

    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    const menuItems = <>
        <li><Link to={'/'}>Home</Link> </li>

        {
            user && user?.uid ?
                <>
                    <li><Link to={'/orders'}>Orders</Link> </li>
                    <li><button onClick={handleLogout}>Logout</button> </li>
                </> :
                <>

                    <li><Link to={'/login'}>Login</Link> </li>
                    <li><Link to={'/signup'}>Signup</Link> </li>
                </>
        }


    </>


    return (
        <div>
            <div className="navbar h-20 mb-12 pt-12 bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>

                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost text-xl"><img src={logo} className='h-12'></img></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold">
                        {menuItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn btn-warning mx-2">Appointment</a>
                    <p>{user?.displayName} {user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Header;