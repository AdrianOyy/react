import React from 'react';
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs';
import { EnhancedTableToolbar, EnhancedTableHead } from '../../../../../components'
import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core'

import {
  RemoveRedEye as RemoveRedEyeIcon,
} from "@material-ui/icons";

const detailPath = '/aaa-service/user/detail/'

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

function EnhancedTable(props) {
  const { rows } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('customer');
  const [selected, setSelected] = React.useState([]);

  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  const history = useHistory();

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_, id) => {
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
  
  const handleDetail = (_, id) => {
    const path = {
      pathname: detailPath + id,
    }
    history.push(path);
  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const headCells = [
    { id: 'alias', alignment: 'center', label: 'Alias' },
    { id: 'surname', alignment: 'center', label: 'Surname' },
    { id: 'givenname', alignment: 'center', label: 'Given Name' },
    { id: 'title', alignment: 'center', label: 'Title' },
    { id: 'displayname', alignment: 'center', label: 'Display Name' },
    { id: 'email', alignment: 'center', label: 'Email' },
    // { id: 'cluster', alignment: 'center', label: 'Cluster' },
    // { id: 'hospital', alignment: 'center', label: 'Hospital' },
    // { id: 'department', alignment: 'center', label: 'Department' },
    { id: 'createdAt', alignment: 'center', label: 'CreatedAt' },
    { id: 'updatedAt', alignment: 'center', label: 'UpdatedAt' },
    { id: 'actions', alignment: 'right', label: 'Actions' },
  ];
  
  return (
    <React.Fragment>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableName='User Profile'
        />
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
              headCells={headCells}
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
                      <TableCell align="center">{row.alias}</TableCell>
                      <TableCell align="center">{row.surname}</TableCell>
                      <TableCell align="center">{row.givenname}</TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.displayname}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      {/* <TableCell align="center">{row.cluster}</TableCell>
                      <TableCell align="center">{row.hospital}</TableCell>
                      <TableCell align="center">{row.department}</TableCell> */}
                      <TableCell align="center">{formatDateTime(row.createdAt)}</TableCell>
                      <TableCell align="center">{formatDateTime(row.createdAt)}</TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton aria-label="detail" onClick={(event) => handleDetail(event, row.id)}>
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
    </React.Fragment>
  );
}

export default EnhancedTable