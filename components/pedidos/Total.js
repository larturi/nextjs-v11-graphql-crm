import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';


const Total = () => {

    // Context Pedidos
    const pedidoContext = useContext(PedidoContext);
    const { total } = pedidoContext;

    return (
        <div className="flex items-center mt-8 justify-between bg-white p-3 border-solid border-2 border-gray-400">
            <h2 className="text-gray-800 text-lg">Total a Pagar:</h2>
            <p className="text-gray-800 mt-0">${total}</p>
        </div>
    )
};

export default Total;
