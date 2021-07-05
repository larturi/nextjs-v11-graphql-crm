import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import { useQuery } from '@apollo/client';
import { OBTENER_USUARIO } from '../config/gql';

// Context de Auth
import AuthContext from '../context/auth/AuthContext';

const Header = () => {

    const router = useRouter();

    // Utilizar Context Auth
    const authContext = useContext(AuthContext);
    const { logout } = authContext;

    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    // Si no hay informacion

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        logout();
        router.push('/login');
    }

    return (
        <>
            {
                (!loading && data.obtenerUsuario) ?
                <div className="sm:flex sm:justify-between mb-6">
                    <p className="mr-2 mb-4 lg:mb-0">Hola { data.obtenerUsuario.nombre } 👋 </p>

                    <button
                        onClick={ () => cerrarSesion() }
                        type="button"
                        className="bg-gray-700 w-full sm:w-auto font-bold text-white rounded py-3 px-5 text-xs uppercase shadow-md hover:bg-gray-800"
                    >
                        Cerrar Sesión
                    </button>
                </div> : null
            }
        </>
    )
}

export default Header;