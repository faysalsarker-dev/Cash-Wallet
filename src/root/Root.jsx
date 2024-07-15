import { Outlet } from "react-router-dom";
import { ComplexNavbar } from "../componenet/Navber";

const Root = () => {
    return (
        <>
          <ComplexNavbar/> 
          <Outlet/>
        </>
    );
};

export default Root;