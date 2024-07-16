import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Login from "../login register/Login";
import  SingIn  from "../login register/SingIn";
import SendMoney from "../sendmoney/SendMoney";
import CashOut from "../cashout/CashOut";
import Projector from "./Projector";
import { TabBox } from './../cashout/Tabs';





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