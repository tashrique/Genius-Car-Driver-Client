import React, { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {


    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])


    return (
        <div>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <p className="text-lg font-semibold text-orange-500">Services</p>
                <h1 className='text-5xl font-semibold'>Our Service Areas</h1>
                <p className='w-2/3 text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, quidem veniam ipsam est et amet!</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12 '>
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>

        </div>
    );
};

export default Services;