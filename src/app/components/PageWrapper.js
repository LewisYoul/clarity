'use client'

import ModalProvider from "../contexts/modalContext";
import NotificationProvider from "../contexts/notificationContext";
import AlertProvider from "../contexts/alertContext";
import ListsProvider from "../contexts/ListsProvider";

const PageWrapper = ({ children }) => {

  return (
    <div className="relative isolate">
      <AlertProvider>
        <NotificationProvider>
          <ListsProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </ListsProvider>
        </NotificationProvider>
      </AlertProvider>
    </div>
  );
};

export default PageWrapper;
