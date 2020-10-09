import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { L } from '../../utils/lang'

import Helmet from 'react-helmet';

import {
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Radio,
  RadioGroup,
  Switch,
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

class RadioButtonsGroup extends React.Component {
  state = {
    value: "female"
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Radio Buttons')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('radioBtnDes')}
          </Typography>
          <Paper mt={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{L('Gender')}</FormLabel>
              < RadioGroup
                aria-label={L('Gender')}
                name="gender1"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label={L('Female')}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label={L('Male')}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label={L('Other')}
                />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label={L('(Disabled option)')}
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </CardContent>
      </Card >
    );
  }
}

class CheckboxesGroup extends React.Component {
  state = {
    gilad: true,
    jason: false,
    antoine: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { gilad, jason, antoine } = this.state;

    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Checkboxes')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('CheckboxesDes')}
          </Typography>
          <Paper mt={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{L('Assign responsibility')}</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={gilad}
                      onChange={this.handleChange("gilad")}
                      value="gilad"
                    />
                  }
                  label={L('Gilad Gray')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jason}
                      onChange={this.handleChange("jason")}
                      value="jason"
                    />
                  }
                  label={L('Jason Killian')}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={antoine}
                      onChange={this.handleChange("antoine")}
                      value="antoine"
                    />
                  }
                  label={L('Antoine Llorca')}
                />
              </FormGroup>
            </FormControl>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class SwitchesGroup extends React.Component {
  state = {
    gilad: true,
    jason: false,
    antoine: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Switches')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('SwitchesDes')}
          </Typography>
          <Paper mt={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{L('Assign responsibility')}</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.gilad}
                      onChange={this.handleChange("gilad")}
                      value="gilad"
                    />
                  }
                  label={L('Gilad Gray')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.jason}
                      onChange={this.handleChange("jason")}
                      value="jason"
                    />
                  }
                  label={L('Jason Killian')}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.antoine}
                      onChange={this.handleChange("antoine")}
                      value="antoine"
                    />
                  }
                  label={L('Antoine Llorca')}
                />
              </FormGroup>
            </FormControl>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class FormControlLabelPosition extends React.Component {
  state = {
    value: "female"
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Label placement')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('Label placement des')}
          </Typography>
          <Paper mt={3}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="position"
                name="position"
                value={this.state.value}
                onChange={this.handleChange}
                row
              >
                <FormControlLabel
                  value="top"
                  control={<Radio color="primary" />}
                  label={L('Top')}
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="start"
                  control={<Radio color="primary" />}
                  label={L('Start')}
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="bottom"
                  control={<Radio color="primary" />}
                  label={L('Bottom')}
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="end"
                  control={<Radio color="primary" />}
                  label={L('End')}
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function SelectionControls() {
  return (
    <React.Fragment>
      <Helmet title="Selection Controls" />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Selection Controls')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Forms')}
        </Link>
        <Typography>{L('Selection Controls')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <RadioButtonsGroup />
          <SwitchesGroup />
        </Grid>
        <Grid item xs={12} md={6}>
          <CheckboxesGroup />
          <FormControlLabelPosition />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SelectionControls;
