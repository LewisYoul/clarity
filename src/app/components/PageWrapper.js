'use client'

import ModalProvider from "../contexts/modalContext";
import NotificationProvider from "../contexts/notificationContext";
import AlertProvider from "../contexts/alertContext";
import ListsProvider from "../contexts/ListsProvider";

const PageWrapper = ({ children }) => {

  return (
    <ListsProvider>
      <AlertProvider>
        <NotificationProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </NotificationProvider>
      </AlertProvider>
    </ListsProvider>
  );
};

export default PageWrapper;
