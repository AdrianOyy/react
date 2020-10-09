/* eslint-disable react/display-name */
import React from "react"
import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"
import { L } from '../../utils/lang'
import Helmet from 'react-helmet'

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent,
  Chip as MuiChip,
  Divider as MuiDivider,
  Link,
  Typography as MuiTypography
} from "@material-ui/core"

import { spacing } from "@material-ui/system"

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Card = styled(MuiCard)(spacing)

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const Typography = styled(MuiTypography)(spacing)

const Chip = styled(MuiChip)`
  height: 20px;
  margin-top: -3px;
  font-weight: bold;
  font-size: 75%;
`

function Changelog() {
  return (
    <React.Fragment>
      <Helmet title={L('Changelog')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Changelog')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Typography>{L('Changelog')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Changelog')}
          </Typography>
          <Box mt={3}>
            <Chip color="secondary" label="v1.0.8" /> – Apr 14, 2020
            <ul>
              <li>{L('Add invoices (/invoices)')}</li>
              <li>{L('Add orders (/orders)')}</li>
              <li>{L('Add alerts CP')}</li>
              <li>{L('Add pagination CP')}</li>
              <li>{L('Add dropzone FD')}</li>
              <li>{L('Add editors FE')}</li>
              <li>{L('Improve invoice details (/invoices/detail)')}</li>
              <li>{L('Improve projects design (/projects)')}</li>
              <li>{L('Improve settings design PS')}</li>
              <li>{L('Improve tasks design (/tasks)')}</li>
              <li>{L('Improve performance')}</li>
              <li>{L('UpgradeLastVersion')}</li>
            </ul>
            <Chip color="secondary" label="v1.0.7" /> – Mar 2, 2020
            <ul>
              <li>{L('Fixed bug with @material-ui/utils')}</li>
              <li>{L('Small visual changes')}</li>
              <li>{L('UpgradeLastVersion')}</li>
            </ul>
            <Chip color="secondary" label="v1.0.6" /> – Feb 20, 2020
            <ul>
              <li>{L('Add React Helmet')}</li>
              <li>{L('FixedBugVSPickers')}</li>
              <li>{L('UpgradeLastVersion')}</li>
            </ul>
            <Chip color="secondary" label="v1.0.5" /> – Dec 21, 2019
            <ul>
              <li>{L('Add calendar (/calendar)')}</li>
              <li>{L("Add landing page")}</li>
              <li>{L('Add teal color variant')}</li>
              <li>{L('Fixed horizontal scrollbar issues')}</li>
              <li>{L('Small visual changes')}</li>
              <li>{L('UpgradeLastVersion')}</li>
            </ul>
            <Chip color="secondary" label="v1.0.4" /> – Aug 26, 2019
            <ul>
              <li>{L('Add vector maps (/maps/vector-maps)')}</li>
              <li>{L('Add private route example')}</li>
              <li>{L('Add catch-all route')}</li>
              <li>{L('UpgradeLastVersion')}</li>
            </ul>
            <Chip color="secondary" label="v1.0.3" /> – Aug 24, 2019
            <ul>
              <li>{L('Add analytics dashboard DA')}</li>
              <li>{L('Add language dropdown')}</li>
              <li>{L('Small visual changes')}</li>
              <li>{L('UpgradeLastVersion')}</li>
            </ul>
            <Chip color="secondary" label="v1.0.2" /> – Aug 17, 2019
            <ul>
              <li>{L('Add IE11 support')}</li>
              <li>{L('Add indigo color variant')}</li>
              <li>{L('Add sidebar badges')}</li>
              <li>{L('Add profile page PP')}</li>
              <li>{L('Add projects page PP')}</li>
              <li>{L('Add tasks page PT')}</li>
              <li>{L('Small visual changes')}</li>
              <li>{L('UpgradeLastVersion')}</li>
            </ul>
            <Chip color="secondary" label="v1.0.1" /> – Aug 2, 2019
            <ul>
              <li>{L('Add dark sidebar variant')}</li>
              <li>{L('Add light sidebar variant')}</li>
              <li>{L('Add settings page (/settings)')}</li>
              <li>{L('Add google maps (/maps)')}</li>
              <li>{L('Add drawer with color variant')}</li>
              <li>{L('Small visual changes')}</li>
              <li>{L('UpgradeLastVersion')}</li>
            </ul>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

export default Changelog
