import React, { useEffect, useContext } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Pedido from '../components/pedidos/Pedido';

import { OBTENER_PEDIDOS_VENDEDOR } from '../config/gql';

// Context Auth
import AuthContext from '../context/auth/AuthContext';
import { Loading } from '../components/Loading';

const Pedidos = () => {

  const router = useRouter();

  // Utilizar Context Auth
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (!isAuthenticated && localStorage.getItem('token') === null) {
        router.push('/login');  
    }
  }, []);

  const { data, loading, error } = useQuery(OBTENER_PEDIDOS_VENDEDOR);
  
  if(loading) return <Loading />;

  const { obtenerPedidosVendedor } = data;

  return (
    isAuthenticated &&
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

        <Link href="/nuevopedido">
            <a className="bg-blue-800 w-full text-center sm:w-auto py-3 px-5 mt-5 inline-block rounded text-white text-sm hover:bg-gray-800 mb-2 uppercase font-bold">Nuevo Pedido</a>
        </Link>

        {
          isAuthenticated && obtenerPedidosVendedor.length === 0 ? (
            <p className="mt-5 text-center text-2xl">No hay pedidos</p>
          ) : (
            obtenerPedidosVendedor.map(pedido => (
              <Pedido
                key={pedido.id}
                pedido={pedido}
              />
            ))
          )
        }

      </Layout>
    </div>
  )
};

export default Pedidos;