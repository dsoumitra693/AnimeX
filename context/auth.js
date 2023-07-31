import React, { useState, useEffect, createContext } from "react";
import { loadFromAsyncStorage } from "../asyncStorage";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [state, setState] = useState({
        user: null,
        token: ''
    })

    useEffect(() => {
        (async ()=>{
            let data = await loadFromAsyncStorage()
            setState({ ...state, user: data?.user, token: data?.token })
        })()
    }, [])

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }