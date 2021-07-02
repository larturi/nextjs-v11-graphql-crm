import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

import Swal from 'sweetalert2';

import { OBTENER_PEDIDOS_VENDEDOR } from '../../config/gql';

const ACTUALIZAR_PEDIDO = gql`
    mutation actualizarPedido($id: ID!, $input: PedidoInput){
        actualizarPedido(id: $id, input: $input) {
            estado
        }
    }
`;

const ELIMINAR_PEDIDO = gql`
    mutation eliminarPedido($id: ID!) {
        eliminarPedido(id: $id) {
            id
        }
    }
`;

 const Pedido = ({pedido}) => {

    const { id, total, cliente: { nombre, apellido, telefono, email}, estado, cliente } = pedido;

    // Mutation para cambiar el estado de un pedido
    const [ actualizarPedido ] = useMutation(ACTUALIZAR_PEDIDO);

    // Mutation para eliminar un pedido
    const [ eliminarPedido ] = useMutation(ELIMINAR_PEDIDO, {
        update(cache) {
            const { obtenerPedidosVendedor } = cache.readQuery({
                query: OBTENER_PEDIDOS_VENDEDOR
            });
            
            cache.writeQuery({
                query: OBTENER_PEDIDOS_VENDEDOR,
                data: {
                    obtenerPedidosVendedor: obtenerPedidosVendedor.filter( pedido => pedido.id !== id)
                }
            })
        }
    });

    const [estadoPedido, setEstadoPedido] = useState(estado);
    const [clase, setClase] = useState('');

    // Modifica el color del pedido de acuerdo a su estado
    const clasePedido = () => {
       if (estadoPedido === 'PENDIENTE') {
            setClase('border-yellow-500');
       } else if(estadoPedido === 'COMPLETADO') {
            setClase('border-green-500');
       } else {
            setClase('border-red-800');
       }
    }

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(estadoPedido);
        }
        clasePedido();
    }, [estadoPedido]);

    const cambiarEstadoPedido = async nuevoEstado => {
        try {
            const { data } = await actualizarPedido({
                variables: {
                    id,
                    input: {
                        estado: nuevoEstado,
                        cliente: cliente.id
                    }
                }
            });
            setEstadoPedido(data.actualizarPedido.estado);
        } catch (error) {
            console.error(error);
        }
    };

    const confirmarEliminarPedido = () => {
        Swal.fire({
            title: 'Deseas eliminar este pedido?',
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then( async (result) => {
            if (result.isConfirmed) {
                
                try {
                    await eliminarPedido({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Eliminado!',
                        'Pedido eliminado correctamente',
                        'success'
                    );
                    
                } catch (error) {
                    console.error(error);    
                }

            }
        });
    };
 
    return (
        <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                <p className="font-bold text-gray-800">Cliente: {nombre} {apellido}</p>

                {email && (
                    <p className="flex items-center my-2">
                        <svg className="w-4 h-4 mr-1 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {email}
                    </p>
                )}

                {telefono && (
                    <p className="flex items-center my-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {telefono}
                    </p>
                )}

                <h2 className="mt-10 font-bold text-gray-800">Estado Pedido:</h2>

                <select className="mt-2 appearance-none border border-blue-600
                                 text-blue-700 p-2 text-center rounded leading-tight text-xm font-bold
                                 focus:outline-none focus:border-blue-500 uppercase"
                        value={estadoPedido}
                        onChange={ e => cambiarEstadoPedido(e.target.value) }
                >
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                    
                </select>
            </div>

            <div>
                <h2 className="mt-2 font-bold text-gray-800">Resumen del Pedido</h2>
                {
                    pedido.pedido.map( articulo => (
                        <div
                            key={articulo.id}
                            className="mt-4"
                        >
                            <p className="text-sm text-gray-600">Producto: {articulo.nombre}</p>
                            <p className="text-sm text-gray-600">Cantidad: {articulo.cantidad}</p>
                        </div>
                    ))
                }

                <p className="text-gray-800 mt-3 font-bold">Total a pagar:
                    <span className="font-light text-md"> ${total}</span>
                </p>

                <button
                    className="flex items-center mt-4 bg-red-800 px-5 py-2 uppercase text-xs
                               inline-block text-white rounded leading-tight font-bold"
                    onClick={ () => confirmarEliminarPedido() }
                >
                    Eliminar 
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>
            </div>
        </div>
    )
};

export default Pedido;
