import React, { useState, useEffect, createContext } from "react";
import { loadFromAsyncStorage } from "../asyncStorage";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [state, setState] = (() => {
        let [_state, _setState] = useState({
            user: null,
            token: ''
        })
        asyncSetState = async (props) => {
            _setState(props)
        }
        return [_state, asyncSetState]
    })()

    useEffect(() => {
        (async () => {
            let data = await loadFromAsyncStorage()
            await setState({ ...state, user: data?.userObj, token: data?.token })
        })()
    }, [])

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }