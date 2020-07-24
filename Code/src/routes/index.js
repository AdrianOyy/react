import React from "react";

import async from "../components/Async";

import {
  CheckSquare,
  Grid,
  List,
  Monitor,
  Sliders,
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

// Dashboards components
const Analytics = async(() => import("../pages/dashboards/Analytics"));

// logging components
const logging = async(() => import("../pages/logging/logging"));

// syncUser components
const syncUser = async(() => import("../pages/aaa-service/syncUser"))

// Documentation
const Presentation = async(() => import("../pages/docs/Presentation"));

//workFlow
const WorkflowSetting = async(() => import("../pages/workFlow/workFlowSetting"));

// management
const management = async(() => import("../pages/management/management"));

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

const presentationRoutes = {
  id: "Presentation",
  path: "/",
  header: "Docs",
  icon: <Monitor />,
  component: Analytics,
  children: null
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

const logRoutes = {
  id: "Log",
  path: "/logging",
  icon: <Monitor />,
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
    {
      path: "/workflow/request",
      name: "Request",
      component: Alerts
    },
    {
      path: "/workflow/approval",
      name: "Approval",
      component: Alerts
    },
    {
      path: "/workflow/workflowSetting",
      name: "WorkflowSetting",
      component: WorkflowSetting
    },
  ]
};

const aaaServiceRoutes = {
  id: "AAAService",
  path: "/aaa-service",
  icon: <Grid />,
  children: [
    {
      path: "/aaa-service/users",
      name: "User profile",
      component: syncUser
    },
    {
      path: "/aaa-service/tenant",
      name: "Tenant",
      component: syncUser
    },
    {
      path: "/aaa-service/management",
      name: "Management",
      component: management,
    },
  ]
};

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
      path: "/resources/server",
      name: "Server",
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
  id: "Allocation",
  path: "/allocation",
  icon: <List />,
  component: Dialogs,
  children: null
};

export const dashboard = [
  presentationRoutes,
  dashboardsRoutes,
  resourceRoutes,
  workflowRoutes,
  recordRoutes,
  logRoutes,
  aaaServiceRoutes,
];

export const auth = [authRoutes];

export default [
  dashboardsRoutes,
  resourceRoutes,
  workflowRoutes,
  recordRoutes,
  logRoutes,
  aaaServiceRoutes,
];
