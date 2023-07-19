import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SidebarItem from './components/SidebarItem.jsx';

import {
   createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />
   },
   {
      path: "/login",
      element: <LoginPage />
   },
   {
      path: "/register",
      element: <RegisterPage />
   },
]);

export default router