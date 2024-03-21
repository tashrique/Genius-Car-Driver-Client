import React from 'react';
import photo from '../../assets/images/login/login.svg'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';



const Signup = () => {

    const { user, loading, createUser, Google, Github, emailVerify } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    const handleGoogle = () => {
        Google();
    }

    const handleGithub = () => {
        Github();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if (password !== confirm) {
            setError('Password does not match');
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log("Logged in", user);
                form.reset();
                setError('');
                handleEmailVerification();
                toast.success('Account created successfully! Please verify your email')
                result.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        console.log('Profile updated');
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            })
            .catch(error => {
                setError(error.message);
            })
    }


    const handleBlur = (e) => {
        e.preventDefault();
    }

    const handleEmailVerification = () => {
        emailVerify()
            .then(result => {
                setError('Email verification sent');
            })
            .catch(error => {
                setError(error.message);
            })
    }





    return (
        <div className="hero my-24 bg-base-200">
            <div className="hero-content grid grid-cols-2 gap-2">
                <div className="text-center lg:text-left">
                    <img src={photo} alt="login" className="w-2/3" />
                </div>



                <div className="card shrink-0 w-full shadow-lg bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <h1 className="text-3xl font-bold text-center">Sign Up now!</h1>



                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="name" placeholder="Name" name="name" className="input input-bordered" required onBlur={handleBlur} />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name="email" className="input input-bordered" required onBlur={handleBlur} />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Password" name="password" className="input input-bordered" required onBlur={handleBlur} />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" placeholder="Confirm password" name="confirm" className="input input-bordered" required onBlur={handleBlur} />

                            <p className='text-red-500'>{error}</p>
                        </div>


                        <div className="form-control mt-6">
                            <input type="submit" value="Sign Up" className='btn btn-warning' />
                        </div>
                        <div className='my-4 flex flex-col gap-3'>
                            <p className='text-center'>or</p>
                            <button className='btn btn-ghost  border-2 border-gray-900' onClick={handleGoogle}><img src='https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png' className='w-6 h-6'></img> Signup with Google</button>
                            <button className='btn btn-ghost border-2 border-gray-900' onClick={handleGithub}><img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className='w-6 h-6'></img> Signup with Github</button>
                            <p className='text-sm mt-6 text-center'>Already have an account? <Link to={'/login'} className='font-semibold text-orange-500'>Login here!</Link></p>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;