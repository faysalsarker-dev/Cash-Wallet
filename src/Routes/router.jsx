import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Login from "../login register/Login";
import  SingIn  from "../login register/SingIn";

import CashOut from "../cashout/CashOut";
import Projector from "./Projector";
import { TabBox } from './../cashout/Tabs';
import { History } from './../history/History';





const router = createBrowserRouter([
    {
      path: "/",
      element:<Root/>,
      children:[
   
        {
          path:'/sendMoney',
          element:<TabBox/>,
        },
        {
          path:'/cash-out',
          element:<CashOut/>,
        },
        {
          path:'/history',
          element:<History/>,
        },
      ]
    },
    {
      path:'/login',
      element:<Login/>
  },
  {
    path:'/register',
    element:<SingIn/>,
  },
  ]);

  export default router