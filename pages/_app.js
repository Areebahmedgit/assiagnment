// import Header from '@/component/header'
// import '@/styles/globals.css'
// import Head from 'next/head'
// import { SessionProvider } from 'next-auth/react'
// export default function App({ Component, pageProps}) {
//   return (

// <SessionProvider session={Component}/>
// <Head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous"/></Head>
// <Header/>
//   <Component {...pageProps} />

//   </SessionProvider>
  
//   )
// }
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import Head from 'next/head';
import Header from '@/component/header';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
            crossorigin="anonymous"
          />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
          <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.3/animate.min.css'/>
        </Head>
        <Header />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

