import { Outlet } from "react-router-dom";
import { ComplexNavbar } from "../componenet/Navber";

const Root = () => {
    return (
        <>
          <ComplexNavbar/> 
          <div className="container max-w-6xl mx-auto"><Outlet/></div>
        </>
    );
};

export default Root;