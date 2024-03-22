import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {

    const { _id, img, title, price } = service;

    return (
        <div>
            <div className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={img} alt="Shoes" className='w-full h-48 object-cover' /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <h2 className="card-title text-orange-500 text-lg">Price: ${price}</h2>

                    <div className="card-actions justify-end">
                        <Link to={`/checkout/${_id}`} className=""><button className="btn btn-warning">Buy Now</button></Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;