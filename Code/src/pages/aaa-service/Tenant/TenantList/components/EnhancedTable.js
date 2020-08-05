import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import tenantApi from '../../../../../api/tenant'
import dayjs from 'dayjs';
import { SearchBar, EnhancedTableToolbar, EnhancedTableHead } from '../../../../../components'
import CommentTip from '../../../../../components/CommonTip'
import { spacing } from "@material-ui/system";
import styled from "styled-components";
import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper as MuiPaper,
} from '@material-ui/core'

import {
  RemoveRedEye as RemoveRedEyeIcon,
  BorderColorOutlined as BorderColorIcon
} from "@material-ui/icons";



const Paper = styled(MuiPaper)(spacing);

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

function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('customer');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [total, setTotal] = React.useState(0);
  const [name, setName] = React.useState('');
  const [createdAt, setCreatedAt] = React.useState('');
  const [updatedAt, setUpdateAt] = React.useState('');
  const [query, setQuery] = React.useState({});
  const [loading, setLoading ] = React.useState(true);

  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }

  const history = useHistory();

  const handelFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "name":
        setName(value);
        break;
      case "createdAt":
        setCreatedAt(value);
        break;
      case "updatedAt":
        setUpdateAt(value);
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    setQuery({
      name,
      createdAt,
      updatedAt,
    })
  };

  const handleDelete = () => {
    if (loading) return;
    setLoading(true)
    tenantApi.deleteMany({ idList: selected}).then(() => {
      CommentTip.success('success')
      handleSearch()
      setSelected([])
    }).catch((e) => {
      setLoading(false)
    })
  }

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    setLoading(true)
    tenantApi.list({ ...query, limit: rowsPerPage, page: page+1 })
    .then(response => {
      setTotal(response.data.data.count);
      setRows(response.data.data.rows);
      setLoading(false);
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
      pathname:'/aaa-service/tenant/detail/'+id,
    }
    history.push(path);
  }

  const handleUpdate = (_, id) => {
    const path = {
      pathname: '/aaa-service/tenant/update/' + id,
    }
    history.push(path)
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const searchBarFieldList = [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'createdAt', label: 'Created At', type: 'date' },
    { id: 'updatedAt', label: 'Updated At', type: 'date' },
  ];
  
  return (
    <React.Fragment>
      <SearchBar
        onhandelFieldChange={handelFieldChange}
        onSearchButton={handleSearch}
        fieldList = { searchBarFieldList }
      />
      <Paper>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableName='Tenant'
          createPath='/aaa-service/tenant/create'
          onDelete={ handleDelete }
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
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.createdAt ? formatDateTime(row.createdAt) : ''}</TableCell>
                      <TableCell align="center">{row.updatedAt ? formatDateTime(row.updatedAt) : ''}</TableCell>
                      <TableCell padding="none" align="right">
                        <Box mr={2}>
                          <IconButton aria-label="detail" onClick={(event) => handleDetail(event, row.id)}>
                            <RemoveRedEyeIcon />
                          </IconButton>
                          <IconButton aria-label="update" onClick={(event) => handleUpdate(event, row.id)}>
                            <BorderColorIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}

export default EnhancedTable