import { AppProps } from 'next/app';
import Head from 'next/head';
import '../../../libs/tailwind/src/lib/syle.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to React Next 2021!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
