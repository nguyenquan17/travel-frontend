import async from "../components/Async";

import {
  Layout as LayoutIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon
} from "react-feather";

// Landing
import Landing from "../pages/components/landing/Landing";
import Home from "../pages/components/landing/Home";
// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Layouts


// Misc
import Blank from "../pages/misc/Blank";

// UI Elements

// Notifications
import Notifications from "../pages/notifications/Notifications";

// Pages
import User from "../pages/pages/userManagement/User";
import Pricing from "../pages/pages/Pricing";
import Tables from "../pages/pages/group/Groups";
// Documentation
import Introduction from "../pages/docs/Introduction";
import GettingStarted from "../pages/docs/GettingStarted";
import EnvironmentVariables from "../pages/docs/EnvironmentVariables";
import Deployment from "../pages/docs/Deployment";
import StateManagement from "../pages/docs/StateManagement";
import Plugins from "../pages/docs/Plugins";
import Changelog from "../pages/docs/Changelog";
import NewPassword from "../pages/auth/NewPassword";

// auth
import withAuth from "../HOC/withAuth";

//component
import TourDetail from "../pages/components/TourDetail";
import Tours from "../pages/pages/tourManagement/Tours";

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const Ecommerce = async(() => import("../pages/dashboards/Ecommerce"));
const Crypto = async(() => import("../pages/dashboards/Crypto"));
const Social = async(() => import("../pages/dashboards/Social"));

// Forms
const Layouts = async(() => import("../pages/forms/Layouts"));
const BasicInputs = async(() => import("../pages/forms/BasicInputs"));
const AdvancedInputs = async(() => import("../pages/forms/AdvancedInputs"));
const InputGroups = async(() => import("../pages/forms/InputGroups"));
const Editors = async(() => import("../pages/forms/Editors"));
const Validation = async(() => import("../pages/forms/Validation"));
const Wizard = async(() => import("../pages/forms/Wizard"));

// Tables
const BootstrapTables = async(() => import("../pages/tables/Bootstrap"));
const PaginationTables = async(() => import("../pages/tables/Pagination"));
const RowSelectionTables = async(() => import("../pages/tables/RowSelection"));
const ExportCsvTables = async(() => import("../pages/tables/ExportCsv"));
const ExpandableRowsTables = async(() =>
  import("../pages/tables/ExpandableRows")
);



// Routes
const landingRoutes = {
    path: "/",
    name: "Landing Page",
    component: Home,
    children: null
  };

const tourDetailRoutes = {
    path: "/tour-detail/:tourId",
    name: "Tour Detail",
    component: TourDetail,

}

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboards",
  header: "Pages",
  badgeColor: "primary",
  icon: SlidersIcon,
  containsHome: true,
  component: Default,
  children: null
};
// const otherRoutes = {
//   path: "/"
// }
const pageRoutes = {
  path: "/management",
  name: "Management",
  icon: LayoutIcon,
  children: [
    {
      path: "/management/groups",
      name: "Tours",
      component: Tours
    },
    {
      path: "/management/orders",
      name: "Orders",
      component: Pricing
    },
    {
      path: "/management/user",
      name: "User",
      component: User
    }

  ]
};

const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "Special",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/auth/new-password/:token",
      name: "New Password",
      component: NewPassword
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

// This route is not visisble in the sidebar
const privateRoutes = {
  path: "/private",
  name: "Private",
  children: [
    {
      path: "/private/blank",
      name: "Blank Page",
      component: Blank
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  pageRoutes,
  privateRoutes
];

// Landing specific routes
export const landing = [landingRoutes];
export const tourDetail = [tourDetailRoutes];
// Auth specific routes
export const page = [authRoutes];

// All routes, on display sidebar
export default [
  dashboardRoutes,
  pageRoutes,
  // authRoutes,



];
