import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect  } from "react-router-dom"
import { createBrowserHistory } from "history"
import { dashboard as dashboardRoutes, auth as authRoutes } from "./index"
import { authRoute } from "../utils/auth"

import DashboardLayout from "../layouts/Dashboard"
import AuthLayout from "../layouts/Auth"
import Page404 from "../pages/auth/Page404"

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component }, index) => (
        <Route
          key={index}
          path={path}
          exact
          render={props => (
            <Layout>
              {
                authRoute(path) ? <Component {...props} /> : <Redirect to={{ path: '/auth/sign-in' }} />
              }
            </Layout>
          )}
        />
      ))
    ) : (
      // Route item without children
      <Route
        key={index}
        path={path}
        exact
        render={props => (
          <Layout>
            {
              authRoute(path) ? <Component {...props} /> : <Redirect to={{ path: '/auth/sign-in' }} />
            }
          </Layout>
        )}
      />
    )
  )

const Routes = () => (
  <Router history={createBrowserHistory}>
    <Switch>
      {childRoutes(DashboardLayout, dashboardRoutes)}
      {childRoutes(AuthLayout, authRoutes)}
      <Route
        render={() => (
          <AuthLayout>
            <Page404 />
          </AuthLayout>
        )}
      />
    </Switch>
  </Router>
)

export default Routes
