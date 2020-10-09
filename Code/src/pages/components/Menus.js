import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { L } from '../../utils/lang'

import Helmet from 'react-helmet';

import {
  Button,
  CardContent,
  Fade,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  ListItemText as MuiListItemText,
  Paper as MuiPaper,
  Typography
} from "@material-ui/core";

import {
  Drafts as DraftsIcon,
  MoveToInbox as InboxIcon,
  Send as SendIcon
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const ListItemText = styled(MuiListItemText)(spacing);

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Simple menu')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('simpleMenuDes')}
          </Typography>
          <Paper mt={3}>
            <Button
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              variant="contained"
              color="secondary"
            >
              {L('Open Menu')}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>{L('Profile')}</MenuItem>
              <MenuItem onClick={this.handleClose}>{L('My account')}</MenuItem>
              <MenuItem onClick={this.handleClose}>{L('Logout')}</MenuItem>
            </Menu>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class TransitionMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Transition Menu')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('transMenuDes')}
          </Typography>
          <Paper mt={3}>
            <Button
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              variant="contained"
              color="secondary"
            >
              {L('Open Menu')}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={this.handleClose}>{L('Profile')}</MenuItem>
              <MenuItem onClick={this.handleClose}>{L('My account')}</MenuItem>
              <MenuItem onClick={this.handleClose}>{L('Logout')}</MenuItem>
            </Menu>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class IconMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Icon Menu')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('Simple menu with icons')}
          </Typography>
          <Paper mt={3}>
            <Button
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
              variant="contained"
              color="secondary"
            >
              {L('Open Menu')}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText inset primary="Sent mail" pl={0} />
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText inset primary="Drafts" pl={0} />
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText inset primary="Inbox" pl={0} />
              </MenuItem>
            </Menu>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class SelectedMenu extends React.Component {
  constructor(props) {
    super(props);

    this.options = [
      L("Show some love to Material-UI"),
      L("Show all notification content"),
      L("Hide sensitive notification content"),
      L("Hide all notification content")
    ];
  }

  state = {
    anchorEl: null,
    selectedIndex: 1
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Selected menu')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('selectesMenuDes')}
          </Typography>
          <Paper mt={3}>
            <List component="nav">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="When device is locked"
                onClick={this.handleClickListItem}
              >
                <ListItemText
                  primary="When device is locked"
                  secondary={this.options[this.state.selectedIndex]}
                />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {this.options.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 0}
                  selected={index === this.state.selectedIndex}
                  onClick={event => this.handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function Menus() {
  return (
    <React.Fragment>
      <Helmet title={L('Menus')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Menus')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Components')}
        </Link>
        <Typography>{L('Menus')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleMenu />
          <TransitionMenu />
        </Grid>
        <Grid item xs={12} md={6}>
          <IconMenu />
          <SelectedMenu />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Menus;
