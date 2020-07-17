import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import loggingAPI from '../../api/logging.js'
import Helmet from 'react-helmet';
import dayjs from 'dayjs';

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button,
  Checkbox,
  Chip as MuiChip,
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
  CardContent,
  TextField,
  Card as MuiCard
} from "@material-ui/core";

import { green, orange, red } from "@material-ui/core/colors";

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  ReportOff
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  ${spacing};

  background: ${props => props.shipped && green[500]};
  background: ${props => props.processing && orange[700]};
  background: ${props => props.cancelled && red[500]};
  color: ${props => props.theme.palette.common.white};
`

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ToolbarTitle = styled.div`
  min-width: 150px;
`;

function createData(id, product, date, total, status, method) {
  return { id, product, date, total, status, method };
}

// const rows = [
//   createData('000253', 'Salt & Pepper Grinder', '2020-01-02', '$32,00', 0),
//   createData('000254', 'Backpack', '2020-01-04', '$130,00', 0),
//   createData('000255', 'Pocket Speaker', '2020-01-04', '$80,00', 2),
//   createData('000256', 'Glass Teapot', '2020-01-08', '$45,00', 0),
//   createData('000257', 'Unbreakable Water Bottle', '2020-01-09', '$40,00', 0),
//   createData('000258', 'Spoon Saver', '2020-01-14', '$15,00', 0),
//   createData('000259', 'Hip Flash', '2020-01-16', '$25,00', 1),
//   createData('000260', 'Woven Slippers', '2020-01-22', '$20,00', 0),
//   createData('000261', 'Womens Watch', '2020-01-22', '$65,00', 2),
//   createData('000262', 'Over-Ear Headphones', '2020-01-23', '$210,00', 0),
// ];

// useEffect(() => {
//   setRows([
//     createData('000253', 'Salt & Pepper Grinder', '2020-01-02', '$32,00', 0),
//     createData('000254', 'Backpack', '2020-01-04', '$130,00', 0),
//     createData('000255', 'Pocket Speaker', '2020-01-04', '$80,00', 2),
//     createData('000256', 'Glass Teapot', '2020-01-08', '$45,00', 0),
//     createData('000257', 'Unbreakable Water Bottle', '2020-01-09', '$40,00', 0),
//     createData('000258', 'Spoon Saver', '2020-01-14', '$15,00', 0),
//     createData('000259', 'Hip Flash', '2020-01-16', '$25,00', 1),
//     createData('000260', 'Woven Slippers', '2020-01-22', '$20,00', 0),
//     createData('000261', 'Womens Watch', '2020-01-22', '$65,00', 2),
//     createData('000262', 'Over-Ear Headphones', '2020-01-23', '$210,00', 0),
//   ])
// });

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
  console.log('2222222222222222222')
  console.log(array)
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'logType', alignment: 'center', label: 'LogType' },
  { id: 'message', alignment: 'center', label: 'Message' },
  { id: 'createAt', alignment: 'center', label: 'CreateAt' },
];

function EmptyCard() {
  const [text, setText] = React.useState('');
  const handelChange = (event) => {
    setText(event.target.value)
  };

  return (
    <div>
      <TextField size="small" id="Message" onChange={handelChange.bind(this)} label="Message" variant="outlined" />
      <Button variant="contained" color="primary"  >
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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [total, setTotal] = React.useState(0);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    loggingAPI.list({ limit:rowsPerPage, page:page+1}).then(response => {
      setTotal(response.data.total);
      setRows(response.data.data);
    });
  }, [page]);
  // const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   loggingAPI.list({}).then(response => {
  //     setRows(response.data.data);
  //   })
  //    // loginAPI.login({ userName:'vivianapj', password:'ViP2013' }).then(response => {
  //   //   dispatch(login({ ...response.data.Data }));
      
  //   //   var redirectUrl = getQueryString('redirect');
  //   //   router.history.push(!redirectUrl ? '/' : redirectUrl);
  //   // });
  //   // setRows([
  //   //   createData('000253', 'Salt & Pepper Grinder', '2020-01-02', '$32,00', 0),
  //   //   createData('000254', 'Backpack', '2020-01-04', '$130,00', 0),
  //   //   createData('000255', 'Pocket Speaker', '2020-01-04', '$80,00', 2),
  //   //   createData('000256', 'Glass Teapot', '2020-01-08', '$45,00', 0),
  //   //   createData('000257', 'Unbreakable Water Bottle', '2020-01-09', '$40,00', 0),
  //   //   createData('000258', 'Spoon Saver', '2020-01-14', '$15,00', 0),
  //   //   createData('000259', 'Hip Flash', '2020-01-16', '$25,00', 1),
  //   //   createData('000260', 'Woven Slippers', '2020-01-22', '$20,00', 0),
  //   //   createData('000261', 'Womens Watch', '2020-01-22', '$65,00', 2),
  //   //   createData('000262', 'Over-Ear Headphones', '2020-01-23', '$210,00', 0),
  //   // ])
  // });
  
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

  const handleChangePage = (event, newPage) => {
    console.log(newPage)
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
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log(emptyRows)
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

                      <TableCell align="center">{row.logType}</TableCell>
                      <TableCell align="center">{row.message}</TableCell>
                      <TableCell align="center">
                        {dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                      </TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
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
          rowsPerPageOptions={[5, 10, 25]}
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

function LogList() {
  return (
    <React.Fragment>
      <Helmet title="Logs" />

      <Grid
        justify="space-between"
        container 
        spacing={24}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
          Logs
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Dashboard
            </Link>
            <Link component={NavLink} exact to="/">
              Pages
            </Link>
            <Typography>Logs</Typography>
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
