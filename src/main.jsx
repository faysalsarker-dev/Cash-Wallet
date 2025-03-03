import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/router'
import AuthContext from './Context/Context'
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    </AuthContext>
    
  </React.StrictMode>,
)
