import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

import Layout from '../../components/Layout';
import { OBTENER_CLIENTE, ACTUALIZAR_CLIENTE } from '../../config/gql';

// Context de Auth
import AuthContext from '../../context/auth/AuthContext';

const EditarCliente = () => {

    const router = useRouter();
    const { query: { id} } = router;

    // Utilizar Context Auth
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;

    useEffect(() => {
        if (!isAuthenticated && localStorage.getItem('token') === null) {
            router.push('/login');  
        }
    }, []);


    // Obtengo el cliente para precargar el formulario
    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    });

    // Actualizar Cliente
    const [ actualizarCliente ] = useMutation(ACTUALIZAR_CLIENTE);

    // Validaciones Formulario
    const schemaValidacion = Yup.object({
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
    });

    // Actualiza Cliente en BD
    const actualizarInfoCliente = async valores => {

        const { nombre, apellido, empresa, email, telefono } = valores;

        try {
            const data = await actualizarCliente({
                variables: {
                    id,
                    input: {
                        nombre,
                        apellido, 
                        empresa, 
                        email, 
                        telefono
                    }
                }
            });

            Swal.fire(
                'Actualizado!',
                'El cliente ha sido actualizado correctamente',
                'success'
            );

            router.push('/');
        } catch (error) {
            console.error(error);
        }

    };

    if (loading) {
        return 'Cargando...';
    } else {

        const { obtenerCliente } = data;

        return (
            isAuthenticated &&
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">

                        <Formik
                            validationSchema={schemaValidacion}
                            enableReinitialize
                            initialValues={obtenerCliente}
                            onSubmit={ (values) => {
                                actualizarInfoCliente(values);
                            }}
                        >
                            {
                                
                                props => {

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
                                                    placeholder="Nombre"
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
                                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                                    Apellido
                                                </label>
                                                <input 
                                                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                                    id="apellido"
                                                    type="text"
                                                    placeholder="Apellido"
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.apellido}
                                                />
                                            </div>

                                            { props.touched.apellido &&props.errors.apellido ? (
                                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                                        <p>{props.errors.apellido}</p>
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
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.empresa}
                                                />
                                            </div>

                                            { props.touched.empresa &&props.errors.empresa ? (
                                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                                        <p>{props.errors.empresa}</p>
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
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.email}
                                                />
                                            </div>

                                            { props.touched.email &&props.errors.email ? (
                                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                                        <p>{props.errors.email}</p>
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
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.telefono}
                                                />
                                            </div>

                                            { props.touched.telefono &&props.errors.telefono ? (
                                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                                        <p>{props.errors.telefono}</p>
                                                    </div>
                                                ) : null }

                                            <input 
                                                type="submit"
                                                className="bg-gray-800 w-full mt-5 p-2 cursor-pointer text-white uppercase hover:bg-gray-900"
                                                value="Actualizar Cliente"
                                            />

                                        </form>

                                    )
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </Layout>
        )
    }
};

export default EditarCliente;
