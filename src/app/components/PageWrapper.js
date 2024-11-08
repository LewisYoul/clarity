'use client'

import ModalProvider from "../contexts/modalContext";
import NotificationProvider from "../contexts/notificationContext";
import AlertProvider from "../contexts/alertContext";
import ListsProvider from "../contexts/ListsProvider";
import TasksProvider from "../contexts/TasksProvider";
import MobileMenuProvider from "../contexts/MobileMenuProvider";

const PageWrapper = ({ children }) => {

  return (
    <div className="relative isolate">
      <AlertProvider>
        <NotificationProvider>
          <ModalProvider>
            <ListsProvider>
              <MobileMenuProvider>
                <TasksProvider>
                  {children}
                </TasksProvider>
              </MobileMenuProvider>
            </ListsProvider>
          </ModalProvider>
        </NotificationProvider>
      </AlertProvider>
    </div>
  );
};

export default PageWrapper;
