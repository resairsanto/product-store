import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

import {
   createBrowserRouter,
   redirect
} from "react-router-dom";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      loader: async () => {
         const isAuthenticated = localStorage.access_token
         if (!isAuthenticated) return redirect("/login")
         return null
      }
   },
   {
      path: "/login",
      element: <LoginPage />,
      loader: async () => {
         const isAuthenticated = localStorage.access_token
         if (isAuthenticated) return redirect("/")
         return null
      }
   },
   {
      path: "/register",
      element: <RegisterPage />,
      loader: async () => {
         const isAuthenticated = localStorage.access_token
         if (isAuthenticated) return redirect("/")
         return null
      }
   },
]);

export default router