import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Login from "../login register/Login";


const router = createBrowserRouter([
    {
      path: "/",
      element:<Root/>,
      children:[
        {
            path:'/login',
            element:<Login/>
        }
      ]
    },
  ]);

  export default router