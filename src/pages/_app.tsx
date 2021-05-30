import { Reset } from '@src/styles/reset';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
