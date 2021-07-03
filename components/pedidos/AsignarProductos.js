
import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';

import { OBTENER_PRODUCTOS } from '../../config/gql';
import PedidoContext from '../../context/pedidos/PedidoContext';
import { useQuery } from '@apollo/client'

const AsignarProductos = () => {

    const [productos, setProductos] = useState([]);

    // Context Pedidos
    const pedidoContext = useContext(PedidoContext);
    const { agregarProducto } = pedidoContext;

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS, {
        variables: {
            eliminado: false
        }
    });

    useEffect(() => {
        agregarProducto(productos);
    }, [productos]);

    const seleccionarProducto = productosSeleccionado => {
        setProductos(productosSeleccionado);
    };

    if(loading) return null;

    const { obtenerProductos } = data;

    return (
        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2. Selecciona o busca los Productos</p>
            <Select 
                className="mt-2"
                options={obtenerProductos}
                isMulti={true}
                onChange={ opcion => seleccionarProducto(opcion) }
                getOptionValue={ options => options.id }
                getOptionLabel={ options => `${options.nombre} (${options.stock})` }
                placeholder="Selecccione productos"
                noOptionsMessage={ () => "No hay resultados"}
                instanceId="productos"
            />

        </>
    )
};

export default AsignarProductos;
