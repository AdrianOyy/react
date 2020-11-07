import React from "react"

import async from "../components/Async"

import menu from "../utils/menu"

import {
  CheckSquare,
  Grid,
  Monitor,
  Users
} from "react-feather"

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"))
const ResetPassword = async(() => import("../pages/auth/ResetPassword"))
const Page404 = async(() => import("../pages/auth/Page404"))
const Page500 = async(() => import("../pages/auth/Page500"))


// logging components
const logging = async(() => import("../pages/logging/Log"))

// user components
const user = async(() => import("../pages/aaa-service/User"))


// workFlow
const WorkflowSetting = async(() => import("../pages/workFlow/WorkflowSetting"))
const request = async(() => import("../pages/workFlow/MyRequest"))
const approval = async(() => import("../pages/workFlow/MyApproval"))
const VMAllocation = async(() => import("../pages/workFlow/VMAllocation"))
const Account = async(() => import("../pages/workFlow/Account"))
const NonPersonalAccount = async(() => import("../pages/workFlow/NonPersonalAccount"))
const DistributionList = async(() => import("../pages/workFlow/DistributionList"))
const ClosingAccount = async(() => import("../pages/workFlow/ClosingAccount"))
const MoveIn = async(() => import("../pages/workFlow/MoveIn"))

// IP Assignment
const IPAddress = async(() => import("../pages/resources/IPAddress"))
const Platform = async(() => import("../pages/resources/Platform"))
const LifeCycle = async(() => import("../pages/resources/LifeCycle"))
const VM = async(() => import("../pages/resources/VM"))
const Network = async(() => import("../pages/resources/Network"))
const Server = async(() => import("../pages/resources/Server"))


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

// TODO Test page should be deleted before project building
const test = async(() => import("../pages/workFlow/Test"))


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

const logRoutes = {
  id: menu.logging.id,
  path: menu.logging.path,
  icon: <Monitor />,
  component: logging,
  children: null
}

const workflowRoutes = {
  id: menu.workflow.id,
  path: menu.workflow.path,
  icon: <CheckSquare />,
  component: logging,
  children: [
    {
      path: menu.workflow.children.test.path,
      name: menu.workflow.children.test.name,
      component: test
    },
    {
      path: menu.workflow.children.account.path,
      name: menu.workflow.children.account.name,
      component: Account
    },
    {
      path: menu.workflow.children.nonPersonalAccount.path,
      name: menu.workflow.children.nonPersonalAccount.name,
      component: NonPersonalAccount
    },
    {
      path: menu.workflow.children.distributionList.path,
      name: menu.workflow.children.distributionList.name,
      component: DistributionList
    },
    {
      path: menu.workflow.children.closingAccount.path,
      name: menu.workflow.children.closingAccount.name,
      component: ClosingAccount
    },
    {
      path: menu.workflow.children.vm.path,
      name: menu.workflow.children.vm.name,
      component: VMAllocation
    },
    {
      path: menu.workflow.children.movein.path,
      name: menu.workflow.children.movein.name,
      component: MoveIn
    },
    {
      path: menu.workflow.children.request.path,
      name: menu.workflow.children.request.name,
      component: request
    },
    {
      path: menu.workflow.children.approval.path,
      name: menu.workflow.children.approval.name,
      component: approval
    },
    {
      path: menu.workflow.children.workflowSetting.path,
      name: menu.workflow.children.workflowSetting.name,
      component: WorkflowSetting
    }
  ]
}

const aaaServiceRoutes = {
  id: menu.AAAService.id,
  path: menu.AAAService.path,
  icon: <Grid />,
  children: [
    {
      path: menu.AAAService.children.role.path,
      name: menu.AAAService.children.role.name,
      component: role,
    },
    {
      path: menu.AAAService.children.adGroup.path,
      name: menu.AAAService.children.adGroup.name,
      component: ADGroup,
    },
    {
      path: menu.AAAService.children.user.path,
      name: menu.AAAService.children.user.name,
      component: user
    },
    {
      path: menu.AAAService.children.tenant.path,
      name: menu.AAAService.children.tenant.name,
      component: tenant,
    },
    {
      path: menu.AAAService.children.tenantAdGroupMapping.path,
      name: menu.AAAService.children.tenantAdGroupMapping.name,
      component: tenantGroupMapping,
    },
    {
      path: menu.AAAService.children.assign.path,
      name: menu.AAAService.children.assign.name,
      component: assign
    },
    {
      path: menu.AAAService.children.expiry.path,
      name: menu.AAAService.children.expiry.name,
      component: expiry,
    }
  ]
}

const resourceRoutes = {
  id: menu.resources.id,
  path: menu.resources.path,
  icon: <Grid />,
  children: [
    {
      path: menu.resources.children.vm.path,
      name: menu.resources.children.vm.name,
      component: VM
    },
    {
      path: menu.resources.children.ip.path,
      name: menu.resources.children.ip.name,
      component: IPAddress
    },
    {
      path: menu.resources.children.network.path,
      name: menu.resources.children.network.name,
      component: Network
    },
    {
      path: menu.resources.children.server.path,
      name: menu.resources.children.server.name,
      component: Server
    },
    {
      path: menu.resources.children.platform.path,
      name: menu.resources.children.platform.name,
      component: Platform
    },
    {
      path: menu.resources.children.liftCycle.path,
      name: menu.resources.children.liftCycle.name,
      component: LifeCycle
    },
  ]
}


export const dashboard = [
  workflowRoutes,
  resourceRoutes,
  aaaServiceRoutes,
  logRoutes,
]


export const auth = [
  authRoutes,
  presentationRoutes,
]

export default [
  workflowRoutes,
  resourceRoutes,
  aaaServiceRoutes,
  logRoutes,
]
