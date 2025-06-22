import { createContext, useContext, useState } from "react";

const QuoteContext = createContext({
    isHomeScreenQuote: (id) => {},
    reloadHomeScreenQuote: (id) => {},
});

export const QuoteProvider = ({children}) => {
    const [randomQuote, setRandomQuote] = useState({id: null, quote: 'Loading...', author: 'Loading...'});
    const [reload, setReload] = useState(0);

    const isHomeScreenQuote = (id) => {
        if(randomQuote.id == id) {
            return true;
        }
        return false;
    }

    const reloadHomeScreenQuote = () => {
        setReload(prev=>prev+1);
    }

    return (
        <QuoteContext.Provider value={
            {randomQuote, setRandomQuote, reload, setReload,
                isHomeScreenQuote,
                reloadHomeScreenQuote
            }}>
            {children}
        </QuoteContext.Provider>
    );
};

export const useQuote = () => useContext(QuoteContext);