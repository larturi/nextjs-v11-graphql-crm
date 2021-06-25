import { gql, useQuery } from '@apollo/client';

import Producto from '../components/Producto';
import Layout from '../components/Layout';
import { Loading } from '../components/Loading';

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      stock
      precio
      creado
    }
  }
`;

const Productos = () => {

  // Consultar los productos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  if (loading) {
    return 'Cargando...';
  } else {

    return (
      <div>
        <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Productos</h1>

          <table className="table-auto shadow-md mt-3 w-full w-lg">
                <thead className="bg-gray-800">
                  <tr className="text-white">
                    <th className="w-1/5 py-2">Nombre</th>
                    <th className="w-1/5 py-2">Stock</th>
                    <th className="w-1/5 py-2">Precio</th>
                    <th className="w-1/5 py-2">Eliminar</th>
                    <th className="w-1/5 py-2">Editar</th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {
                    (data.obtenerProductos) ? 
                      data.obtenerProductos.map( producto => (
                        <Producto
                          key={producto.id}
                          producto={producto}
                        />
                      ))
                      : <tr>
                          <td colSpan="3" className="text-center border px-4 py-2"><Loading /></td>
                        </tr>
                  }
                </tbody>
          </table>

        </Layout>
      </div>
    )
  }
  
};

export default Productos;