import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { Loading } from '../components/Loading';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { gql, useQuery } from '@apollo/client';

const MEJORES_VENDEDORES = gql`
    query mejoresVendedores {
        mejoresVendedores {
            vendedor {
                nombre
                email
            }
            total
        }
    }
`;

// Context de Auth
import AuthContext from '../context/auth/AuthContext';

const MejoresVendedores = () => {

    const router = useRouter();

    // Utilizar Context Auth
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;

    useEffect(() => {
        if (!isAuthenticated && localStorage.getItem('token') === null) {
            router.push('/login');  
        }
    }, []);

    const { data, loading, error, startPolling, stopPolling } = useQuery(MEJORES_VENDEDORES);

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        };
    }, [startPolling, stopPolling]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    const { mejoresVendedores } = data;

    const vendedorGrafica = [];

    mejoresVendedores.map((vendedor, index) => {
        vendedorGrafica[index] = {
            ...vendedor.vendedor[0],
            total: vendedor.total
        }
    });

    return (
        isAuthenticated &&
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores Vendedores</h1>

            <ResponsiveContainer
                width={'99%'}
                height={550}
            >
                <BarChart
                    className="mt-10"
                    width={600}
                    height={500}
                    data={vendedorGrafica}
                    margin={{
                        top: 30,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182CE" />
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    )
};

export default MejoresVendedores;