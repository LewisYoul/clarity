"use client";

import { useState, useEffect } from 'react';

const Toast = () => {
  const [toastMessage, setToastMessage] = useState();

  useEffect(() => {
    const showToast = (event) => {
      setToastMessage(event.detail.message);

      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    };

    document.addEventListener('showToast', showToast);

    return () => {
      document.removeEventListener('showToast', showToast);
    };
  }, []);

  return (
    <div
      className={`${
        toastMessage ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-500 ease-in-out fixed top-0 left-0 w-full bg-gray-900 text-white text-center py-2 z-50`}
    >
      {toastMessage}
    </div>
  );
};

export default Toast;
