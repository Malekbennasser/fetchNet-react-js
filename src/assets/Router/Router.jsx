import Profile from "../../Pages/Profile/Profile";
import Home from "../../Pages/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]); //page pour le login pour s'enregistrer pour le profile et pour l'accueil
export default Router;
