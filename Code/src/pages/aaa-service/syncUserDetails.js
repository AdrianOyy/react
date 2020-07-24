import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

// import Helmet from 'react-helmet';

import {
  CardContent,
  Grid,
  Link,
  // MenuItem,
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
    corpId: "chaukm",
    alias: "chaukm",
    surname: "CHAU",
    givenname: "Joseph",
    title: "SA(N3)3",
    displayname: "Joseph CHAU Dr, HOIT&HI SA(N3)3",
    email: "chaukm@ha.org.hk",
    proxyAddresses: "chaukm@pyn.ha.org.hk, chaukm@ha.org.hk,",
    cluster: "HO",
    hospital: "KITEC",
    department: "IT&HID",
    passwordLastSet: "2020-07-17 06:07:29",
    UACCode: "512",
    UACDesc: "NORMAL_ACCOUNT",
    createdAt: "2020-07-17 06:07:29",
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Profile Details
          </Typography>
          <Paper mt={3}>
            <form noValidate autoComplete="off">
              <TextField
                id="standard-read-only-input"
                label="CORP ID"
                value={this.state.corpId}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="Alias"
                value={this.state.alias}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="Surname"
                value={this.state.surname}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="Given Name"
                value={this.state.givenname}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="Title"
                value={this.state.title}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="Display Name"
                value={this.state.displayname}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="Email"
                value={this.state.email}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Proxy Addresses"
                multiline
                rowsMax="4"
                value={this.state.proxyAddresses}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="Cluster"
                value={this.state.cluster}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="Hospital"
                value={this.state.hospital}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="Department"
                value={this.state.department}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="PasswordLastSet"
                value={this.state.passwordLastSet}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="UAC Code"
                value={this.state.UACCode}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              <TextField
                id="standard-multiline-flexible"
                label="UAC Desc"
                multiline
                rowsMax="4"
                value={this.state.UACDesc}
                m={4}
              />
              <TextField
                id="standard-read-only-input"
                label="CreatedAt"
                value={this.state.createdAt}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
              {/* <TextField
                id="standard-name"
                label="Name"
                value={this.state.name}
                onChange={this.handleChange("name")}
                m={2}
              />

              <TextField
                id="standard-uncontrolled"
                label="Uncontrolled"
                defaultValue="foo"
                m={2}
              />

              <TextField
                required
                id="standard-required"
                label="Required"
                defaultValue="Hello World"
                m={2}
              />

              <TextField
                error
                id="standard-error"
                label="Error"
                defaultValue="Hello World"
                m={2}
              />

              <TextField
                disabled
                id="standard-disabled"
                label="Disabled"
                defaultValue="Hello World"
                m={2}
              />

              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                m={2}
              />

              <TextField
                id="standard-read-only-input"
                label="Read Only"
                defaultValue="Hello World"
                InputProps={{
                  readOnly: true
                }}
                m={2}
              />

              <TextField
                id="standard-dense"
                label="Dense"
                margin="dense"
                m={2}
              />

              <TextField
                id="standard-multiline-flexible"
                label="Multiline"
                multiline
                rowsMax="4"
                value={this.state.multiline}
                onChange={this.handleChange("multiline")}
                m={2}
              />

              <TextField
                id="standard-multiline-static"
                label="Multiline"
                multiline
                rows="4"
                defaultValue="Default Value"
                m={2}
              />

              <TextField
                id="standard-helperText"
                label="Helper text"
                defaultValue="Default Value"
                helperText="Some important text"
                m={2}
              />

              <TextField
                id="standard-with-placeholder"
                label="With placeholder"
                placeholder="Placeholder"
              />

              <TextField
                id="standard-textarea"
                label="With placeholder multiline"
                placeholder="Placeholder"
                multiline
                m={2}
              />

              <TextField
                id="standard-number"
                label="Number"
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
                label="Search field"
                type="search"
                m={2}
              />

              <TextField
                id="standard-select-currency"
                select
                label="Select"
                value={this.state.currency}
                onChange={this.handleChange("currency")}
                helperText="Please select your currency"
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
                label="Native select"
                value={this.state.currency}
                onChange={this.handleChange("currency")}
                SelectProps={{
                  native: true
                }}
                helperText="Please select your currency"
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
                label="Label"
                style={{ margin: 8 }}
                placeholder="Placeholder"
                helperText="Full width!"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                m={2}
              />

              <TextField id="standard-bare" defaultValue="Bare" m={2} /> */}
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
      {/* <Helmet title="Text Fields" />
      <Typography variant="h3" gutterBottom display="inline">
        Text Fields
      </Typography> */}

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>AAA Service</Typography>
        <Link component={NavLink} exact to="/aaa-service/users">
          User Profile
        </Link>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <DefaultTextFields />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TextFields;
