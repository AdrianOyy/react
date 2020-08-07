import React from 'react'
import { NavLink as RouterNavLink } from "react-router-dom"
import styled from "styled-components"

import {
  Grid,
  Link,
  Typography,
  Divider as MuiDivider,
  Breadcrumbs as MuiBreadcrumbs,
} from "@material-ui/core"
import { spacing } from "@material-ui/system"
import Helmet from 'react-helmet'

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)


function NaviHader(props) {
  const { breadcrumbsList, title } = props

  return (
    <React.Fragment>
      <Helmet title={title} />
      <Grid
        justify="space-between"
        container
        spacing={10}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
          {title}
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            {
              breadcrumbsList && breadcrumbsList.map((el, i) =>
                el.path ? (
                  <Link component={NavLink} exact to={el.path} key={i + el.title}>
                    { el.title }
                  </Link>
                ) : (
                  <Typography key={i + el.title}>{ el.title }</Typography>
                )
              )
            }
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Divider my={6} />
    </React.Fragment>
  )
}

export default NaviHader
