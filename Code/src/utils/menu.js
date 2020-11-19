const menu = {
  resources: {
    id: 'Resource',
    name: 'Resource',
    path: '/resources',
    children: {
      vm: {
        name: 'VM',
        path: '/resources/vm/'
      },
      IPAddress: {
        name: 'IP Address',
        path: '/resources/IPAddress/',
      },
      network: {
        name: 'Network',
        path: '/resources/network/',
      },
      server: {
        name: 'Server',
        path: '/resources/server/',
      },
      platform: {
        name: 'Platform',
        path: '/resources/platform/',
      },
      lifeCycle: {
        name: 'life Cycle',
        path: '/resources/lifeCycle/',
      }
    }
  },
  workflow: {
    id: 'Workflow',
    name: 'Workflow',
    path: '/workflow',
    children: {
      test: {
        name: 'Test',
        path: '/workflow/test',
      },
      account: {
        name: 'Account Management',
        path: '/workflow/account/',
      },
      nonPersonalAccount: {
        name: 'Non-Personal Account',
        path: '/workflow/nonPersonalAccount/',
      },
      distributionList: {
        name: 'Distribution List',
        path: '/workflow/distributionList/'
      },
      closingAccount: {
        name: 'CLosing Account',
        path: '/workflow/closingAccount/',
      },
      vm: {
        name: 'VM Allocation',
        path: '/workflow/vm',
      },
      movein: {
        name: 'Move In',
        path: '/workflow/movein',
      },
      request: {
        name: 'My Request',
        path: '/workflow/request/',
      },
      approval: {
        name: 'My Approval',
        path: '/workflow/approval/',
      },
      workflowSetting: {
        name: 'Workflow Setting',
        path: '/workflow/workflowSetting/',
      },
    }
  },
  logging: {
    id: 'Log',
    name: 'Log',
    path: '/logging/',
    children: {
      logging: {
        name: 'logging',
        path: '/logging/',
      },
    },
  },
  AAAService: {
    id: 'AAA Service',
    name: 'AAA Service',
    path: '/AAAService',
    children: {
      role: {
        name: 'Role',
        path: '/AAAService/role/',
      },
      adGroup: {
        name: 'AD Group',
        path: '/AAAService/adGroup/',
      },
      user: {
        name: 'User Profile',
        path: '/AAAService/user/',
      },
      tenant: {
        name: 'Tenant',
        path: '/AAAService/tenant/',
      },
      tenantAdGroupMapping: {
        name: 'Tenant AD Group Mapping',
        path: '/AAAService/tenantAdGroupMapping/',
      },
      assign: {
        name: 'Assign',
        path: '/AAAService/assign/'
      },
      expiry: {
        name: 'Expiry',
        path: '/AAAService/expiry/'
      }
    }
  }
}

export default menu
