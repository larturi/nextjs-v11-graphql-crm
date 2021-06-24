import React from 'react';
import { useRouter } from 'next/router';

import { gql, useQuery } from '@apollo/client';

import Layout from '../../components/Layout';

const OBTENER_CLIENTE = gql`
    query obtenerCliente($id: ID!){
        obtenerCliente(id: $id) {
            id
            nombre
            apellido
            email
            empresa
            vendedor
        }
    }
`;

const EditarCliente = () => {

    const router = useRouter();
    const { query: { id} } = router;

    // Obtengo el cliente para precargar el formulario
    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    });

    if (loading) return 'Cargando...';

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <form 
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        // onSubmit={formik.handleSubmit}
                    >

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                Nombre
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="nombre"
                                type="text"
                                placeholder="Nombre"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.nombre}
                            />
                        </div>

                        {/* { formik.touched.nombre &&formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null } */}

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                Apellido
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="apellido"
                                type="text"
                                placeholder="Apellido"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.apellido}
                            />
                        </div>

                        {/* { formik.touched.apellido &&formik.errors.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.apellido}</p>
                                </div>
                            ) : null } */}

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                Empresa
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="empresa"
                                type="text"
                                placeholder="Empresa"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.empresa}
                            />
                        </div>

                        {/* { formik.touched.empresa &&formik.errors.empresa ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.empresa}</p>
                                </div>
                            ) : null } */}

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="email"
                                type="email"
                                placeholder="Email"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.email}
                            />
                        </div>

                        {/* { formik.touched.email &&formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null } */}

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                Teléfono
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="telefono"
                                type="tel"
                                placeholder="Teléfono"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.telefono}
                            />
                        </div>

                        {/* { formik.touched.telefono &&formik.errors.telefono ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.telefono}</p>
                                </div>
                            ) : null } */}

                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 cursor-pointer text-white uppercase hover:bg-gray-900"
                            value="Registrar Cliente"
                        />

                    </form>
                </div>
            </div>
        </Layout>
    )
};

export default EditarCliente;
