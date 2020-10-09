import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { L } from '../../utils/lang'

import Helmet from 'react-helmet';

import {
  CardContent,
  ClickAwayListener,
  Fab,
  Fade,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  Divider as MuiDivider,
  IconButton as MuiIconButton,
  Paper as MuiPaper,
  Tooltip,
  Typography,
  Zoom
} from "@material-ui/core";

import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const IconButton = styled(MuiIconButton)(spacing);

const Button = styled(MuiButton)(spacing);

function SimpleTooltips() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Simple Tooltips')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('simpleTooltipsDes')}
        </Typography>
        <Paper mt={3}>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" mr={2}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={L('Add')} aria-label="Add">
            <Fab color="primary">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Paper>
      </CardContent>
    </Card>
  );
}

function PositionedTooltips() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Positioned Tooltips')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('positionedTooltipsDes')}
        </Typography>
        <Paper mt={3}>
          <Grid container justify="center">
            <Grid item>
              <Tooltip title={L('Add')} placement="top-start">
                <Button variant="contained" color="secondary" m={1}>
                  {L('top-start')}
                </Button>
              </Tooltip>
              <Tooltip title={L('Add')} placement="top">
                <Button variant="contained" color="secondary" m={1}>
                  {L('top')}
                </Button>
              </Tooltip>
              <Tooltip title={L('Add')} placement="top-end">
                <Button variant="contained" color="secondary" m={1}>
                  {L('top-end')}
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Tooltip title={L('Add')} placement="left-start">
                <Button variant="contained" color="secondary" m={1}>
                  {L('left-start')}
                </Button>
              </Tooltip>
              <br />
              <Tooltip title={L('Add')} placement="left">
                <Button variant="contained" color="secondary" m={1}>
                  {L('left')}
                </Button>
              </Tooltip>
              <br />
              <Tooltip title={L('Add')} placement="left-end">
                <Button variant="contained" color="secondary" m={1}>
                  {L('left-end')}
                </Button>
              </Tooltip>
            </Grid>
            <Grid
              item
              container
              xs={6}
              alignItems="flex-end"
              direction="column"
              spacing={0}
            >
              <Grid item>
                <Tooltip title={L('Add')} placement="right-start">
                  <Button variant="contained" color="secondary" m={1}>
                    {L('right-start')}
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={L('Add')} placement="right">
                  <Button variant="contained" color="secondary" m={1}>
                    {L('right')}
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={L('Add')} placement="right-end">
                  <Button variant="contained" color="secondary" m={1}>
                    {L('right-end')}
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Tooltip title={L('Add')} placement="bottom-start">
                <Button variant="contained" color="secondary" m={1}>
                  {L('bottom-start')}
                </Button>
              </Tooltip>
              <Tooltip title={L('Add')} placement="bottom">
                <Button variant="contained" color="secondary" m={1}>
                  {L('bottom')}
                </Button>
              </Tooltip>
              <Tooltip title={L('Add')} placement="bottom-end">
                <Button variant="contained" color="secondary" m={1}>
                  {L('bottom-end')}
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      </CardContent>
    </Card>
  );
}

class TriggersTooltips extends React.Component {
  state = {
    open: false
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Triggerable Tooltips')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('triggeralbTooptipsDes')}
          </Typography>
          <Paper mt={3}>
            <Grid container>
              <Grid item>
                <Tooltip disableFocusListener title={L('Add')} >
                  <Button variant="contained" color="secondary" mr={2}>
                    {L('Hover or touch')}
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip disableHoverListener title={L('Add')} >
                  <Button variant="contained" color="secondary" mr={2}>
                    {L('Focus or touch')}
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip disableFocusListener disableTouchListener title={L('Add')} >
                  <Button variant="contained" color="secondary" mr={2}>
                    {L('Hover')}
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                  <div>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true
                      }}
                      onClose={this.handleTooltipClose}
                      open={this.state.open}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title={L('Add')}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        mr={2}
                        onClick={this.handleTooltipOpen}
                      >
                        {L('Click')}
                      </Button>
                    </Tooltip>
                  </div>
                </ClickAwayListener>
              </Grid>
            </Grid>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function TransitionsTooltips() {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {L('Transitions Tooltips')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {L('transTooltipsDes')}
        </Typography>
        <Paper mt={3}>
          <Tooltip title={L('Add')} >
            <Button variant="contained" color="secondary" mr={2}>
              {L('Grow')}
            </Button>
          </Tooltip>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            title={L('Add')}
          >
            <Button variant="contained" color="secondary" mr={2}>
              {L('Fade')}
            </Button>
          </Tooltip>
          <Tooltip TransitionComponent={Zoom} title={L('Add')} >
            <Button variant="contained" color="secondary" mr={2}>
              {L('Zoom')}
            </Button>
          </Tooltip>
        </Paper>
      </CardContent>
    </Card>
  );
}

function Tooltips() {
  return (
    <React.Fragment>
      <Helmet title={L('Tooltips')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Tooltips')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Components')}
        </Link>
        <Typography>{L('Tooltips')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleTooltips />
          <TriggersTooltips />
          <TransitionsTooltips />
        </Grid>
        <Grid item xs={12} md={6}>
          <PositionedTooltips />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Tooltips;
