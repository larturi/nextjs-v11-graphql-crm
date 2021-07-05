import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {

    const router = useRouter();

    const [showMenu, setShowMenu] = useState('hidden');

    const handleClick = (e) => {
        e.preventDefault();
        if (showMenu === 'hidden') {
            setShowMenu('');
        } else {
            setShowMenu('hidden');
        }
    }

    return (
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div className="flex justify-between">
                <p className="text-white text-2xl font-black">CRM Clientes</p>
                <p 
                    className="sm:hidden block"
                    onClick={handleClick}
                >
                    <svg className="w-6 h-6 mt-1 text-white cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </p>
            </div>

            <nav className={"mt-6 list-none sm:block " + showMenu}>
                <li className={router.pathname === '/' ? "bg-indigo-600 p-2" : "p-2"}>
                    <Link href="/">
                        <a className="text-white mb-2 mt-2 block">Clientes</a>
                    </Link>
                </li>
                <li className={router.pathname === '/pedidos' ? "bg-indigo-600 p-2" : "p-2"}>
                    <Link href="/pedidos">
                        <a className="text-white mb-2 mt-2 block">Pedidos</a>
                    </Link>
                </li>
                <li className={router.pathname === '/productos' ? "bg-indigo-600 p-2" : "p-2"}>
                    <Link href="/productos">
                        <a className="text-white mb-2 mt-2 block">Productos</a>
                    </Link>
                </li>

                <li className={router.pathname === '/mejoresvendedores' ? "bg-indigo-600 p-2" : "p-2"}>
                    <Link href="/mejoresvendedores">
                        <a className="text-white mb-2 mt-2 block">Mejores Vendedores</a>
                    </Link>
                </li>
                <li className={router.pathname === '/mejoresclientes' ? "bg-indigo-600 p-2" : "p-2"}>
                    <Link href="/mejoresclientes">
                        <a className="text-white mb-2 mt-2 block">Mejores Clientes</a>
                    </Link>
                </li>
            </nav>

           
        </aside>
    )
}

export default Sidebar;