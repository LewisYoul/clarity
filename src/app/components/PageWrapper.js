'use client'

import ModalProvider from "../contexts/modalContext";
import NotificationProvider from "../contexts/notificationContext";
import AlertProvider from "../contexts/alertContext";
import ListsProvider from "../contexts/ListsProvider";
import TasksProvider from "../contexts/TasksProvider";

const PageWrapper = ({ children }) => {

  return (
    <div className="relative isolate">
      <AlertProvider>
        <NotificationProvider>
          <ListsProvider>
            <TasksProvider>
              <ModalProvider>
                  {children}
              </ModalProvider>
            </TasksProvider>
          </ListsProvider>
        </NotificationProvider>
      </AlertProvider>
    </div>
  );
};

export default PageWrapper;
