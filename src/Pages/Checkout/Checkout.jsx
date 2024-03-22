import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';


const Checkout = () => {

    const { _id, title, img, price, description } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = `${form.first.value} ${form.last.value}`
        const email = user?.email || 'guest account';
        const phone = form.phone.value;
        const comment = form.comment.value;


        const order = {
            service: _id,
            serviceName: title,
            price: price,
            customer: name,
            email: email,
            phone: phone,
            comment: comment
        }


        fetch('https://genius-car-server-nine-rho.vercel.app/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('geniusToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {
                    toast.success('Order placed successfully');
                    form.reset();
                } else {
                    toast.error('Failed to place order');
                }




            })
            .catch(err => console.log(err))

    }

    return (
        <div className='my-32 flex flex-col gap-4'>
            <h1 className='font-bold text-3xl'>Checkout: {title}</h1>
            <p className='text-xl'>Price: {price}</p>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input name="first" type="text" placeholder="First Name" className="input input-bordered w-full" required />
                    <input name="last" type="text" placeholder="Last Name" className="input input-bordered w-full" required />
                    <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" defaultValue={user?.email} readOnly />
                    <input name="phone" type="tel" placeholder="Phone" className="input input-bordered w-full" required />
                </div>
                <input name="comment" type="textarea" placeholder="Instructions" className="input input-bordered w-full my-4 h-24" />
                <input type="submit" value="Checkout" className='btn btn-warning w-4/12' />

            </form>

        </div>
    );
};

export default Checkout;