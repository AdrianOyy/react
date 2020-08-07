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

// user components
const user = async(() => import("../pages/aaa-service/user"))

// user detail components
const userDetail = async(() => import("../pages/aaa-service/userDetail"))


// Documentation
// const Presentation = async(() => import("../pages/docs/Presentation"));

//workFlow
const WorkflowSetting = async(() => import("../pages/workFlow/workFlowSetting"));

// management
const management = async(() => import("../pages/aaa-service/management"));

// tenant
const tenant = async(() => import("../pages/aaa-service/Tenant/TenantList"));
const tenantDetail = async(() => import("../pages/aaa-service/Tenant/TenantDetail"))
const tenantUpdate = async(() => import("../pages/aaa-service/Tenant/TenantUpdate"))
const tenantCreate = async(() => import("../pages/aaa-service/Tenant/TenantCreate"))

// ADGroup
const ADGroup = async(() => import("../pages/aaa-service/ADGroup/ADGroupList"));
const ADGroupDetail = async(() => import("../pages/aaa-service/ADGroup/ADGroupDetail"))
const ADGroupUpdate = async(() => import("../pages/aaa-service/ADGroup/ADGroupUpdate"))
const ADGroupCreate = async(() => import("../pages/aaa-service/ADGroup/ADGroupCreate"))

// role
const role = async(() => import("../pages/aaa-service/Role/RoleList"))
const roleDetail = async(() => import("../pages/aaa-service/Role/RoleDetail"))
const roleCreate = async(() => import("../pages/aaa-service/Role/RoleCreate"))
const roleUpdate = async(() => import("../pages/aaa-service/Role/RoleUpdate"))

// tenant adGroup mapping
const tenantGroupMapping = async(() => import("../pages/aaa-service/TenantGroupMapping/TenantGroupMappingList"))
const tenantGroupMappingDetail = async(() => import("../pages/aaa-service/TenantGroupMapping/TenantGroupMappingDetail"))
const tenantGroupMappingUpdate = async(() => import("../pages/aaa-service/TenantGroupMapping/TenantGroupMappingUpdate"))
const tenantGroupMappingCreate = async(() => import("../pages/aaa-service/TenantGroupMapping/TenantGroupMappingCreate"))

// assign
const assign = async(() => import("../pages/aaa-service/Assign/AssignList"))
const assignDetail = async(() => import("../pages/aaa-service/Assign/AssignDetail"))
const assignUpdate = async(() => import("../pages/aaa-service/Assign/AssignUpdate"))
const assignCreate = async(() => import("../pages/aaa-service/Assign/AssignCreate"))

// expiry
const expiry = async(() => import("../pages/aaa-service/Expiry/ExpiryList"))
const expiryDetail = async(() => import("../pages/aaa-service/Expiry/ExpiryDetail"))
const expiryUpdate = async(() => import("../pages/aaa-service/Expiry/ExpiryUpdate"))
const expiryCreate = async(() => import("../pages/aaa-service/Expiry/ExpiryCreate"))

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
  component: SignIn,
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
      name: "VM Allocation",
      component: Alerts
    },
    {
      path: "/workflow/movein",
      name: "Move-in",
      component: Alerts
    },
    {
      path: "/workflow/request",
      name: "My Request",
      component: Alerts
    },
    {
      path: "/workflow/approval",
      name: "My Approval",
      component: Alerts
    },
    {
      path: "/workflow/workflowSetting",
      name: "Workflow Setting",
      component: WorkflowSetting
    },
  ]
};

const aaaServiceRoutes = {
  id: "AAA Service",
  path: "/aaa-service",
  icon: <Grid />,
  children: [
    {
      path: "/aaa-service/user",
      name: "User Profile",
      component: user
    },
    {
      path: "/aaa-service/tenant",
      name: "Tenant",
      component: tenant,
    },
    {
      path: "/aaa-service/role",
      name: "Role",
      component: role,
    },
    {
      path: "/aaa-service/assign",
      name: "Assign",
      component: assign
    },
    {
      path: "/aaa-service/management",
      name: "Management",
      component: management,
    },
    {
      path: "/aaa-service/adgroup",
      name: "AD Group",
      component: ADGroup,
    },
    {
      path: "/aaa-service/tenantAdGroupMapping",
      name: "Tenant AD Group Mapping",
      component: tenantGroupMapping,
    },
    {
      path: "/aaa-service/expiry",
      name: "Expiry",
      component: expiry,
    }
  ]
};

