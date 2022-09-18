import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/Layout'
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
    <SessionProvider session={pageProps.session}>
     <Head>
        <title>Venture</title>
      </Head>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </SessionProvider>  
  )
}

export default MyApp
