'use client'

import CreditsProvider from "../contexts/creditsContext";
import ModalProvider from "../contexts/modalContext";

const PageWrapper = ({ children }) => {

  return (
    <ModalProvider>
      <CreditsProvider>
        {children}
      </CreditsProvider>
    </ModalProvider>
  );
};

export default PageWrapper;
