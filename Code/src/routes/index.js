import React from "react"

import async from "../components/Async"

import {
  CheckSquare,
  Grid,
  List,
  Monitor,
  Sliders,
  Users
} from "react-feather"

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"))
const SignUp = async(() => import("../pages/auth/SignUp"))
const ResetPassword = async(() => import("../pages/auth/ResetPassword"))
const Page404 = async(() => import("../pages/auth/Page404"))
const Page500 = async(() => import("../pages/auth/Page500"))

// Components components
const Alerts = async(() => import("../pages/components/Alerts"))
const Avatars = async(() => import("../pages/components/Avatars"))
const Buttons = async(() => import("../pages/components/Buttons"))
const Cards = async(() => import("../pages/components/Cards"))
const Chips = async(() => import("../pages/components/Chips"))
const Dialogs = async(() => import("../pages/components/Dialogs"))
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"))

// Dashboards components
const Analytics = async(() => import("../pages/dashboards/Analytics"))

// logging components
const logging = async(() => import("../pages/logging/Log"))

// user components
const user = async(() => import("../pages/aaa-service/User"))


// Documentation
// const Presentation = async(() => import("../pages/docs/Presentation"));

// workFlow
const WorkflowSetting = async(() => import("../pages/workFlow/WorkflowSetting"))
const request = async(() => import("../pages/workFlow/MyRequest"))
const approval = async(() => import("../pages/workFlow/MyApproval"))
const VMAllocation = async(() => import("../pages/workFlow/VMAllocation"))
const VMProvisioning = async(() => import("../pages/workFlow/VMProvisioning/"))
// IP Assignment
const IPAssignment = async(() => import("../pages/workFlow/IPAssignment/"))

// tenant quota mapping
const tenantQuotaMapping = async(() => import("../pages/aaa-service/tenantQuotaMapping"))

// tenant
const tenant = async(() => import("../pages/aaa-service/Tenant"))

// ADGroup
const ADGroup = async(() => import("../pages/aaa-service/ADGroup"))

// role
const role = async(() => import("../pages/aaa-service/Role"))

// tenant adGroup mapping
const tenantGroupMapping = async(() => import("../pages/aaa-service/TenantGroupMapping"))

// assign
const assign = async(() => import("../pages/aaa-service/Assign"))

// expiry
const expiry = async(() => import("../pages/aaa-service/Expiry"))

// TODO: delete this route after testing
// const test = async(() => import("../pages/aaa-service/Test"))

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
}

const presentationRoutes = {
  id: "Presentation",
  path: "/",
  header: "Docs",
  icon: <Monitor />,
  component: SignIn,
  children: null
}

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
}

const logRoutes = {
  id: "Log",
  path: "/logging/",
  icon: <Monitor />,
  component: logging,
  children: null
}

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
      name: "VM Allocation",
      component: VMAllocation
    },
    {
      path: "/workflow/movein",
      name: "Move-in",
      component: Alerts
    },
    {
      path: "/workflow/request",
      name: "My Request",
      component: request
    },
    {
      path: "/workflow/approval",
      name: "My Approval",
      component: approval
    },
    {
      path: "/workflow/workflowSetting",
      name: "Workflow Setting",
      component: WorkflowSetting
    }
  ]
}

const aaaServiceRoutes = {
  id: "AAA Service",
  path: "/aaa-service",
  icon: <Grid />,
  children: [
    // TODO: remove this route after testing
    // {
    //   path: "/aaa-service/test/",
    //   name: "Test",
    //   component: test,
    // },
    {
      path: "/aaa-service/role/",
      name: "Role",
      component: role,
    },
    {
      path: "/aaa-service/adgroup/",
      name: "AD Group",
      component: ADGroup,
    },
    {
      path: "/aaa-service/user/",
      name: "User Profile",
      component: user
    },
    {
      path: "/aaa-service/tenant/",
      name: "Tenant",
      component: tenant,
    },
    {
      path: "/aaa-service/tenantAdGroupMapping/",
      name: "Tenant AD Group Mapping",
      component: tenantGroupMapping,
    },
    {
      path: "/aaa-service/assign/",
      name: "Assign",
      component: assign
    },
    {
      path: "/aaa-service/expiry/",
      name: "Expiry",
      component: expiry,
    }
  ]
}

const resourceRoutes = {
  id: "Resource",
  path: "/resources",
  icon: <Grid />,
  children: [
    {
      path: "/resources/vm",
      name: "VM",
      component: VMProvisioning
    },
    {
      path: "/resources/port",
      name: "Network Port",
      component: Avatars
    },
    {
      path: "/resources/IPAddress",
      name: "IP Address",
      component: IPAssignment
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
}

const recordRoutes = {
  id: "Allocation",
  path: "/allocation",
  icon: <List />,
  component: Dialogs,
  children: [
    {
      path: "/aaa-service/tenantQuotaMapping/",
      name: "Quota",
      component: tenantQuotaMapping,
    },
    {
      path: "/aaa-service/tenantQuotaMapping/",
      name: "Record",
      component: tenantQuotaMapping,
    },
  ]
}

export const dashboard = [
  dashboardsRoutes,
  resourceRoutes,
  workflowRoutes,
  recordRoutes,
  logRoutes,
  aaaServiceRoutes,
]


export const auth = [
  authRoutes,
  presentationRoutes,
]

export default [
  dashboardsRoutes,
  resourceRoutes,
  workflowRoutes,
  recordRoutes,
  logRoutes,
  aaaServiceRoutes,
]
