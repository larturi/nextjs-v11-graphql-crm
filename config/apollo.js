import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';

const client = new ApolloClient({
    connectToDevTools: process.env.NEXT_PUBLIC_CONNECT_DEVTOOLS_APOLLO,
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL,
        fetch
    })
});

export default client;