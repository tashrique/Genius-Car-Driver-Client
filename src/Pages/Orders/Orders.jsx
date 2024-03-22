import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/UserContext';
import OrderRow from './OrderRow';
import toast from 'react-hot-toast';

const Orders = () => {

    const { user, logout, setLoading } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const totalPrice = orders.reduce((total, order) => total + parseInt(order.price), 0);

    useEffect(() => {
        fetch(`https://genius-car-server-nine-rho.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => {
                if ((res.status === 401) || (res.status === 403)) {
                    return logout();
                }
                return res.json()
            })
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
    }, [user?.email])

    const handleDelete = id => {
        fetch(`https://genius-car-server-nine-rho.vercel.app/orders/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('geniusToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    const remainingOrders = orders.filter(order => order._id !== id);
                    toast.success('Order deleted successfully');
                    setOrders(remainingOrders);
                }
            })
            .catch(err => console.log(err))
    }

    const handleUpdate = (id) => {
        fetch(`https://genius-car-server-nine-rho.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('geniusToken')}`
            },
            body: JSON.stringify({ status: 'Done' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const remainingOrders = orders.filter(order => order._id !== id);
                    const approving = orders.find(order => order._id === id);
                    approving.status = 'Done';
                    setOrders([...remainingOrders, approving]);
                }
            })

    }




    return (
        <div className='my-24'>
            <h1 className='font-bold text-3xl text-center my-12'>You have {orders.length} orders</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Service Name</th>
                                <th>Ordered For</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => <OrderRow key={order._id} order={order} handleDelete={handleDelete} handleUpdate={handleUpdate}></OrderRow>)
                            }
                        </tbody>

                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Total: ${totalPrice}</th>
                                <th></th>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Orders;