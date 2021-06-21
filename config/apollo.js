import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    fetch
});

const authLink = setContext((_, {headers}) => {

    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: process.env.NEXT_PUBLIC_CONNECT_DEVTOOLS_APOLLO,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;