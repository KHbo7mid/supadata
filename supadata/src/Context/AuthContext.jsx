import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance, { setAuthToken } from "../Api/Axios"; // Ensure axiosInstance and setAuthToken are correctly set up
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  csrfToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });

  const navigate = useNavigate();
  const location = useLocation();

  
  const saveUser = (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token); // Store token
      setAuthToken(userData.token); // Set token for axios
      setUser(userData);
      setToken(userData.token);
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const csrfToken = async () => {
    try {
      await axiosInstance.get('/sanctum/csrf-cookie');
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
    setAuthToken(null); // Remove token from axios
    setUser(null);
    setToken(null);
    navigate('/login'); 
  };

  useEffect(() => {
    if (!location.pathname.startsWith('/profile')) {
      setUser(null);
      setToken(null);
    }
  }, [location.pathname]);
  return (
    <AuthContext.Provider value={{ user, setUser: saveUser, csrfToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
