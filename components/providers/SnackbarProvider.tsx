// contexts/SnackbarContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from 'react-native-paper';

const SnackbarContext = createContext({ showSnackbar: (msg: string) => {} });

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        action={{
          label: 'Tutup',
          onPress: () => setVisible(false),
        }}
        style={{ backgroundColor: '#888888' }}
      >
        {message}
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
