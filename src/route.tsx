import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import ContactUs from "./screens/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/contact-us",
    element: <ContactUs />
  }
]);

export default router;
