import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
  TableRow,
} from '@material-ui/core'

import {
  RemoveRedEye as RemoveRedEyeIcon,
  BorderColorOutlined as BorderColorIcon,
} from "@material-ui/icons"


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
    checkAction,
  } = props
  const history = useHistory()
  const [ order, setOrder ] = useState('asc')
  const [ orderBy, setOrderBy ] = useState('customer')
  const [ selected, setSelected ] = useState([])
  const [ loading, setLoading ] = useState(false)

  const handleDelete = () => {
    if (loading) return
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
    if (action.display) {
      if (row.state === 'completed') {
        return false
      }
      if (!row['reason'] || row.reason.length == 0) return false;
    }
    return true
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  return (
    <div style={{ marginTop: marginTop ? marginTop + 'vh' : 0 }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        tableName={tableName}
        createPath={`${path}/create`}
        onDelete={handleDelete}
        hideCreate={hideCreate}
        customCreate={customCreate}
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
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={`${row.id}-${index}`}
                    selected={isItemSelected}
                  >
                    {
                      !hideCheckBox && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                            onClick={(event) => handleSelect(event, row.id)}
                          />
                        </TableCell>
                      )
                    }
                    {
                      fieldList && fieldList.map((el, i) => (
                        <TableCell key={el.field + '__' + i} align={el.align} >
                          <div style={{ marginRight: '26px' }}>
                            {row[el.field]}
                          </div>
                        </TableCell>
                      ))
                    }
                    <TableCell padding="none" align="right">
                      <Box mt={3}>
                        {
                          !hideDetail && (() => (
                            <IconButton aria-label="detail" onClick={(event) => handleDetail(event, row.id)}>
                              <RemoveRedEyeIcon />
                            </IconButton>
                          ))
                        }
                      </Box>
                      <Box>
                        {
                          !hideUpdate && (() => (
                            <IconButton aria-label="update" onClick={(event) => handleUpdate(event, row.id)}>
                              <BorderColorIcon />
                            </IconButton>
                          ))
                        }
                      </Box>
                      <Box>
                        {
                          actionList && actionList.map((action, i) => {
                            return (
                              display(action, row) ? (
                                <IconButton
                                  key={i + '_' + action.label}
                                  aria-label={action.label}
                                  onClick={(e) => action.handleClick(e, row)}
                                >
                                  {action.icon}
                                </IconButton>
                              ) : null
                            )
                          })
                        }
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CommonTable
