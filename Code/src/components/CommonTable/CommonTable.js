import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles"
import { EnhancedTableToolbar, EnhancedTableHead } from '../index'
import CommentTip from '../CommonTip'
import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, Tooltip,
} from '@material-ui/core'
import {
  RemoveRedEye as RemoveRedEyeIcon,
  BorderColorOutlined as BorderColorIcon,
} from "@material-ui/icons"

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const StyledTableCell = withStyles(() => ({
  root: {
    border: '1px solid #E5E5E5',
    height: '0.8vh',
    fontSize: 14,
  },
}))(TableCell)


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  if (!array) return
  const stabilizedThis = array.map((el, index) => [ el, index ])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function CommonTable(props) {
  const {
    rows,
    tableName,
    deleteAPI,
    handleSearch,
    path,
    headCells,
    fieldList,
    hideDetail,
    hideUpdate,
    hideCreate,
    hideCheckBox,
    customCreate,
    actionList,
    marginTop,
    showDownLoad,
    page,
  } = props
  const history = useHistory()
  const [ order, setOrder ] = useState('asc')
  const [ orderBy, setOrderBy ] = useState('customer')
  const [ selected, setSelected ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const handleDelete = () => {
    if (loading || !deleteAPI) return
    setLoading(true)
    deleteAPI({ idList: selected })
      .then(() => {
        CommentTip.success('success')
        handleSearch()
        setLoading(false)
        setSelected([])
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedList = rows ? rows.map((n) => n.id) : []
      setSelected(newSelectedList)
      return
    }
    setSelected([])
  }

  const handleSelect = (_, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []
    switch (selectedIndex) {
      case -1:
        newSelected = newSelected.concat(selected, id)
        break
      case 0:
        newSelected = newSelected.concat(selected.slice(1))
        break
      case selected.length - 1:
        newSelected = newSelected.concat(selected.slice(0, -1))
        break
      default:
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        )
        break
    }
    setSelected(newSelected)
  }

  const handleDetail = (_, id) => {
    history.push({ pathname: `${path}/detail/${id}` })
  }

  const handleUpdate = (_, id) => {
    history.push({ pathname: `${path}/update/${id}` })
  }

  const display = (action, row) => {
    // return action.display && action.display(row)
    if (action.display) {
      return action.display(row)
    }
    return true
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  return (
    <div style={{ marginTop: marginTop ? marginTop + 'vh' : 0, paddingLeft: 20, paddingRight: 20 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        tableName={tableName}
        createPath={`${path}/create`}
        onDelete={handleDelete}
        hideDelete={!deleteAPI}
        hideCreate={hideCreate}
        customCreate={customCreate}
        showDownLoad={showDownLoad}
        page={page}
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
            rowCount={rows ? rows.length : 0}
            headCells={headCells}
            hideCheckBox={hideCheckBox}
          />
          <TableBody>
            {rows && stableSort(rows, getComparator(order, orderBy))
              .map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={`${row.id}-${index}`}
                    selected={isItemSelected}
                  >
                    {
                      !hideCheckBox && (
                        <StyledTableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            onClick={(event) => handleSelect(event, row.id)}
                          />
                        </StyledTableCell>
                      )
                    }
                    {
                      fieldList && fieldList.map((el, i) => (
                        <StyledTableCell key={el.field + '__' + i} align={el.align} >
                          {row[el.field]}
                          {/* <div style={{ marginleft: '20px' }}>*/}
                          {/*  {row[el.field]}*/}
                          {/* </div>*/}
                        </StyledTableCell>
                      ))
                    }
                    <StyledTableCell padding="none" align="center">
                      <Box mt={3}>
                        {
                          !hideDetail && (() => (
                            <Tooltip title="Detail">
                              <IconButton aria-label="detail" onClick={(event) => handleDetail(event, row.id)}>
                                <RemoveRedEyeIcon fontSize="small" style={{ color: '#2553F4' }}  />
                              </IconButton>
                            </Tooltip>
                          ))
                        }
                      </Box>
                      <Box>
                        {
                          !hideUpdate && (() => (
                            <Tooltip title="Edit">
                              <IconButton aria-label="update" onClick={(event) => handleUpdate(event, row.id)}>
                                <BorderColorIcon  fontSize="small" style={{ color: '#2553F4' }} />
                              </IconButton>
                            </Tooltip>
                          ))
                        }
                      </Box>
                      <Box>
                        {
                          actionList && actionList.map((action, i) => {
                            return (
                              display(action, row) ? (
                                <Tooltip title={action.label} key={i*i*i + '_' + action.label}>
                                  <IconButton
                                    key={i + '_' + action.label}
                                    aria-label={action.label}
                                    onClick={(e) => action.handleClick(e, row, index)}
                                  >
                                    {action.icon}
                                  </IconButton>
                                </Tooltip>
                              ) : null
                            )
                          })
                        }
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CommonTable
