import { ApolloProvider } from '@apollo/client';
import client from '../config/apollo';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import PedidoState from '../context/pedidos/pedidoState';
import AuthState from '../context/auth/AuthState';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <AuthState>
        <PedidoState>
          <Component {...pageProps} />
        </PedidoState>
      </AuthState>
    </ApolloProvider>
  )
}

export default MyApp;
