import React from 'react';
import photo from '../../assets/images/login/login.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {


    const { user, setLoading, login, Google, Github, forgotPassword } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';


    const [email, setEmail] = useState('');


    const handleGoogle = () => {
        Google();
    }

    const handleGithub = () => {
        Github();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;



        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setError('');

                if (user.emailVerified) {
                    navigate(from, { replace: true });
                } else {
                    toast.error('Please verify your email.');
                }
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleBlur = (e) => {
        setEmail(e.target.value);
    }

    const handleforgotPassword = () => {
        const email = email;
        forgotPassword(email)
            .then(result => {
                setError('Password reset link sent to your email');
            })
            .catch(error => {
                setError(error.message);
            })
    }




    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content grid grid-cols-2 gap-2">
                <div className="text-center lg:text-left">
                    <img src={photo} alt="login" className="w-2/3" />
                </div>



                <div className="card shrink-0 w-full shadow-lg bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold text-center">Login now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name="email" className="input input-bordered" required onBlur={handleBlur} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            <label className="label">
                                <button onClick={handleforgotPassword} className="label-text-alt link link-hover">Forgot password?</button>
                            </label>
                            <p className='text-red-500'>{error}</p>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Login" className='btn btn-warning' />
                        </div>
                        <div className='my-4 flex flex-col gap-3'>
                            <p className='text-center'>or</p>
                            <button className='btn btn-ghost  border-2 border-gray-900' onClick={handleGoogle}><img src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' className='w-6 h-6'></img> Login with Google</button>
                            <button className='btn btn-ghost border-2 border-gray-900' onClick={handleGithub}><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className='w-6 h-6'></img> Login with Github</button>
                            <p className='text-sm mt-6 text-center'>Not registered yet? <Link to={'/signup'} className='font-semibold text-orange-500'>Sign Up here!</Link></p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;