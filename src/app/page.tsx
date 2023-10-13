'use client'
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Heading from '@/components/home page/Heading';
import Lists from '@/components/home page/Lists';
import Sorting from '@/components/home page/Sorting';
import Login from './Login';
import { Provider } from 'react-redux';
import store from '../components/home page/redux/store';

interface PageProps {
  Components: React.ComponentType<any>;
  pageProps: any;
}

const Page: React.FC<PageProps> = ({ pageProps }) => {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setIsUserAuthenticated(!!authUser); 
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isUserAuthenticated ? (
        <Provider store={store}>
          <>
            <Sidebar />
            <Header />
            <section className="relative pl-44">
              <Heading />
              <Sorting />
              <Lists {...pageProps} />
            </section>
          </>
        </Provider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Page;
