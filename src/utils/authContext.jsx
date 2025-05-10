import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/login/success`, {
                    withCredentials: true,
                });
                if (res.data?.user) {
                    setUser(res.data.user);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
