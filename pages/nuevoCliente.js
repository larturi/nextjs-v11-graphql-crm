import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import Layout from '../components/Layout';

import { NUEVO_CLIENTE, OBTENER_CLIENTES_USUARIO } from '../config/gql';

// Context de Auth
import AuthContext from '../context/auth/AuthContext';

const NuevoCliente = () => {

    const router = useRouter();

    const [ mensaje, setMensaje ] = useState(null);

    // Utilizar Context Auth
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;

    useEffect(() => {
        if (!isAuthenticated && localStorage.getItem('token') === null) {
            router.push('/login');  
        }
    }, []);

    const [ nuevoCliente ] = useMutation(NUEVO_CLIENTE, {
        update(cache, { data: { nuevoCliente }}) {
            // Obtener el objeto de cache que vamos a actualizar
            const { obtenerClientesVendedor } = cache.readQuery({ 
                query: OBTENER_CLIENTES_USUARIO,
                variables: {
                    eliminado: false
                }
            });

            // Reescribo el cache (es inmutable)
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                variables: {
                    eliminado: false
                },
                data: {
                    obtenerClientesVendedor: [ ...obtenerClientesVendedor, nuevoCliente ]
                }
            })

        }
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                       .required('El nombre es obligatorio'),
            apellido: Yup.string()
                       .required('El apellido es obligatorio'),
            empresa: Yup.string()
                       .required('El nombre de la empresa es obligatorio'), 
            email: Yup.string()
                       .required('El email es obligatorio')
                       .email('Debe ingresar un email valido'),
            telefono: Yup.string()
                       .required('El telefono es obligatorio')
                       .min(8, 'Minimo 8 caracteres')    
        }),
        onSubmit: async valores => {

            const { nombre, apellido, empresa, email, telefono } = valores;

            try {
                const { data } = await nuevoCliente({
                    variables: {
                        input: {
                            nombre, 
                            apellido, 
                            empresa, 
                            email, 
                            telefono
                        }
                    }
                });

                router.push('/');

                Swal.fire(
                    'Cliente Creado!',
                    'Cliente creado correctamente',
                    'success'
                );

            } catch (error) {
                setMensaje(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    setMensaje(null);
                }, 2000);
            }
        }
    });

    const mostrarMensaje = () => {
        return (
            <div className="bg-gray-800 text-white py-2 px-3 w-full my-3 text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    };

    return (
        isAuthenticated &&
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                { mensaje && mostrarMensaje() }


                    <form 
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                        </div>

                        { formik.touched.nombre &&formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null }

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                Apellido
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="apellido"
                                type="text"
                                placeholder="Apellido"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido}
                            />
                        </div>

                        { formik.touched.apellido &&formik.errors.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.apellido}</p>
                                </div>
                            ) : null }

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                                Empresa
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="empresa"
                                type="text"
                                placeholder="Empresa"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.empresa}
                            />
                        </div>

                        { formik.touched.empresa &&formik.errors.empresa ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.empresa}</p>
                                </div>
                            ) : null }

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="email"
                                type="email"
                                placeholder="Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>

                        { formik.touched.email &&formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null }

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                Teléfono
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="telefono"
                                type="tel"
                                placeholder="Teléfono"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono}
                            />
                        </div>

                        { formik.touched.telefono &&formik.errors.telefono ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.telefono}</p>
                                </div>
                            ) : null }

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

export default NuevoCliente;
