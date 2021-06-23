import React from 'react';

import Layout from '../components/Layout';

const nuevoCliente = () => {
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form 
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
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

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                Empresa
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="apellido"
                                type="text"
                                placeholder="Empresa"
                                // onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                // value={formik.values.empresa}
                            />
                        </div>

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

export default nuevoCliente;
