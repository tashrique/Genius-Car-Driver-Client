import React from 'react';
import Person from '../../assets/images/about_us/person.jpg';
import Parts from '../../assets/images/about_us/parts.jpg';

const About = () => {
    return (
        <div className="hero my-32">
            <div className="hero-content flex-col lg:flex-row gap-16">
                <div className='relative w-1/2'>
                    <img src={Person} className="w-4/5 " />
                    <img src={Parts} className="w-3/5 right-0 top-1/2 border-8 border-white absolute" />

                </div>
                <div className='w-1/2'>
                    <p className="font-semibold text-orange-500 pb-2">About Us</p>
                    <h1 className="text-5xl font-bold">We are Certified!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-warning">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;