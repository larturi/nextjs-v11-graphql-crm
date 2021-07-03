import React, { useEffect, useContext } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import Layout from '../components/Layout';
import { OBTENER_PRODUCTOS, NUEVO_PRODUCTO } from '../config/gql';

// Context de Auth
import AuthContext from '../context/auth/AuthContext';

const NuevoProducto = () => {

    const router = useRouter();

    // Utilizar Context Auth
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;

    useEffect(() => {
        if (!isAuthenticated && localStorage.getItem('token') === null) {
            router.push('/login');  
        }
    }, []);

    // Mutation de Apollo
    const [ nuevoProducto ] = useMutation(NUEVO_PRODUCTO, {
        update(cache, {data: { nuevoProducto }}) {
            const { obtenerProductos } = cache.readQuery({ 
                query: OBTENER_PRODUCTOS, 
                variables: {
                    eliminado: false
                }
            });

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                variables: {
                    eliminado: false
                },
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto ]
                }
            });
        }
    });

    // Formulario con Formik
    const formik = useFormik({
        initialValues: {
            nombre: '',
            stock: '',
            precio: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                       .required('El nombre del producto es obligatorio'),
            stock: Yup.number()
                      .required('Agrega la cantidad disponible del producto')
                      .positive('Debe ser mayor a cero')
                      .integer('Debe ser un numer entero'),
            precio: Yup.number()
                      .required('El precio es obligatorio')
                      .positive('Debe ser mayor a cero')
        }),
        onSubmit: async values => {

            const { nombre, stock, precio } = values;

            try {
                const { data } = await nuevoProducto({
                    variables: {
                        input: {
                            nombre,
                            stock,
                            precio
                        }
                    }
                });

                Swal.fire(
                    'Producto Creado!',
                    'Producto creado correctamente',
                    'success'
                );

                router.push('/productos');
                
            } catch (error) {
                console.error(error);
            }

        }
    });

    return (
        isAuthenticated &&
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    {/* { mensaje && mostrarMensaje() } */}

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
                                placeholder="Nombre Producto"
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                Stock
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="stock"
                                type="number"
                                placeholder="Stock disponible"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.stock}
                            />
                        </div>

                        { formik.touched.stock &&formik.errors.stock ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.stock}</p>
                                </div>
                            ) : null }

                        <div className="mt-3">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                Precio
                            </label>
                            <input 
                                className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                id="precio"
                                type="number"
                                placeholder="Precio"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.precio}
                            />
                        </div>

                        { formik.touched.precio &&formik.errors.precio ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.precio}</p>
                                </div>
                            ) : null }

                        <input 
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 cursor-pointer text-white uppercase hover:bg-gray-900"
                            value="Guardar Producto"
                        />

                    </form>

                </div>
            </div>
        </Layout>
    )
};

export default NuevoProducto;
