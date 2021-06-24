import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

import { Loading } from '../components/Loading';
import Layout from '../components/Layout';
import Cliente from '../components/Cliente';

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor{
    obtenerClientesVendedor{
      id
      nombre
      apellido
      email
      empresa
      vendedor
    }
  }
`;

const Index = () => {

  const router = useRouter();

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  if(!loading && !data.obtenerClientesVendedor) {
    // window.location.replace('/login');
    router.push('/login');
  }

  return (
    <>
    { (!loading && data.obtenerClientesVendedor) ?
      <div>
        <Layout>
          
          <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
          <Link href="nuevoCliente">
            <a className="bg-blue-800 py-2 px-5 mt-5 inline-block rounded text-white text-sm hover:bg-gray-800 mb-2 uppercase font-bold">Nuevo Cliente</a>
          </Link>
        
          <table className="table-auto shadow-md mt-3 w-full w-lg">
                <thead className="bg-gray-800">
                  <tr className="text-white">
                    <th className="w-1/5 py-2">Nombre</th>
                    <th className="w-1/5 py-2">Empresa</th>
                    <th className="w-1/5 py-2">Email</th>
                    <th className="w-1/5 py-2">Eliminar</th>
                    <th className="w-1/5 py-2">Editar</th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {
                    (data.obtenerClientesVendedor) ? 
                      data.obtenerClientesVendedor.map( cliente => (
                        <Cliente 
                          key={cliente.id}
                          cliente={cliente}
                        />
                      ))
                      : <tr>
                          <td colSpan="3" className="text-center border px-4 py-2"><Loading /></td>
                        </tr>
                  }
                </tbody>
          </table>

        </Layout>
      </div> : null
      }
    </>
    
  )
  
};

export default Index;