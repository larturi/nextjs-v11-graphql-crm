import React, { useReducer } from 'react';

import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_PRODUCTO,
    CANTIDAD_PRODUCTOS
} from '../../types';

const PedidoState = ({children}) => {

    // State de Pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    };

    const [ state, dispatch ] = useReducer(PedidoReducer, initialState);

    // Modificar el cliente
    const agregarCliente = cliente => {
        dispatch({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        });
    };

    // Modificar el producto
    const agregarProducto = producto => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: producto
        });
    };

    return (
        <PedidoContext.Provider
            value={{
                productos: state.productos,
                agregarCliente,
                agregarProducto
            }}
        >
            {children}
        </PedidoContext.Provider>
    )

};

export default PedidoState;