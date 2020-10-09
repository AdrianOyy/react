import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { L } from '../../utils/lang'

import Helmet from 'react-helmet';

import {
  Avatar,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Select,
  Switch,
  TextField,
  Typography
} from "@material-ui/core";

import { Add as AddIcon, Person as PersonIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const emails = ["username@gmail.com", "user02@gmail.com"];

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={true}
        {...other}
      >
        <DialogTitle id="simple-dialog-title">{L('Set backup account')}</DialogTitle>
        <div>
          <List>
            {emails.map(email => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(email)}
                key={email}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => this.handleListItemClick("addAccount")}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

class SimpleDialogDemo extends React.Component {
  state = {
    open: false,
    selectedValue: emails[1]
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Simple Dialogs')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('simpleDialogsDes')}
          </Typography>
          <Paper mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClickOpen}
            >
              {L('Open simple dialog')}
            </Button>
            <SimpleDialog
              selectedValue={this.state.selectedValue}
              open={this.state.open}
              onClose={this.handleClose}
            />
            <Paper mt={2}>
              <Typography variant="body2">
                {L('Selected')}: {this.state.selectedValue}
              </Typography>
            </Paper>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class AlertDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Alerts')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('alertsDes')}
          </Typography>

          <Paper mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClickOpen}
            >
              {L('Open alert dialog')}
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {L('useGoogleService')}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {L('useGoogleDes')}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  {L('Disagree')}
                </Button>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                  {L('Agree')}
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class MaxWidthDialog extends React.Component {
  state = {
    open: false,
    fullWidth: true,
    maxWidth: "sm"
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMaxWidthChange = event => {
    this.setState({ maxWidth: event.target.value });
  };

  handleFullWidthChange = event => {
    this.setState({ fullWidth: event.target.checked });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Simple Dialogs')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('simpleDialogsDes')}
          </Typography>

          <Paper mt={4}>
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickOpen}
              >
                {L('Open max-width dialog')}
              </Button>
              <Dialog
                fullWidth={this.state.fullWidth}
                maxWidth={this.state.maxWidth}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="max-width-dialog-title"
              >
                <DialogTitle id="max-width-dialog-title">
                  {L('Optional sizes')}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {L('optionalSizesDes')}
                  </DialogContentText>
                  <form noValidate>
                    <FormControl>
                      <InputLabel htmlFor="max-width">{L('maxWidth')}</InputLabel>
                      <Select
                        value={this.state.maxWidth}
                        onChange={this.handleMaxWidthChange}
                        inputProps={{
                          name: "max-width",
                          id: "max-width"
                        }}
                      >
                        <MenuItem value={false}>{L('false')}</MenuItem>
                        <MenuItem value="xs">{L('xs')}</MenuItem>
                        <MenuItem value="sm">{L('sm')}</MenuItem>
                        <MenuItem value="md">{L('md')}</MenuItem>
                        <MenuItem value="lg">{L('lg')}</MenuItem>
                        <MenuItem value="xl">{L('xl')}</MenuItem>
                      </Select>
                    </FormControl>
                  </form>
                  <form>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.fullWidth}
                          onChange={this.handleFullWidthChange}
                          value="fullWidth"
                        />
                      }
                      label={L('Full width')}
                    />
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    {L('Close')}
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class FormDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Form Dialogs')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('formDialogsDes')}
          </Typography>

          <Paper mt={4}>
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickOpen}
              >
                {L('Open form dialog')}
              </Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">{L('Subscribe')}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {L('subscribeDes')}
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={L('Email Address')}
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    {L('Cancel')}
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    {L('Subscribe')}
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function Dialogs() {
  return (
    <React.Fragment>
      <Helmet title={L('Dialogs')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Dialogs')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Components')}
        </Link>
        <Typography>{L('Dialogs')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleDialogDemo />
          <AlertDialog />
        </Grid>
        <Grid item xs={12} md={6}>
          <MaxWidthDialog />
          <FormDialog />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Dialogs;
