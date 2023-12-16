// pages/_app.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {LoadingIndicator} from '../components';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <div>
      {loading ? (
        <LoadingIndicator onComplete={!loading} />
      ) : (
        <Component {...pageProps} />
      )}
    </div>
  );
}