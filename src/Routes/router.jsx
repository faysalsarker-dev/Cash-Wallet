import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Login from "../login register/Login";
import  SingIn  from "../login register/SingIn";





const router = createBrowserRouter([
    {
      path: "/",
      element:<Root/>,
      children:[
        {
            path:'/login',
            element:<Login/>
        },
        {
          path:'/register',
          element:<SingIn/>,
        }
      ]
    },
  ]);

  export default router