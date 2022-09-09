import '../styles/globals.css'
import {ApolloProvider} from "@apollo/client";
import {useApollo} from "../apollo-client";
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../src/Theme';
import {createTheme, responsiveFontSizes} from "@mui/material";

export default function MyApp(props) {
    const {Component, pageProps} = props;
    const apolloClient = useApollo(pageProps.initialApolloState);

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>OranWeb</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
