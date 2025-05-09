import { createBrowserRouter } from "react-router";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/auth/Login";
import ForgetPassword from "../pages/auth/ForgetPassword";
import LoggedInLayout from "../layout/LoggedInLayout";
import Dashboard from "../pages/loggedIn/Dashboard";
import Procurement from "../pages/loggedIn/Procurement";
import Staff from "../pages/loggedIn/Staff";
import PaymentHistory from "../pages/loggedIn/PaymentHistory";
import Department from "../pages/loggedIn/Department";
import Settings from "../pages/loggedIn/Settings";
import Requests from "../pages/loggedIn/Requests";
import UserLogin from "../pages/auth/UserLogin";
import User from "../pages/loggedIn/User";
import MyRequests from "../pages/loggedIn/MyRequests";
import AllDevices from "../pages/loggedIn/AllDevices";
import AssignedDevice from "../pages/loggedIn/AssignedDevice";

const router = createBrowserRouter([
    {
        path: '',
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <UserLogin />
            },
            {
                path: 'login',
                element: <UserLogin />
            },
            {
                path: '/staff/login',
                element: <Login />
            },
            {
                path: 'forgot-password',
                element: <ForgetPassword />
            },
        ]
    },
    {
        path: '',
        element: <LoggedInLayout />,
        children: [
            {
                path: 'user',
                element: <User />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'procurement',
                element: <Procurement />
            },
            {
                path: 'staff',
                element: <Staff />
            },
            {
                path: 'emolument-history',
                element: <PaymentHistory />
            },
            {
                path: 'department',
                element: <Department />
            },
            {
                path: 'requests',
                element: <Requests />
            },
            {
                path: 'my-requests',
                element: <MyRequests />
            },
            {
                path: 'all-devices',
                element: <AllDevices />
            },
            {
                path: 'assigned-devices',
                element: <AssignedDevice />
            },
            {
                path: 'settings',
                element: <Settings />
            },
        ]
    }
])

export default router