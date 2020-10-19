import React from "react"
import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"
import { L } from '../../utils/lang'

import Helmet from 'react-helmet'

import {
  Button,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core"

import { Close as CloseIcon } from '@material-ui/icons'

import { Alert as MuiAlert, AlertTitle } from '@material-ui/lab'

import { spacing } from "@material-ui/system"

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Card = styled(MuiCard)(spacing)

const Spacer = styled.div(spacing)

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const Alert = styled(MuiAlert)(spacing)

function SimpleAlerts() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Simple alerts')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('simpleAltersDes')}
        </Typography>

        <Spacer mb={4} />

        <Alert mb={4} severity="error">{L('alertCheckOut', [ L('error') ])}</Alert>
        <Alert mb={4} severity="warning">{L('alertCheckOut', [ L('warning') ])}</Alert>
        <Alert mb={4} severity="info">{L('alertCheckOut', [ L('info') ])}</Alert>
        <Alert severity="success">{L('alertCheckOut', [ L('success') ])}</Alert>
      </CardContent>
    </Card>
  )
}

function OutlinedAlerts() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Outlined alerts')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('outlinedAltersDes')}
        </Typography>

        <Spacer mb={4} />
        <Alert mb={4} severity="error" variant="outlined">{L('alertCheckOut', [ L('error') ])}</Alert>
        <Alert mb={4} severity="warning" variant="outlined">{L('alertCheckOut', [ L('warning') ])}</Alert>
        <Alert mb={4} severity="info" variant="outlined">{L('alertCheckOut', [ L('info') ])}</Alert>
        <Alert severity="success" variant="outlined">{L('alertCheckOut', [ L('success') ])}</Alert>

      </CardContent>
    </Card>
  )
}

function FilledAlerts() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Filled alerts')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('filledAlertsDes')}
        </Typography>

        <Spacer mb={4} />
        <Alert mb={4} severity="error" variant="filled">{L('alertCheckOut', [ L('error') ])}</Alert>
        <Alert mb={4} severity="warning" variant="filled">{L('alertCheckOut', [ L('warning') ])}</Alert>
        <Alert mb={4} severity="info" variant="filled">{L('alertCheckOut', [ L('info') ])}</Alert>
        <Alert severity="success" variant="filled">{L('alertCheckOut', [ L('success') ])}</Alert>

      </CardContent>
    </Card>
  )
}

function AdvancedAlerts() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Advanced alerts')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('advancedAlertsDes')}
        </Typography>

        <Spacer mb={4} />

        <Alert mb={4} severity="error">
          <AlertTitle>{L('Error')}</AlertTitle>
          {L('alterCon') + [ L('error') ]}<strong>{L('checkItOut')}</strong>
        </Alert>
        <Alert mb={4} severity="warning">
          <AlertTitle>{L('Warning')}</AlertTitle>
          {L('alterCon') + [ L('warning') ]}<strong>{L('checkItOut')}</strong>
        </Alert>
        <Alert mb={4} severity="info">
          <AlertTitle>{L('Info')}</AlertTitle>
          {L('alterCon') + [ L('info') ]}<strong>{L('checkItOut')}</strong>
        </Alert>
        <Alert mb={4} severity="success">
          <AlertTitle>{L('Success')}</AlertTitle>
          {L('alterCon') + [ L('success') ]}<strong>{L('checkItOut')}</strong>
        </Alert>
      </CardContent>
    </Card>
  )
}

function ActionAlerts() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Actions')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('actAlertsDes')}
        </Typography>

        <Spacer mb={4} />

        <Alert mb={4} onClose={() => { }}>
          {L('alertCheckOut', [ L('success') ])}
        </Alert>
        <Alert
          action={
            <Button color="inherit" size="small">
              {L('UNDO')}
            </Button>
          }
        >
          {L('alertCheckOut', [ L('success') ])}
        </Alert>
      </CardContent>
    </Card>
  )
}

function TransitionAlerts() {
  const [ open, setOpen ] = React.useState(true)

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Transition')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('transAlertsDes')}
        </Typography>

        <Spacer mb={4} />

        <Collapse in={open}>
          <Alert
            mb={4}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {L('Close me!')}
          </Alert>
        </Collapse>
        <Button
          disabled={open}
          variant="outlined" L
          onClick={() => {
            setOpen(true)
          }}
        >
          {L('Re-open')}
        </Button>
      </CardContent>
    </Card>
  )
}

function Alerts() {
  return (
    <React.Fragment>
      <Helmet title={L('Alerts')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Alerts')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Components')}
        </Link>
        <Typography>{L('Alerts')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleAlerts />
          <OutlinedAlerts />
          <FilledAlerts />
        </Grid>
        <Grid item xs={12} md={6}>
          <AdvancedAlerts />
          <ActionAlerts />
          <TransitionAlerts />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Alerts
