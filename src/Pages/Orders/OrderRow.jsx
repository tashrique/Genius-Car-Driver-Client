import React, { useEffect } from 'react';
import { useState } from 'react';

const OrderRow = ({ order, handleDelete, handleUpdate }) => {

    const { _id, serviceName, customer, price, service, status } = order;

    const [orderService, setOrderService] = useState({});

    useEffect(() => {
        fetch(`https://genius-car-server-nine-rho.vercel.app/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    }, [service])




    return (
        <tr>
            <th>
                <label>
                    <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(_id)}>x</button>
                </label>
            </th>
            <td>
                <div className="flex items-center gap-3">
                    {
                        orderService?.img && <img src={orderService.img} alt="" className="w-10 h-10 rounded-full" />
                    }
                </div>
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-bold">{order.serviceName}</div>
                    </div>
                </div>
            </td>
            <td>
                {order.customer}
                <br />
                <span className="badge badge-ghost badge-sm"></span>
            </td>
            <td>{order.price}</td>
            <th>
                <button className="btn btn-ghost btn-xs" onClick={() => handleUpdate(_id)}>{
                    status ? status : 'Pending'
                }</button>
            </th>
        </tr>

    );
};

export default OrderRow;