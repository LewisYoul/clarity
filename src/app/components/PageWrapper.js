'use client'

import CreditsProvider from "../contexts/creditsContext";

const PageWrapper = ({ children }) => {

  return (
    <CreditsProvider>
      {children}
    </CreditsProvider>
  );
};

export default PageWrapper;
