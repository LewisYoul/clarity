'use client'

import ModalProvider from "../contexts/modalContext";
import NotificationProvider from "../contexts/notificationContext";
import AlertProvider from "../contexts/alertContext";
const PageWrapper = ({ children }) => {

  return (
    <AlertProvider>
      <NotificationProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </NotificationProvider>
    </AlertProvider>
  );
};

export default PageWrapper;
