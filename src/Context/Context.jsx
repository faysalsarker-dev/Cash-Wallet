/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import useAxios from "../hook/useAxios";
import axios from "axios";

export const ContextData = createContext(null);

const AuthContext = ({ children }) => {
  // const axiosCommon = useAxios();
  const [user, setUser] = useState(null);

  const createUser = async (info) => {
    try {
      console.log("hitt");
      const userCredential = await axios.post("http://localhost:5000/register", info);
      return userCredential;
    } catch (error) {
      console.error("Error during user creation:", error);
      throw error;
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('user');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const contextData = {
    createUser,
    user,
    setUser,
  };

  return (
    <ContextData.Provider value={contextData}>
      {children}
    </ContextData.Provider>
  );
};

export default AuthContext;
