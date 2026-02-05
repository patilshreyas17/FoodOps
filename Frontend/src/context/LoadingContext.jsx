import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoading = () => {
    setLoadingCount(prev => prev + 1);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoadingCount(prev => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        setLoading(false);
        return 0;
      }
      return newCount;
    });
  };

  useEffect(() => {
    const handleShowLoading = () => showLoading();
    const handleHideLoading = () => hideLoading();

    window.addEventListener('show-loading', handleShowLoading);
    window.addEventListener('hide-loading', handleHideLoading);

    return () => {
      window.removeEventListener('show-loading', handleShowLoading);
      window.removeEventListener('hide-loading', handleHideLoading);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};