const userDetailRoutes = {
  id: "userDetail",
  path: "/aaa-service/userDetail/:id",
  component: userDetail,
  children: null
};


const tenantCreateRoutes = {
  id: "tenantCreate",
  path: "/aaa-service/tenant/create",
  component: tenantCreate,
  children: null
};
const tenantDetailRoutes = {
  id: "tenantDetail",
  path: "/aaa-service/tenant/detail/:id",
  component: tenantDetail,
  children: null
};
const tenantUpdateRoutes = {
  id: "tenantUpdate",
  path: "/aaa-service/tenant/update/:id",
  component: tenantUpdate,
  children: null
};

const roleDetailRoutes = {
  id: "roleDetail",
  path: "/aaa-service/role/detail/:id",
  component: roleDetail,
  children: null,
}
const roleCreateRoutes = {
  id: "roleCreate",
  path: "/aaa-service/role/create",
  component: roleCreate,
  children: null,
}
const roleUpdateRoutes = {
  id: "roleUpdate",
  path: "/aaa-service/role/update/:id",
  component: roleUpdate,
  children: null,
}

const tenantGroupMappingDetailRoutes = {
  id: "roleDetail",
  path: "/aaa-service/tenantGroupMapping/detail/:id",
  component: tenantGroupMappingDetail,
  children: null,
}
const tenantGroupMappingUpdateRoutes = {
  id: "roleDetail",
  path: "/aaa-service/tenantGroupMapping/update/:id",
  component: tenantGroupMappingUpdate,
  children: null,
}
const tenantGroupMappingCreateRoutes = {
  id: "roleDetail",
  path: "/aaa-service/tenantGroupMapping/create",
  component: tenantGroupMappingCreate,
  children: null,
}

const assignDetailRoutes = {
  id: "assignDetail",
  path: "/aaa-service/assign/detail/:id",
  component: assignDetail,
  children: null
};
const assignUpdateRoutes = {
  id: "assignDetail",
  path: "/aaa-service/assign/update/:id",
  component: assignUpdate,
  children: null
};
const assignCreateRoutes = {
  id: "assignDetail",
  path: "/aaa-service/assign/create",
  component: assignCreate,
  children: null
};

const adgroupCreateRoutes = {
  id: "adgroupCreate",
  path: "/aaa-service/adgroup/create",
  component: ADGroupCreate,
  children: null
};
const adgroupDetailRoutes = {
  id: "adgroupDetail",
  path: "/aaa-service/adgroup/detail/:id",
  component: ADGroupDetail,
  children: null
};
const adgroupUpdateRoutes = {
  id: "adgroupUpdate",
  path: "/aaa-service/adgroup/update/:id",
  component: ADGroupUpdate,
  children: null
};

const expiryDetailRoutes = {
  id: "expiryDetail",
  path: "/aaa-service/expiry/detail/:id",
  component: expiryDetail,
  children: null,
}
const expiryUpdateRoutes = {
  id: "expiryDetail",
  path: "/aaa-service/expiry/update/:id",
  component: expiryUpdate,
  children: null,
}
const expiryCreateRoutes = {
  id: "expiryDetail",
  path: "/aaa-service/expiry/create",
  component: expiryCreate,
  children: null,
}

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
      name: "IP Address",
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
  dashboardsRoutes,
  resourceRoutes,
  workflowRoutes,
  recordRoutes,
  logRoutes,
  aaaServiceRoutes,
  tenantDetailRoutes,
  tenantCreateRoutes,
  tenantUpdateRoutes,
  roleDetailRoutes,
  roleCreateRoutes,
  roleUpdateRoutes,
  userDetailRoutes,
  assignDetailRoutes,
  assignUpdateRoutes,
  assignCreateRoutes,
  adgroupDetailRoutes,
  adgroupCreateRoutes,
  adgroupUpdateRoutes,
  tenantGroupMappingDetailRoutes,
  tenantGroupMappingUpdateRoutes,
  tenantGroupMappingCreateRoutes,
  expiryDetailRoutes,
  expiryUpdateRoutes,
  expiryCreateRoutes,
];



export const auth = [
  authRoutes,
  presentationRoutes,
];

export default [
  dashboardsRoutes,
  resourceRoutes,
  workflowRoutes,
  recordRoutes,
  logRoutes,
  aaaServiceRoutes,
];
