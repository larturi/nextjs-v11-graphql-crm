import Layout from '../components/Layout';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import Pedido from '../components/pedidos/pedido';

import { OBTENER_PEDIDOS_VENDEDOR } from '../config/gql';

const Pedidos = () => {

  const { data, loading, error } = useQuery(OBTENER_PEDIDOS_VENDEDOR);
  
  if(loading) return 'Cargando...';

  const { obtenerPedidosVendedor } = data;

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

        <Link href="/nuevopedido">
            <a className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-white text-sm hover:bg-gray-800 mb-2 uppercase font-bold">Nuevo Pedido</a>
        </Link>

        {
          obtenerPedidosVendedor.length === 0 ? (
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