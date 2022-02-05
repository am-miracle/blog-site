import React from 'react';
import Header from './Header';

const Layout = ({children}) => {
  return (
      <>
          <title>Blog Site</title>
          <Header />
          {children}
      </>
  );
};

export default Layout;
