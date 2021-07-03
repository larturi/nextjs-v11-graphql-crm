import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import Layout from '../../components/Layout';
import { OBTENER_PRODUCTO, ACTUALIZAR_PRODUCTO } from '../../config/gql';

// Context de Auth
import AuthContext from '../../context/auth/AuthContext';

const EditarProducto = () => {

    const router = useRouter();
    const { query: { id } } = router;

    // Utilizar Context Auth
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;

    useEffect(() => {
        if (!isAuthenticated && localStorage.getItem('token') === null) {
            router.push('/login');  
        }
    }, []);

    // Obtengo el Producto  para precargar el formulario
    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
        variables: {
            id
        }
    });

    // Actualizar Producto 
    const [ actualizarProducto ] = useMutation(ACTUALIZAR_PRODUCTO);

    // Validaciones Formulario
    const schemaValidacion = Yup.object({
        nombre: Yup.string()
                   .required('El nombre del producto es obligatorio'),
        stock: Yup.number()
                  .required('Agrega la cantidad disponible del producto')
                  .positive('Debe ser mayor a cero')
                  .integer('Debe ser un numer entero'),
        precio: Yup.number()
                   .required('El precio es obligatorio')
                   .positive('Debe ser mayor a cero')
    });

    // Actualiza Producto en BD
    const actualizarInfoProducto = async valores => {

        const { nombre, stock, precio } = valores;

        try {
            const data = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre,
                        stock, 
                        precio
                    }
                }
            });

            Swal.fire(
                'Actualizado!',
                'El producto ha sido actualizado correctamente',
                'success'
            );

            router.push('/productos');
        } catch (error) {
            console.error(error);
        }

    };

    if (loading) {
        return 'Cargando...';
    } else {

        const { obtenerProducto } = data;

        return (
            isAuthenticated &&
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Editar Producto</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">

                        {/* { mensaje && mostrarMensaje() } */}

                        <Formik
                            enableReinitialize
                            initialValues={obtenerProducto}
                            validationSchema={schemaValidacion}
                            onSubmit= { values => {
                                actualizarInfoProducto(values)
                            }}
                        >

                            { props => {
                                return (
                                            
                                    <form 
                                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                        onSubmit={props.handleSubmit}
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
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.nombre}
                                            />
                                        </div>

                                        { props.touched.nombre &&props.errors.nombre ? (
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                                    <p>{props.errors.nombre}</p>
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
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.stock}
                                            />
                                        </div>

                                        { props.touched.stock &&props.errors.stock ? (
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                                    <p>{props.errors.stock}</p>
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
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                                value={props.values.precio}
                                            />
                                        </div>

                                        { props.touched.precio &&props.errors.precio ? (
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                                    <p>{props.errors.precio}</p>
                                                </div>
                                            ) : null }

                                        <input 
                                            type="submit"
                                            className="bg-gray-800 w-full mt-5 p-2 cursor-pointer text-white uppercase hover:bg-gray-900"
                                            value="Editar Producto"
                                        />

                                    </form>
                                )
                            }}
                        </Formik>

                    </div>
                </div>

            </Layout>
        )
    }
};

export default EditarProducto;
