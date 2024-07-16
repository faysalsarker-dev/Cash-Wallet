/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth";

const Projector = ({children}) => {
    const {loading}=useAuth()
    const user = localStorage.getItem('user')
    if (loading) {
        return (
         <div className="h-[80vh] flex justify-center items-center">loading....</div>
        );
      }
    if (!user) {
        return <Navigate to="/login" state={location.pathname}></Navigate>;
      }
      return <>{children}</>;
    };

export default Projector;


