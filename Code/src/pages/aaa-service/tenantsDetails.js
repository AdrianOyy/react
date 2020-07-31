import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink, useParams, useHistory } from "react-router-dom";
import dayjs from 'dayjs';
// import Helmet from 'react-helmet';

import {
  CardContent,
  Grid,
  Link,
  MenuItem,
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
      const detail = nextProps.state.result.rows[0]
      this.setState(detail);
      this.ad_groups.push({id: detail.ad_group.id, label: detail.ad_group.name});
      this.tenants.push({id: detail.tenant.id, label: detail.tenant.name});
      this.rights = nextProps.state.roles;
      this.history = nextProps.history;
      this.inited = false;
    }
  }

  inited = true;
  history = null;
  disabled = false;

  ad_groups = [
    {
      id: '',
      label: '',
    }
  ]

  tenants = [
    {
      id: '',
      label: '',
    }
  ]

  rights = [
    {
      id: '',
      label: '',
    }
  ];

  state = {
    id: "",
    tenantId: "",
    adGroupId: "",
    roleId: "",
    createdAt: "",
  };

  handleChange = name => event => {
    if (name === 'roleId' && !event.target.value) {
      this.disabled = true;
    } else if (name === 'roleId' && event.target.value) {
      this.disabled = false;
    }
    this.setState({ [name]: event.target.value });
  };
  handleSave = () => event => {
    const _this = this
    tenantAPI.update(this.state).then(response => {
      if (response.data.success) {
        _this.history.push('/aaa-service/tenant')
      }
    });
  };
  handleBack = () => event => {
    this.history.push('/aaa-service/tenant')
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
                id="standard-select-currency"
                select
                label="Project"
                value={this.state.tenantId}
                InputProps={{
                  readOnly: true
                }}
                m={2}
              >
                {this.tenants.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                label="AD Group"
                value={this.state.adGroupId}
                InputProps={{
                  readOnly: true
                }}
                m={2}
              >
                {this.ad_groups.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                label="Right"
                value={this.state.roleId}
                onChange={this.handleChange("roleId")}
                m={2}
              >
                {this.rights.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
        <Link component={NavLink} exact to="/aaa-service/tenant">
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
