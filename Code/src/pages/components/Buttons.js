import React from "react"
import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"
import { L } from '../../utils/lang'

import Helmet from 'react-helmet'

import {
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  Divider as MuiDivider,
  Fab as MuiFab,
  IconButton as MuiIconButton,
  Typography
} from "@material-ui/core"

import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  KeyboardVoice as KeyboardVoiceIcon,
  Navigation as NavigationIcon,
  Save as SaveIcon
} from "@material-ui/icons"

import { spacing } from "@material-ui/system"

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Card = styled(MuiCard)(spacing)

const Button = styled(MuiButton)(spacing)

const Fab = styled(MuiFab)(spacing)

const IconButton = styled(MuiIconButton)(spacing)

const Divider = styled(MuiDivider)(spacing)

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

function ContainedButtons() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Contained Buttons')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('containedButtonsDes')}
        </Typography>
        <Button mr={2} variant="contained">
          {L('Default')}
        </Button>
        <Button mr={2} variant="contained" color="primary">
          {L('Primary')}
        </Button>
        <Button mr={2} variant="contained" color="secondary">
          {L('Secondary')}
        </Button>
        <Button mr={2} variant="contained" color="secondary" disabled>
          {L('Disabled')}
        </Button>
        <Button mr={2} variant="contained" href="#contained-buttons">
          {L('Link')}
        </Button>
      </CardContent>
    </Card>
  )
}

function TextButtons() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Text Buttons')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('textButtonsDes')}
        </Typography>
        <Button mr={2}>{L('Default')}</Button>
        <Button mr={2} color="primary">
          {L('Primary')}
        </Button>
        <Button mr={2} color="secondary">
          {L('Secondary')}
        </Button>
        <Button mr={2} disabled>
          {L('Disabled')}
        </Button>
        <Button mr={2} href="#text-buttons">
          {L('Link')}
        </Button>
      </CardContent>
    </Card>
  )
}

function OutlinedButtons() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Outlined Buttons')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('outlinedButtonsDes')}
        </Typography>
        <Button mr={2} variant="outlined">
          {L('Default')}
        </Button>
        <Button mr={2} variant="outlined" color="primary">
          {L('Primary')}
        </Button>
        <Button mr={2} variant="outlined" color="secondary">
          {L('Secondary')}
        </Button>
        <Button mr={2} variant="outlined" disabled>
          {L('Disabled')}
        </Button>
        <Button mr={2} variant="outlined" href="#outlined-buttons">
          {L('Link')}
        </Button>
      </CardContent>
    </Card>
  )
}

function FloatingActionButtons() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Floating Action Buttons')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('floatActButtonsDes')}
        </Typography>
        <Fab mx={2} color="primary" aria-label="Add">
          <AddIcon />
        </Fab>
        <Fab mx={2} color="secondary" aria-label="Edit">
          <EditIcon />
        </Fab>
        <Fab mx={2} variant="extended" aria-label="Delete">
          <NavigationIcon />
          {L('Extended')}
        </Fab>
        <Fab mx={2} disabled aria-label="Delete">
          <DeleteIcon />
        </Fab>
      </CardContent>
    </Card>
  )
}

function ButtonSizes() {
  return (
    <Card mb={6}>
      <CardContent>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            {L('Button Sizes')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('buttonSizesDes')}
          </Typography>
        </React.Fragment>
        <div>
          <Button mr={2} size="small">
            {L('Small')}
          </Button>
          <Button mr={2} size="medium">
            {L('Medium')}
          </Button>
          <Button mr={2} size="large">
            {L('Large')}
          </Button>
        </div>
        <div>
          <Button mr={2} variant="outlined" size="small" color="primary">
            {L('Small')}
          </Button>
          <Button mr={2} variant="outlined" size="medium" color="primary">
            {L('Medium')}
          </Button>
          <Button mr={2} variant="outlined" size="large" color="primary">
            {L('Large')}
          </Button>
        </div>
        <div>
          <Button mr={2} variant="contained" size="small" color="primary">
            {L('Small')}
          </Button>
          <Button mr={2} variant="contained" size="medium" color="primary">
            {L('Medium')}
          </Button>
          <Button mr={2} variant="contained" size="large" color="primary">
            {L('Large')}
          </Button>
        </div>
        <div>
          <Fab mx={2} size="small" color="secondary" aria-label="Add">
            <AddIcon />
          </Fab>
          <Fab mx={2} size="medium" color="secondary" aria-label="Add">
            <AddIcon />
          </Fab>
          <Fab mx={2} color="secondary" aria-label="Add">
            <AddIcon />
          </Fab>
        </div>
        <div>
          <IconButton mx={2} aria-label="Delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton mx={2} aria-label="Delete">
            <DeleteIcon />
          </IconButton>
          <IconButton mx={2} aria-label="Delete">
            <DeleteIcon fontSize="large" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  )
}

function IconButtons() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Icon Buttons')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('iconButtonsDes')}
        </Typography>

        <Button mr={2} variant="contained" color="primary">
          {L('Add')}
          <AddIcon />
        </Button>
        <Button mr={2} variant="contained" color="secondary">
          {L('Edit')}
          <EditIcon />
        </Button>
        <Button mr={2} variant="contained" color="default">
          {L('Upload')}
          <CloudUploadIcon />
        </Button>
        <Button mr={2} variant="contained" disabled color="secondary">
          <KeyboardVoiceIcon />
          {L('Talk')}
        </Button>
        <Button mr={2} variant="contained" size="small">
          <SaveIcon />
          {L('Save')}
        </Button>
      </CardContent>
    </Card>
  )
}

function Buttons() {
  return (
    <React.Fragment>
      <Helmet title={L('Buttons')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Buttons')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Components')}
        </Link>
        <Typography>{L('Buttons')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <ContainedButtons />
          <OutlinedButtons />
          <TextButtons />
          <IconButtons />
        </Grid>
        <Grid item xs={12} md={6}>
          <ButtonSizes />
          <FloatingActionButtons />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Buttons
