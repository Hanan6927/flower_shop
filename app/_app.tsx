// pages/_app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from './utils/authContext';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
