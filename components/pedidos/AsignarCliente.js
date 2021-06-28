import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';

import PedidoContext from '../../context/pedidos/PedidoContext';
import { useQuery } from '@apollo/client'
import { OBTENER_CLIENTES_USUARIO } from '../../config/gql';

const AsignarCliente = () => {

    const [cliente, setCliente] = useState([]);

    // Context Pedidos
    const pedidoContext = useContext(PedidoContext);
    const { agregarCliente } = pedidoContext;

    const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

    useEffect(() => {
        agregarCliente(cliente);
    }, [cliente]);

    const seleccionarCliente = clienteSeleccionado => {
        setCliente(clienteSeleccionado);
    };

    if(loading) return null;

    const { obtenerClientesVendedor } = data;

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1. Asigna un Cliente al Pedido</p>
            <Select 
                className="mt-2"
                options={obtenerClientesVendedor}
                isMulti={false}
                onChange={ opcion => seleccionarCliente(opcion) }
                getOptionValue={ options => options.id }
                getOptionLabel={ options => options.nombre }
                placeholder="Selecccione el cliente"
                noOptionsMessage={ () => "No hay resultados"}
                instanceId="cliente"
            />
        </>
    )
};

export default AsignarCliente;