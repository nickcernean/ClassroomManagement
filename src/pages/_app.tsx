import "@/styles/globals.css";
import React from "react";
import AppContainer from "../containers/AppContainer";
import type { AppProps } from "next/app";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
        <Head>
          <title>Classroom Management</title>
        </Head>
        <Component {...pageProps} />
    </AppContainer>
  );
}