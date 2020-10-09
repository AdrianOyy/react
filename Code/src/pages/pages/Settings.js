import React from "react"
import styled from "styled-components"
import { NavLink as RouterNavLink } from "react-router-dom"

import Helmet from 'react-helmet'
import { L } from '../../utils/lang'

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography
} from "@material-ui/core"

import { CloudUpload as MuiCloudUpload } from "@material-ui/icons"

import { spacing } from "@material-ui/system"

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
))

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing)

const Card = styled(MuiCard)(spacing)

const Divider = styled(MuiDivider)(spacing)

const FormControl = styled(MuiFormControl)(spacing)

const TextField = styled(MuiTextField)(spacing)

const Button = styled(MuiButton)(spacing)

const CloudUpload = styled(MuiCloudUpload)(spacing)

const CenteredContent = styled.div`
  text-align: center;
`

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${props => props.theme.spacing(2)}px;
`

function Public() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Public info')}
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={8}>
            <TextField id="username" label={L('Username')} defaultValue="lucylavender" variant="outlined" fullWidth my={2} />
            <FormControl fullWidth my={2} variant="outlined">
              <TextField
                label={L('Biography')}
                id="biography"
                multiline={true}
                rows={3}
                rowsMax={4}
                variant="outlined"
                defaultValue="Lucy is a Freelance Writer and Social Media Manager who helps finance professionals and Fin-tech startups build an audience and get more paying clients online."
              />
            </FormControl>
          </Grid>
          <Grid item md={4}>
            <CenteredContent>
              <BigAvatar
                alt={L('Remy Sharp')}
                src="/static/img/avatars/avatar-1.jpg"
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span">
                  <CloudUpload mr={2} /> {L('Upload')}
                </Button>

                <Typography variant="caption" display="block" gutterBottom>
                  For best results, use an image at least 128px by 128px in .jpg
                  format
                </Typography>
              </label>
            </CenteredContent>
          </Grid>
        </Grid>

        <Button variant="contained" color="primary">
          {L('Save changes')}
        </Button>
      </CardContent>
    </Card>
  )
}

function Private() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Private info')}
        </Typography>

        <Grid container spacing={6}>
          <Grid item md={6}>
            <TextField id="first-name" label={L('First name')} variant="outlined" defaultValue="Lucy" fullWidth my={2} />
          </Grid>
          <Grid item md={6}>
            <TextField id="last-name" label={L('Last name')} variant="outlined" defaultValue="Lavender" fullWidth my={2} />
          </Grid>
        </Grid>

        <TextField id="email" label={L('Email')} variant="outlined" type="email" defaultValue="lucylavender@gmail.com" fullWidth my={2} />

        <TextField id="address" label={L('Address')} variant="outlined" fullWidth my={2} />

        <TextField id="address2" label={L('Apartment, studio, or floor')} variant="outlined" fullWidth my={2} />

        <Grid container spacing={6}>
          <Grid item md={6}>
            <TextField id="city" label={L('City')} variant="outlined" fullWidth my={2} />
          </Grid>
          <Grid item md={4}>
            <TextField id="state" label={L('State')} variant="outlined" fullWidth my={2} />
          </Grid>
          <Grid item md={2}>
            <TextField id="zip" label={L('Zip')} variant="outlined" fullWidth my={2} />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" mt={3}>
          {L('Save changes')}
        </Button>
      </CardContent>
    </Card>
  )
}

function Settings() {
  return (
    <React.Fragment>
      <Helmet title="Settings" />

      <Typography variant="h3" gutterBottom display="inline">
        {L('Settings')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Pages')}
        </Link>
        <Typography>{L('Settings')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Public />
          <Private />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Settings
