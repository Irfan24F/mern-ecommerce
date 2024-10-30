// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const signup = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { email, password });
            setUser(response.data.user);
            navigate('/'); // Redirect to ProductList after signup
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            setUser(response.data.user);
            navigate('/'); // Redirect to ProductList after login
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
