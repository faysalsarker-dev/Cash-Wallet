import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/router'
import AuthContext from './Context/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
    <RouterProvider router={router} />
    </AuthContext>
    
  </React.StrictMode>,
)
