// pages/_app.js
import React from "react";
import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Psynch</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
