import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import syncUserAPI from '../../api/syncUser.js'
import Helmet from 'react-helmet';
// import dayjs from 'dayjs';

import {
  // Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  // Chip as MuiChip,
  Divider as MuiDivider,
  Grid,
  IconButton,
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
  Tooltip,
  Typography,
  // CardContent,
  TextField,
  // Card as MuiCard
} from "@material-ui/core";

// import { green, orange, red } from "@material-ui/core/colors";

import {
  // Add as AddIcon,
  // Archive as ArchiveIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  // RemoveRedEye as RemoveRedEyeIcon,
  // ReportOff
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

import { makeStyles } from '@material-ui/core/styles';

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

// const Card = styled(MuiCard)(spacing);

// const Chip = styled(MuiChip)`
//   ${spacing};

//   background: ${props => props.shipped && green[500]};
//   background: ${props => props.processing && orange[700]};
//   background: ${props => props.cancelled && red[500]};
//   color: ${props => props.theme.palette.common.white};
// `

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(2),
    border: '2ch'
  },
  textField: {
    marginRight: theme.spacing(10),
    width: '25ch',
  },
  button: {
    marginRight: theme.spacing(10),
  },
}));

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

function EmptyCard(props) {
  const { onHandelTextChange, onSearchButton } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        id="surname"
        onChange={onHandelTextChange.bind(this)}
        label="surname"
        className={classes.textField}/>
      <Button
        variant="contained"
        color="primary"
        onClick={onSearchButton}
        className={classes.button}>
        Search
      </Button>
    </div>
  );
}
  

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
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
            Log
          </Typography>
        )}
      </ToolbarTitle>
      <Spacer />
      <div>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('customer');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [emptyRows, setEmptyRows] = React.useState(0);
  
  const [text, setText] = React.useState('');
  const [query, setQuery] = React.useState({});

  const handelTextChange = (event) => {
    setText(event.target.value)
  };

  const handlSearch =  () => {
    setQuery({
      surname: text
    })
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    syncUserAPI.list(Object.assign(
      {},
      query,
      { limit: rowsPerPage, page: page+1 })
      ).then(response => {
      console.log(response.data)
      setTotal(response.data.data.count);
      setRows(response.data.data.rows);
      const length = response.data.data.length
      const emptyrow = rowsPerPage - length;
      setEmptyRows(emptyrow);
    });
  }, [page, rowsPerPage, query]);
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
  
    setSelected(newSelected);
  };
  
  // const handleDelete = (event, id) => {
  //   syncUserAPI.delete({id}).then(({data}) => {
  //     console.log(data)
  //   })
  // }

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;


  return (
    <div>
      <EmptyCard 
        onHandelTextChange={handelTextChange}
        onSearchButton={handlSearch}
      />
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
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`${row.id}-${index}`}
                      selected={isItemSelected}
                      >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
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
                      {/* <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton aria-label="delete" onClick={(event) => handleDelete(event, row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1, 2, 3]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function SyncList() {
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

export default SyncList;
