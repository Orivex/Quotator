import React, { createContext, useState, useContext, useEffect } from 'react';
import { Snackbar } from 'react-native-paper';

const SnackbarContext = createContext({
    showMessage: (message) => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({children}) => {
    const [messageVisible, setMessageVisible] = useState(false);
    const [message, setMessage] = useState('');

    const showMessage = (msg) => {
        setMessage(msg);
        setMessageVisible(true);
    };

    return(
        <SnackbarContext.Provider value={{showMessage}}>
            {children}
            <Snackbar
    
                visible={messageVisible}
                onDismiss={()=>{setMessageVisible(false);}}
                duration={2000}
                action={{
                  label: 'Close',
                  onPress: () => {
                    setMessageVisible(false);
                  },
                }}>
                {message}
            </Snackbar>
        </SnackbarContext.Provider>
    );
};