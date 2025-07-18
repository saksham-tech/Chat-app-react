import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";
// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import NewPassword from "../pages/auth/NewPassword";
import Group from "../pages/dashboard/Group";
import Update from "../pages/dashboard/Update";
import UpdateApp from "../pages/dashboard/UpdateApp";
import Verify from "../pages/auth/Verify";
const Loadable = (Component) => (props) =>  {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};
 
export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout/>,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element:<Register/>},
        { path: "reset-password", element: <ResetPassword /> },
        { path: "new-password", element: <NewPassword /> },
        {path: "verify", element: <Verify/> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "settings", element: <Settings /> },
        { path: "login", element: <Login /> },
        { path: "group", element: <GroupPage /> },
        { path: "update", element: <UpdateApp/> },
        { path: "app", element: <GeneralApp /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "call", element: <CallPage /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);
const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);
const Login = Loadable(
  lazy(() => import("../pages/auth/Login")),
);
const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);
const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);
const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);
const VerifyPage = Loadable(
  lazy(() => import("../pages/auth/Verify")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
