import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import syncUserAPI from '../../api/syncUser.js'
import Helmet from 'react-helmet';

import {
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,
  Link,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography
} from "@material-ui/core";

// import { green, orange, red } from "@material-ui/core/colors";

// import {
//   Refresh as RefreshIcon
// } from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

// const Spacer = styled.div`
//   flex: 1 1 100%;
// `;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'corpId', alignment: 'center', label: 'CORP ID' },
  { id: 'alias', alignment: 'center', label: 'Alias' },
  { id: 'surname', alignment: 'center', label: 'Surname' },
  { id: 'givenname', alignment: 'center', label: 'Given Name' },
  { id: 'title', alignment: 'center', label: 'Title' },
  { id: 'displayname', alignment: 'center', label: 'Display Name' },
  { id: 'email', alignment: 'center', label: 'Email' },
  { id: 'proxyAddresses', alignment: 'center', label: 'Proxy Addresses' },
  { id: 'cluster', alignment: 'center', label: 'Cluster' },
  { id: 'hospital', alignment: 'center', label: 'Hospital' },
  { id: 'department', alignment: 'center', label: 'Department' },
  { id: 'passwordLastSet', alignment: 'center', label: 'Password Last Set' },
  { id: 'UACCode', alignment: 'center', label: 'UAC Code' },
  { id: 'UACDesc', alignment: 'center', label: 'UAC Desc' },
  { id: 'createdAt', alignment: 'center', label: 'CreatedAt' },
];
let inited = false

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignment}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

let EnhancedTableToolbar = props => {
  const { numSelected } = props;

  return (
    <Toolbar>
      <ToolbarTitle>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            User For Sync
          </Typography>
        )}
      </ToolbarTitle>
    </Toolbar>
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('customer');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!inited) {
      syncUserAPI.list({}).then(response => {
        setRows(response.data.data.rows || []);
        inited = true
      })
    }
  });
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      console.log('rows', rows)
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div>
      {/* <EmptyCard /> */}
      <Paper>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                      >
                      <TableCell align="center">{row.corpId}</TableCell>
                      <TableCell align="center">{row.alias}</TableCell>
                      <TableCell align="center">{row.surname}</TableCell>
                      <TableCell align="center">{row.givenname}</TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.displayname}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.proxyAddresses}</TableCell>
                      <TableCell align="center">{row.cluster}</TableCell>
                      <TableCell align="center">{row.hospital}</TableCell>
                      <TableCell align="center">{row.department}</TableCell>
                      <TableCell align="center">{row.passwordLastSet}</TableCell>
                      <TableCell align="center">{row.UACCode}</TableCell>
                      <TableCell align="center">{row.UACDesc}</TableCell>
                      <TableCell align="center">{row.createdAt}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (10) * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 2, 3]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function LogList() {
  return (
    <React.Fragment>
      <Helmet title="User For Sync" />

      <Grid
        justify="space-between"
        container 
        spacing={24}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
          User For Sync
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Dashboard
            </Link>
            <Link component={NavLink} exact to="/">
              Pages
            </Link>
            <Typography>User For Sync</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      
      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default LogList;
