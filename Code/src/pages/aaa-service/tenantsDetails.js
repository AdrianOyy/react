import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink, useParams, useHistory } from "react-router-dom";
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

import tenantAPI from '../../api/tenant.js'

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
  }

  componentWillUpdate(nextProps){
    if (this.inited) {
      this.setState(nextProps.state);
      this.history = nextProps.history;
      this.inited = false;
    }
  }

  inited = true;
  history = null;
  disabled = false;

  state = {
    id: "",
    project: "",
    ADGroup: "",
    right: "",
    createdAt: "",
  };

  handleChange = name => event => {
    if (name === 'right' && !event.target.value) {
      this.disabled = true;
    } else if (name === 'right' && event.target.value) {
      this.disabled = false;
    }
    this.setState({ [name]: event.target.value });
  };
  handleSave = () => event => {
    const _this = this
    tenantAPI.update(this.state).then(response => {
      if (response.data.success) {
        _this.history.push('/aaa-service/tenants')
      }
    });
  };
  handleBack = () => event => {
    this.history.push('/aaa-service/tenants')
  };

  render() {
    return (
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tenant Details
          </Typography>
          <Paper mt={3}>
            <form noValidate autoComplete="off">
              <TextField
                id="standard-read-only-input"
                label="Project"
                value={this.state.project}
                InputProps={{
                  readOnly: true
                }}
                m={2}
              />
              <TextField
                id="standard-read-only-input"
                label="AD Group"
                value={this.state.ADGroup}
                InputProps={{
                  readOnly: true
                }}
                m={2}
              />
              <TextField
                required
                id="standard-required"
                label="Right"
                value={this.state.right}
                onChange={this.handleChange("right")}
                m={2}
              />
              <TextField
                disabled
                id="standard-disabled"
                label="CreatedAt"
                value={dayjs(this.state.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                InputProps={{
                  readOnly: true
                }}
                m={2}
              />
            </form>
          </Paper>
          <Paper>
            <Button
              mr={2}
              variant="contained"
              disabled={this.disabled}
              onClick={this.handleSave()}>
              Save
            </Button>
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

function TenantsDetails() {
  const { id } = useParams();
  const history = useHistory();
  
  const [data, setData] = React.useState([]);
  useEffect(() => {
    tenantAPI.detail(id).then(response => {
      setData(response.data.data);
    });
  }, []);
  
  return (
    <React.Fragment>
      {/* <Helmet title="Text Fields" />
      <Typography variant="h3" gutterBottom display="inline">
        Text Fields
      </Typography> */}

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>AAA Service</Typography>
        <Link component={NavLink} exact to="/aaa-service/tenants">
          Tenant
        </Link>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <DefaultTextFields state={data} history={history}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TenantsDetails;
