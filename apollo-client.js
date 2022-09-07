import {ApolloClient, ApolloLink, concat, createHttpLink, gql, split} from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws";
import {AUTH_TOKEN} from "./components/utils/Constants";
import {getMainDefinition} from "@apollo/client/utilities";
import {Cache} from "./components/utils/Cache";
import {useMemo} from "react";


const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
});

const splitLink = process.browser ? split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    httpLink,
) : httpLink;


const authMiddleware = new ApolloLink((operation, forward) => {
    const token = process.browser ? localStorage.getItem(AUTH_TOKEN) : null;
    operation.setContext(({headers = {}}) => ({
        credentials: 'same-origin',
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : "",
        }
    }));
    return forward(operation);
})


if (process.browser) {

    const IS_LOGGED_IN = gql`
      query IsUserLoggedIn {
        isLoggedIn @client
      }
    `;

    Cache.writeQuery({
        query: IS_LOGGED_IN,
        data: {
            isLoggedIn: !!localStorage.getItem("token"),
        },
    });

}
let apolloClient;

export function createApolloClient() {
    return new ApolloClient({
        ssrMode: true,
        cache: Cache,
        link: concat(authMiddleware, httpLink),
    });
}


export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();
    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore({...existingCache, ...initialState});
    }
    if (typeof window === "undefined") return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState) {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}
