import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { L } from '../../utils/lang'

import Helmet from 'react-helmet';

import {
  CardContent,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core";

import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

class SimpleExpansionPanel extends React.Component {
  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Simple Expansion Panel')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('simpleExpansionPanlDes')}
          </Typography>
          <div>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{L('Expansion Panel 1')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {L('expansionPanel1Des')}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Expansion Panel 2</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {L('expansionPanel2Des')}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel disabled>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{L('Disabled Expansion Panel')}</Typography>
              </ExpansionPanelSummary>
            </ExpansionPanel>
          </div>{" "}
        </CardContent>
      </Card>
    );
  }
}

class ControlledExpansionPanel extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { expanded } = this.state;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Controlled Expansion Panel')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('controlledExpansionPanelDes')}
          </Typography>
          <div>
            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={this.handleChange("panel1")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{L('General settings')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {L('generaSettingsDes')}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel2"}
              onChange={this.handleChange("panel2")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{L('Users')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {L('usersDes')}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel3"}
              onChange={this.handleChange("panel3")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{L('Advanced settings')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {L('advancedSettingsDes')}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel4"}
              onChange={this.handleChange("panel4")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{L('Personal data')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {L('personalDataDes')}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>{" "}
        </CardContent>
      </Card>
    );
  }
}

function ExpansionPanels() {
  return (
    <React.Fragment>
      <Helmet title={L('Expansion Panels')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Expansion Panels')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Components')}
        </Link>
        <Typography>{L('Expansion Panels')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <SimpleExpansionPanel />
        </Grid>
        <Grid item xs={12} md={6}>
          <ControlledExpansionPanel />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ExpansionPanels;
