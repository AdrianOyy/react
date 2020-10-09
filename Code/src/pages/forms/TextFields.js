import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { L } from '../../utils/lang'

import Helmet from 'react-helmet';

import {
  CardContent,
  Grid,
  Link,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
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

const TextFieldSpacing = styled(MuiTextField)(spacing);

const TextField = styled(TextFieldSpacing)`
  width: 200px;
`;

class DefaultTextFields extends React.Component {
  constructor(props) {
    super(props);

    this.currencies = [
      {
        value: "USD",
        label: "$"
      },
      {
        value: "EUR",
        label: "€"
      },
      {
        value: "BTC",
        label: "฿"
      },
      {
        value: "JPY",
        label: "¥"
      }
    ];
  }

  state = {
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Text Fields')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {L('The') + ' '} <code>{L('TextField')}</code>{' ' + L('TextFieldDes')}
          </Typography>
          <Paper mt={3}>
            <form noValidate autoComplete="off">
              <TextField
                id="standard-name"
                label={L('Name')}
                value={this.state.name}
                onChange={this.handleChange("name")}
                m={2}
              />

              <TextField
                id="standard-uncontrolled"
                label={L('Uncontrolled')}
                defaultValue="foo"
                m={2}
              />

              <TextField
                required
                id="standard-required"
                label={L('Required')}
                defaultValue={L("Hello World")}
                m={2}
              />

              <TextField
                error
                id="standard-error"
                label={L('Error')}
                defaultValue={L("Hello World")}
                m={2}
              />

              <TextField
                disabled
                id="standard-disabled"
                label={L('Disabled')}
                defaultValue={L("Hello World")}
                m={2}
              />

              <TextField
                id="standard-password-input"
                label={L('Password')}
                type="password"
                autoComplete="current-password"
                m={2}
              />

              <TextField
                id="standard-read-only-input"
                label={L("Read Only")}
                defaultValue={L("Hello World")}
                InputProps={{
                  readOnly: true
                }}
                m={2}
              />

              <TextField
                id="standard-dense"
                label={L('Dense')}
                margin="dense"
                m={2}
              />

              <TextField
                id="standard-multiline-flexible"
                label={L('Multiline')}
                multiline
                rowsMax="4"
                value={this.state.multiline}
                onChange={this.handleChange("multiline")}
                m={2}
              />

              <TextField
                id="standard-multiline-static"
                label={L('Multiline')}
                multiline
                rows="4"
                defaultValue={L("Default Value")}
                m={2}
              />

              <TextField
                id="standard-helperText"
                label={L('Helper text')}
                defaultValue={L("Default Value")}
                helperText={L("Some important text")}
                m={2}
              />

              <TextField
                id="standard-with-placeholder"
                label={L('With placeholder')}
                placeholder={L("Placeholder")}
              />

              <TextField
                id="standard-textarea"
                label={L('With placeholder multiline')}
                placeholder={L("Placeholder")}
                multiline
                m={2}
              />

              <TextField
                id="standard-number"
                label={L('Number')}
                value={this.state.age}
                onChange={this.handleChange("age")}
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
                m={2}
              />

              <TextField
                id="standard-search"
                label={L('Search field')}
                type="search"
                m={2}
              />

              <TextField
                id="standard-select-currency"
                select
                label={L('Select')}
                value={this.state.currency}
                onChange={this.handleChange("currency")}
                helperText={L("Please select your currency")}
                m={2}
              >
                {this.currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency-native"
                select
                label={L('Native select')}
                value={this.state.currency}
                onChange={this.handleChange("currency")}
                SelectProps={{
                  native: true
                }}
                helperText={L("Please select your currency")}
                m={2}
              >
                {this.currencies.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                id="standard-full-width"
                label={L("Label")}
                style={{ margin: 8 }}
                placeholder={L("Placeholder")}
                helperText={L("Full width!")}
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                m={2}
              />

              <TextField id="standard-bare" defaultValue="Bare" m={2} />
            </form>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

class OutlinedTextFields extends React.Component {
  constructor(props) {
    super(props);

    this.currencies = [
      {
        value: "USD",
        label: "$"
      },
      {
        value: "EUR",
        label: "€"
      },
      {
        value: "BTC",
        label: "฿"
      },
      {
        value: "JPY",
        label: "¥"
      }
    ];
  }

  state = {
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {L('Outlined Text Fields')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <code>{L('TextField')}</code>{" " + L('supports outlined styling.')}
          </Typography>
          <Paper mt={3}>
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-name"
                label={L("Name")}
                m={2}
                value={this.state.name}
                onChange={this.handleChange("name")}
                variant="outlined"
              />

              <TextField
                id="outlined-uncontrolled"
                label={L("Uncontrolled")}
                defaultValue="foo"
                m={2}
                variant="outlined"
              />

              <TextField
                required
                id="outlined-required"
                label={L("Uncontrolled")}
                defaultValue={L("Hello World")}
                m={2}
                variant="outlined"
              />

              <TextField
                error
                id="outlined-error"
                label={L("Error")}
                defaultValue={L("Hello World")}
                m={2}
                variant="outlined"
              />

              <TextField
                disabled
                id="outlined-disabled"
                label={L("Disabled")}
                defaultValue={L("Hello World")}
                m={2}
                variant="outlined"
              />

              <TextField
                id="outlined-email-input"
                label={L("Email")}
                m={2}
                type="email"
                name="email"
                autoComplete="email"
                variant="outlined"
              />

              <TextField
                id="outlined-password-input"
                label={L("Password")}
                m={2}
                type="password"
                autoComplete="current-password"
                variant="outlined"
              />

              <TextField
                id="outlined-read-only-input"
                label={L("Read Only")}
                defaultValue={L("Hello World")}
                m={2}
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
              />

              <TextField
                id="outlined-dense"
                label={L("Dense")}
                margin="dense"
                variant="outlined"
              />

              <TextField
                id="outlined-multiline-flexible"
                label={L("Multiline")}
                multiline
                rowsMax="4"
                value={this.state.multiline}
                onChange={this.handleChange("multiline")}
                m={2}
                helperText="hello"
                variant="outlined"
              />

              <TextField
                id="outlined-multiline-static"
                label={L("Multiline")}
                multiline
                rows="4"
                defaultValue={L("Default Value")}
                m={2}
                variant="outlined"
              />

              <TextField
                id="outlined-helperText"
                label={L("Helper text")}
                defaultValue={L("Default Value")}
                m={2}
                helperText={L("Some important text")}
                variant="outlined"
              />

              <TextField
                id="outlined-with-placeholder"
                label={L("With placeholder")}
                placeholder={L("Placeholder")}
                m={2}
                variant="outlined"
              />

              <TextField
                id="outlined-textarea"
                label={L("Multiline Placeholder")}
                placeholder={L("Placeholder")}
                multiline
                m={2}
                variant="outlined"
              />

              <TextField
                id="outlined-number"
                label={L("Number")}
                value={this.state.age}
                onChange={this.handleChange("age")}
                type="number"
                m={2}
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
              />

              <TextField
                id="outlined-search"
                label={L("Search field")}
                type="search"
                m={2}
                variant="outlined"
              />

              <TextField
                id="outlined-select-currency"
                select
                label={L("Select")}
                m={2}
                value={this.state.currency}
                onChange={this.handleChange("currency")}
                helperText={L("Please select your currency")}
                variant="outlined"
              >
                {this.currencies.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency-native"
                select
                label={L("Native select")}
                m={2}
                value={this.state.currency}
                onChange={this.handleChange("currency")}
                SelectProps={{
                  native: true
                }}
                helperText={L("Please select your currency")}
                variant="outlined"
              >
                {this.currencies.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                id="outlined-full-width"
                label={L("Label")}
                style={{ margin: 8 }}
                placeholder={L("Placeholder")}
                helperText={L("Full width!")}
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextField
                id="outlined-bare"
                m={2}
                defaultValue="Bare"
                variant="outlined"
              />
            </form>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function TextFields() {
  return (
    <React.Fragment>
      <Helmet title={L('Text Fields')} />
      <Typography variant="h3" gutterBottom display="inline">
        {L('Text Fields')}
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          {L('Dashboard')}
        </Link>
        <Link component={NavLink} exact to="/">
          {L('Forms')}
        </Link>
        <Typography>{L('Text Fields')}</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <DefaultTextFields />
          <OutlinedTextFields />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TextFields;
