import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";

import UserNavBar from "../components/user/UserNavBar";
import Home from "../components/user/Home";
import PgList from "../components/user/PgList";
import MyBookings from "../components/user/MyBookings";
import Profile from "../components/user/Profile";
import RoomList from "../components/user/RoomList";
import Message from "../components/user/Message";
import Notification from "../components/user/Notification";
import RoomDetails from "../components/user/RoomDetails";

import GetApiDemo from "../components/user/GetApiDemo";

import AdminSideBar from "../components/admin/AdminSideBar";
import Dashboard from "../components/admin/Dashboard";
import Users from "../components/admin/Users";
import Landlords from "../components/admin/Landlords";
import Pgs from "../components/admin/Pgs";
import Rooms from "../components/admin/Rooms";
import ReviewSection from "../components/user/ReviewSection";
import Landlord from "../components/landlords/Landlord";
import Bookings from "../components/admin/BookingsAdmin";

import ProtectedRoutes from "../components/ProtectedRoutes"; // ✅ ADD
import { ForgotPassword } from "../components/ForgotPassword";
import { ResetPassword } from "../components/ResetPassword";
import AdminDisputes from "../components/admin/AdminDisputes";

const router = createBrowserRouter([

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {path: "/forgotpassword",element:<ForgotPassword/>},
  {path: "/resetpassword/:token",element:<ResetPassword/>},

  /* ================= USER ROUTES ================= */

  {
    path: "/",
    element: <UserNavBar />,
    children: [

      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "pg-list", element: <PgList /> },
      { path: "roomlist/:pgId", element: <RoomList /> },
      { path: "room/:id", element: <RoomDetails /> },

      // 🔐 protected user routes (optional but good)
      {
        path: "mybookings",
        element: (
          <ProtectedRoutes userRoles={["user"]}>
            <MyBookings />
          </ProtectedRoutes>
        )
      },

      {
        path: "notification",
        element: (
          <ProtectedRoutes userRoles={["user"]}>
            <Notification />
          </ProtectedRoutes>
        )
      },

      {
        path: "profile",
        element: (
          <ProtectedRoutes userRoles={["user"]}>
            <Profile />
          </ProtectedRoutes>
        )
      },

      { path: "reviews", element: <ReviewSection /> },
      { path: "message", element: <Message /> },
      { path: "getapidemo1", element: <GetApiDemo /> }

    ],
  },

  /* ================= ADMIN ROUTES ================= */

  {
    path: "/adminsidebar",
    element: (
      <ProtectedRoutes userRoles={["admin"]}>
        <AdminSideBar />
      </ProtectedRoutes>
    ),
    children: [

      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "landlords", element: <Landlords /> },
      { path: "pgs", element: <Pgs /> },
      { path: "rooms", element: <Rooms /> },
      { path: "bookingsadmin", element: <Bookings /> },
        { path: "dispute", element: <AdminDisputes /> }

    ]
  },

  /* ================= LANDLORD ROUTE ================= */

  {
    path: "/landlord",
    element: (
      <ProtectedRoutes userRoles={["landlord"]}>
        <Landlord />
      </ProtectedRoutes>
    )
  }

]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;