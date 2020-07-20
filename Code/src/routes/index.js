import React from "react";

import async from "../components/Async";

import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  Monitor,
  ShoppingCart,
  PieChart,
  Sliders,
  User,
  Users
} from "react-feather";

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Components components
const Alerts = async(() => import("../pages/components/Alerts"));
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Pagination = async(() => import("../pages/components/Pagination"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));
const Dropzone = async(() => import("../pages/forms/Dropzone"));
const Editors = async(() => import("../pages/forms/Editors"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const InvoiceDetails = async(() => import("../pages/pages/InvoiceDetails"));
const InvoiceList = async(() => import("../pages/pages/InvoiceList"));
const Orders = async(() => import("../pages/pages/Orders"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));
const Calendar = async(() => import("../pages/pages/Calendar"));

// Tables components
const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));

// loggin components
const logging = async(() => import("../pages/logging/logging"));

// syncUser components
// const syncUser = async(() => import("../pages/aaa-service/syncUser"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
const Docs = async(() => import("../pages/docs/Documentation"));
const Changelog = async(() => import("../pages/docs/Changelog"));
const Presentation = async(() => import("../pages/docs/Presentation"));

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
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

const dashboardsRoutes = {
  id: "Dashboard",
  path: "/dashboard",
  // header: "Pages",
  icon: <Sliders />,
  containsHome: true,
  children: [
    // {
    //   path: "/dashboard/default",
    //   name: "Default",
    //   component: Default
    // },
    {
      path: "/dashboard/analytics",
      name: "Analytics",
      component: Analytics
    }
  ]
};

const profileRoutes = {
  id: "Profile",
  path: "/profile",
  icon: <User />,
  component: Profile,
  children: null
};

const logRoutes = {
  id: "Log",
  path: "/logging",
  icon: <List />,
  component: logging,
  children: null
};

const workflowRoutes = {
  id: "Workflow",
  path: "/workflow",
  icon: <CheckSquare />,
  component: logging,
  children: [
    {
      path: "/workflow/account",
      name: "Account management",
      component: Alerts
    },
    {
      path: "/workflow/vm",
      name: "VM allocation",
      component: Alerts
    },
    {
      path: "/workflow/movein",
      name: "Move-in",
      component: Alerts
    },
  ]
};

// const aaaServiceRoutes = {
//   id: "AAAService",
//   path: "/aaa-service",
//   icon: <Grid />,
//   children: [
//     {
//       path: "/aaa-service/syncUser",
//       name: "User For Sync",
//       component: syncUser
//     }
//   ]
// };

const resourceRoutes = {
  id: "Resource",
  path: "/resources",
  icon: <Grid />,
  children: [
    {
      path: "/resources/vm",
      name: "VM",
      component: Alerts
    },
    {
      path: "/resources/port",
      name: "Network Port",
      component: Avatars
    },
    {
      path: "/resources/ip",
      name: "IP address",
      component: Badges
    },
    {
      path: "/resources/network",
      name: "Network",
      component: Buttons
    },
    {
      path: "/resources/storage",
      name: "Storage",
      component: Cards
    },
    {
      path: "/resources/firewall",
      name: "Firewall",
      component: Chips
    },
    {
      path: "/resources/hardware",
      name: "Hardware",
      component: Dialogs
    },
    {
      path: "/resources/platform",
      name: "Platform",
      component: ExpPanels
    },
  ]
};

const recordRoutes = {
  id: "Record allocation",
  path: "/record",
  icon: <List />,
  component: logging,
  children: null
};

export const dashboard = [
  dashboardsRoutes,
  profileRoutes,
  logRoutes,
  // aaaServiceRoutes,
];

export const auth = [authRoutes];

export default [
  dashboardsRoutes,
  resourceRoutes,
  workflowRoutes,
  recordRoutes,
  logRoutes,
  // aaaServiceRoutes,
];
