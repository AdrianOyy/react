import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
// import syncUserAPI from '../../api/syncUser.js'
import {getProcessDefinitions,openDesigner,createModel}  from '../../api/workFlow.js'
import Helmet from 'react-helmet';
import CommonTip from '../../components/CommonTip'
// import dayjs from 'dayjs';

import {
  Box,
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
  { id: 'id', alignment: 'center', label: 'Model Id' },
  { id: 'version', alignment: 'center', label: 'Version' },
  { id: 'name', alignment: 'center', label: 'Name' },
  { id: 'deploymentId', alignment: 'center', label: 'Deployment Id' },
  { id: 'deploymentUrl', alignment: 'center', label: 'Deployment Url' },
];

function EmptyCard(props) {
  const { onHandelTextChange, onSearchButton, openActivitiDesign } = props;
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
      <Button
        variant="contained"
        color="primary"
        onClick={openActivitiDesign}
        className={classes.button}>
        Activiti Design
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
            Process Definitions
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
  const [orderBy, setOrderBy] = React.useState('id');
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

  const openActivitiDesign = () => {
    // openDesigner().then(response=>{
    //   console.log(response)
      
    // })
    window.open(process.env.REACT_APP_BASE_API_WORKFLOW+"/create?token="+localStorage.getItem("token"))
  //  createModel(localStorage.getItem("token")).then(response =>{
  //    console.log(response.data)
  //    openDesigner(response.data.data.modelId)
  //   })
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    getProcessDefinitions().then(response => {
       // setTotal(response.data.data.total);
       console.log(response.data)
       if(response.data && response.data.data){
        const newArr = response.data.data.filter(item => item.sourceExtraUrl!=null)
        console.log(newArr)
        setRows(newArr);
       }
     
      //  const length = response.data.data.length
      //  const emptyrow = rowsPerPage - length;
      //  setEmptyRows(emptyrow);
    }).catch(error => {
      CommonTip.error(error.message, { });
    })
  },[]);
  
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
  //   console.log(id)
  //   workFlowAPI.deleteDeployment(id).then(() => {
  //     CommonTip.success('delete success');
  //   })
  // }

  // const handlePublish = (event, id) => {
  //   console.log(id)
  //   workFlowAPI.publish(id).then(() => {
  //     CommonTip.success('Publish success');
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
        openActivitiDesign={openActivitiDesign}
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
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.version}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.deploymentId}</TableCell>
                      <TableCell align="center">{row.deploymentUrl}</TableCell>             
                      { <TableCell padding="none" align="right">
                        {/* <Box mr={2}>
                          <IconButton aria-label="delete" onClick={(event) => handleDelete(event, row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <Box mr={2} onClick={(event) => handlePublish(event, row.id)}>
                          Publish
                        </Box> */}
                      </TableCell>}
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
      <Helmet title="Workflow Setting" />

      <Grid
        justify="space-between"
        container 
        spacing={10}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
          Workflow Setting
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Dashboard
            </Link>
            <Link component={NavLink} exact to="/">
              Pages
            </Link>
            <Typography>Workflow Setting</Typography>
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
