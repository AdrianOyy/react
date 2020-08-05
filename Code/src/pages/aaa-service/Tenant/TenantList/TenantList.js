import React from 'react';

import {
  Grid,
} from "@material-ui/core";

import { NaviHeader } from '../../../../components'
import EnhancedTable from './components/EnhancedTable'
const breadcrumbsList = [{ title: 'AAA Service'}, { title: 'Tenant' }]
function TenantList() {
  return (
    <React.Fragment>
      <NaviHeader title="Tenant" breadcrumbsList={ breadcrumbsList } />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TenantList;
