import '../styles/globals.scss';
import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import electron from 'electron';

if (electron && electron.ipcRenderer) {
  electron.ipcRenderer.send('getPythonPort');
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>Cilveku Skaitisana</title>
      </Head>
        <Component {...pageProps} />
        <style jsx global>{`
				@font-face {
					font-family: system;
					font-style: normal;
					font-weight: 100;
					src: url('/fonts/Poppins-Thin.ttf') format('truetype');
				}

				@font-face {
					font-family: system;
					font-style: normal;
					font-weight: 300;
					src: url('/fonts/Poppins-Regular.ttf') format('truetype');
				}

				@font-face {
					font-family: system;
					font-style: normal;
					font-weight: 600;
					src: url('/fonts/Poppins-Bold.ttf') format('truetype');
				}
			`}</style>
    </React.Fragment>
  );
}
