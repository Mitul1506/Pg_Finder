import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserNavBar from "../components/user/UserNavBar";
import AdminSideBar from "../components/admin/AdminSideBar";
import GetApiDemo from "../components/user/GetApiDemo";
import Home from "../components/user/Home";
import PgList from "../components/user/PgList";
import MyBookings from "../components/user/MyBookings";
import Profile from "../components/user/Profile";
import RoomList from "../components/user/RoomList";
import Reviews from "../components/user/Reviews";
import Message from "../components/user/Message";
import Notification from "../components/user/Notification";


const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/",
    element: <UserNavBar />,
    children: [
       { index: true, element: <Home /> },  
      {
        path: "getapidemo1",
        element: <GetApiDemo />,
      },
      { path: "home", element: <Home /> },
      { path: "pg-list", element: <PgList /> },
       { path: "bookings", element: <MyBookings /> },
       { path: "profile", element: <Profile/> },
    ],
  },
  { path: "/adminsidebar", element: <AdminSideBar /> },
  { path: "/RoomList", element: <RoomList /> },
  { path: "/Reviews", element: <Reviews/>},
  { path: "/Message", element: <Message/>},
  { path: "/Notification", element: <Notification/>}

]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;