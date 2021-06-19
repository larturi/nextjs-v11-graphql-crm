import React from 'react';
import Layout from '../components/Layout';

const Login = () => {
    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">Login</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-md px-4">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input 
                                    className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:border-gray-600"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>

                            <input 
                                type="submit"
                                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                value="Iniciar Sesión"
                            />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
};

export default Login;
