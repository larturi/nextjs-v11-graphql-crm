import React, { useState, useEffect, useContext } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProductos from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';

import { OBTENER_PEDIDOS_VENDEDOR } from '../config/gql';

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput){
    nuevoPedido(input:$input) {
      id
    }    
  }
`;

// Context de Pedidos
import PedidoContext from '../context/pedidos/PedidoContext';

// Context Auth
import AuthContext from '../context/auth/AuthContext';

const NuevoPedido = () => {

    const router = useRouter();

    const [mensaje, setMensaje] = useState(null);

    // Utilizar Context Auth
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;

    useEffect(() => {
        if (!isAuthenticated && localStorage.getItem('token') === null) {
            router.push('/login');  
        }
    }, []);

    // Utilizar Context y extraer sus valores y funciones
    const pedidoContext = useContext(PedidoContext);
    const { cliente, productos, total } = pedidoContext;

    // Mutation para crear un nuevo pedido
    const [ nuevoPedido ] = useMutation(NUEVO_PEDIDO, {
        update(cache, { data: { nuevoPedido }}) {
            const { obtenerPedidosVendedor } = cache.readQuery({
                query: OBTENER_PEDIDOS_VENDEDOR,
                variables: {
                    eliminado: false
                }
            });

            cache.writeQuery({
                query: OBTENER_PEDIDOS_VENDEDOR,
                variables: {
                    eliminado: false
                },
                data: {
                    obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
                }
            });
        }
    });

    const validarPedido = () => {
        return !productos.every( producto => producto.cantidad > 0 ) || total === 0 || cliente.length === 0 ? " opacity-50 cursor-not-allowed " : "";
    };

    const crearNuevoPedido = async () => {
        
        // Armo el arreglo de productos con lo que pide graphQL
        const pedido = productos.map( ( {stock, eliminado, creado, __typename, ...producto} ) => producto );

        try {
            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: cliente.id,
                        total,
                        pedido
                    }
                }
            });

            // Redirect
            router.push('/pedidos');

            Swal.fire(
                'Correcto',
                'El pedido se registró correctamente',
                'success'
            );

        } catch (error) {
            router.push('/pedidos');
        }
    };

    const mostrarMensaje = () => {
        return (
            <div className="bg-blue-700 py-2 px-3 w-full mt-6 max-w-lg text-white text-center mx-auto">
                <p>
                    {mensaje}
                </p>
            </div>
        )
    };
    

    return (

        isAuthenticated &&
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>

            { mensaje && mostrarMensaje() }

            <div className="flex justify-center mt-2">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProductos />
                    <ResumenPedido />
                    <Total />

                    <button
                        type="button"
                        onClick={ () => crearNuevoPedido() }
                        className={` bg-gray-800 mt-5 p-2 uppercase text-white w-full font-bold hover:bg-gray-900 ${ validarPedido() }`}
                    >
                        Registrar Pedido
                    </button>
                </div>
            </div>
        </Layout>
    )
};

export default NuevoPedido;
