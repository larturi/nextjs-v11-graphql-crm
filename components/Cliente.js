import React from 'react';
import Swal from 'sweetalert2';

const Cliente = ({ cliente }) => {

    const { id, nombre, apellido, email, empresa } = cliente;

    const confirmarEliminarCliente = (id) => {
        Swal.fire({
            title: 'Deseas eliminar este cliente?',
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                console.log('Eliminando...', id);
                Swal.fire(
                  'Eliminado!',
                  'El cliente ha sido eliminado.',
                  'success'
                )
            }
            })
    };

    return (
        <tr>
            <td className="border px-4 py-2">{ nombre } { apellido }</td>
            <td className="border px-4 py-2">{ empresa } </td>
            <td className="border px-4 py-2">{ email } </td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={ () => confirmarEliminarCliente(id) }
               >
                    Elininar
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </button>    
            </td>
        </tr>
    )
};

export default Cliente;
