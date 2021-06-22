import React from 'react';
import { useRouter } from 'next/router';

import { gql, useQuery } from '@apollo/client';

const OBTENER_USUARIO = gql`
    query obtenerUsuario {
        obtenerUsuario {
            id
            nombre
            apellido
            email
            creado
        }
    }
`;

const Header = () => {

    const router = useRouter();

    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    // Proteger que no accedamos a data antes de tener resultados
    if(loading) return null;

    // Si no hay informacion
    if(!data) {
        return router.push('/login');
    }

    const { nombre } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className="flex justify-between mb-6">
            <p className="mr-2">Hola {nombre}</p>

            <button
                onClick={ () => cerrarSesion() }
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold text-white rounded py-3 px-5 text-xs uppercase shadow-md"
            >
                Cerrar Sesión
            </button>
        </div>
    )
}

export default Header;