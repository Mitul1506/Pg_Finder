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
import RoomDetails from "../components/user/RoomDetails";
import BookRoom from "../components/user/BookRoom";
import Booking from "../components/user/Booking";
import Dashboard from "../components/admin/Dashboard";
import Users from "../components/admin/Users";
import Landlords from "../components/admin/Landlords";
import Pgs from "../components/admin/Pgs";


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
       { path: "/Notification", element: <Notification/>},
       { path: "profile", element: <Profile/> },
        { path: "/RoomList/:pgId", element: <RoomList /> },
  { path: "/room/:id", element: <RoomDetails/> },
  { path: "/book-room/:id", element: <BookRoom/> },
  { path: "/booking/:roomId", element: <Booking/>},
  { path: "/Reviews", element: <Reviews/>},
  { path: "/Message", element: <Message/>},
    ],
  },
  {
  path: "/adminsidebar",
  element: <AdminSideBar />,
  children: [
    { path: "dashboard", element: <Dashboard/> },
     { path: "users", element: <Users /> },
      { path: "landlords", element: <Landlords /> },
      { path: "pgs", element: <Pgs /> }
  ]
}

]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;