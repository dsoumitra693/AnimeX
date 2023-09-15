import React, { useState, useEffect, createContext } from "react";
import { loadFromAsyncStorage } from "../asyncStorage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: ''
    });

    // Function to update the authentication state
    const updateAuthState = async () => {
        let data = await loadFromAsyncStorage();
        setState({ ...state, user: data?.userObj, token: data?.token });
    };

    // Initialize the authentication state when the component mounts
    useEffect(() => {
        updateAuthState();
    }, []); // Empty dependency array ensures this effect runs once on mount

    // Now, you can use the `updateAuthState` function elsewhere in your component
    const authContextValue = [state, updateAuthState];

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
