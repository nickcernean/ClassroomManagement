import "@/styles/globals.css";
import React from "react";
import AppContainer from "../containers/AppContainer";
import type { AppProps } from "next/app";
import Head from "next/head";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Head>
          <title>Classroom Management</title>
        </Head>
        <Component {...pageProps} />
      </LocalizationProvider>
    </AppContainer>
  );
}
