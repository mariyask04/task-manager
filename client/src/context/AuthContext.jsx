"use client";

import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    //get token and user details from localStorage and set it into the variables
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    //set token and user details to localStorage at the time of login
    const login = (userData, userToken) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userToken);
        setUser(userData);
        setToken(userToken);
    }

    //clear data from localStorage on logout
    const logout = () => {
        localStorage.clear();
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider
            value={{ user, token, loading, login, logout, isAuthenticated: !!token }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}