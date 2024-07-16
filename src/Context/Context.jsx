/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ContextData = createContext(null);

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
const [loading,setLoading]=useState(true)
  const createUser = async (info) => {
    try {
      const response = await axios.post("http://localhost:5000/register", info);
      const userData = response.data; 
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); 
      setLoading(false)
      return userData;
    } catch (error) {
      console.error("Error during user creation:", error);
      throw error;
    }
  };


  const Login = async (email,password) => {
    const info={
      email,
      password
    }
    console.log(info);
    try {
      const response = await axios.post("http://localhost:5000/login",info );
      const userData = response.data; 
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); 
      setLoading(false)
      return userData;
    } catch (error) {
      console.error("Error during user creation:", error);
      throw error;
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    console.log(userData);
    if (userData) {
      setUser(JSON.parse(userData));
      setLoading(false)
  
    }else{
      setLoading(false)
    }
  }, []);

  const contextData = {
    createUser,
    user,
    setUser,
    loading,
    Login
  };

  return (
    <ContextData.Provider value={contextData}>
      {children}
    </ContextData.Provider>
  );
};

export default AuthContext;
