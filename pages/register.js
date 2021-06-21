import React, { useState } from 'react';
import Layout from '../components/Layout';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const NUEVA_CUENTA = gql`
    mutation nuevoUsuario ($input: UsuarioInput) {
        nuevoUsuario (input: $input) {
            id,
            nombre,
            apellido,
            email
        }
    }  
`;

const Register = () => {

    // State para el mensaje una vez registrado
    const [ mensaje, setMensaje ] = useState(null);
    const [ error, setError ] = useState(null);

    // Mutation para crear una nueva cuenta
    const [ nuevoUsuario ] = useMutation(NUEVA_CUENTA);

    // Validacion del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            email: Yup.string().email('El email debe tener un formato válido').required('El email es obligatorio'),
            password: Yup.string().required('El password es obligatorio').min(6, 'Minimo 6 caracteres'),
        }),
        onSubmit: async valores => {
            const { nombre, apellido, email, password } = valores;

            try {
                await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                });

                setMensaje('Usuario creado correctamente');
                setTimeout(() => {
                    setMensaje(null);
                }, 3000);

            } catch (error) {
                setMensaje(error.message.replace('GraphQL error:', ''));
                setError(true);
                setTimeout(() => {
                    setMensaje(null);
                    setError(null);
                }, 3000);
            }
        }
    });

    const mostrarMensaje = () => {
        return (
            <div className={"py-3 max-w-md mt-3 -mb-2 text-white rounded my-3 text-center mx-auto " + (error ? 'bg-red-700' : 'bg-green-700') }>
                <p>{mensaje}</p>
            </div>
        )
    };

    return (
        <>
            <Layout>

                <h1 className="text-center text-2xl text-white font-light">Crear Nueva Cuenta</h1>

                <div className="flex justify-center mt-5">
                
                    <div className="w-full max-w-md px-4">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >

                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input 
                                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            { formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null }

                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                    Apellido
                                </label>
                                <input 
                                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                    id="apellido"
                                    type="text"
                                    placeholder="Apellido"
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            { formik.touched.apellido && formik.errors.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.apellido}</p>
                                </div>
                            ) : null }

                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            { formik.touched.email &&formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null }

                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input 
                                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            { formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null }

                            <input 
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 cursor-pointer text-white uppercase hover:bg-gray-900"
                                value="Crear Cuenta"
                            />

                            { mensaje && mostrarMensaje() }

                        </form>
                    </div>
                    
                </div>

            </Layout>
        </>
    )
};

export default Register;
