import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink, useParams } from "react-router-dom";
import dayjs from 'dayjs';
// import Helmet from 'react-helmet';

import {
  CardContent,
  Grid,
  Link,
  // MenuItem,
  Button as MuiButton,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import syncUserAPI from '../../api/syncUser.js'

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

const Button = styled(MuiButton)(spacing);

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

  componentWillUpdate(nextProps){
    if (this.inited) {
      this.setState(nextProps.state);
      this.inited = false;
    }
  }

  inited = true;

  state = {
    corpId: "",
    alias: "",
    surname: "",
    givenname: "",
    title: "",
    displayname: "",
    email: "",
    proxyAddresses: "",
    cluster: "",
    hospital: "",
    department: "",
    passwordLastSet: "",
    UACCode: "",
    UACDesc: "",
    createdAt: "",
  };

  // state = {
  //   corpId: "chaukm",
  //   alias: "chaukm",
  //   surname: "CHAU",
  //   givenname: "Joseph",
  //   title: "SA(N3)3",
  //   displayname: "Joseph CHAU Dr, HOIT&HI SA(N3)3",
  //   email: "chaukm@ha.org.hk",
  //   proxyAddresses: "chaukm@pyn.ha.org.hk, chaukm@ha.org.hk,",
  //   cluster: "HO",
  //   hospital: "KITEC",
  //   department: "IT&HID",
  //   passwordLastSet: "2020-07-17 06:07:29",
  //   UACCode: "512",
  //   UACDesc: "NORMAL_ACCOUNT",
  //   createdAt: "2020-07-17 06:07:29",
  // };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleBack = () => event => {
    window.history.go(-1)
  }

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Profile Detail
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
                label="Sur Name"
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
                label="Password Last Set"
                value={this.state.passwordLastSet ? dayjs(this.state.passwordLastSet).format('YYYY-MM-DD HH:mm:ss') : ''}
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
                label="Created At"
                value={dayjs(this.state.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                InputProps={{
                  readOnly: true
                }}
                m={4}
              />
            </form>
          </Paper>
          <Paper>
            <Button
              mr={2}
              variant="contained"
              onClick={this.handleBack()}>
              Back
            </Button>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

function SyncUserDetails() {
  let { id } = useParams();
  const [data, setData] = React.useState([]);
  useEffect(() => {
    syncUserAPI.detail(id).then(response => {
      setData(response.data.data);
    });
  }, [id]);
  
  return (
    <React.Fragment>
      {/* <Helmet title="Text Fields" />
      <Typography variant="h3" gutterBottom display="inline">
        Text Fields
      </Typography> */}

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>AAA Service</Typography>
        <Link component={NavLink} exact to="/aaa-service/user">
          User Profile
        </Link>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <DefaultTextFields state={data}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SyncUserDetails;
