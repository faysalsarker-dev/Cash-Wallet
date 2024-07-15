import { useContext } from "react";
import { ContextData } from "../Context/Context";


const useAuth = () => {
  const auth = useContext(ContextData);
  return auth;
};

export default useAuth;