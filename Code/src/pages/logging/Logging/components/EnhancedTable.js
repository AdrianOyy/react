import React from 'react'
import LoggingApi from '../../../../api/logging'
import dayjs from 'dayjs'
import { EnhancedTableToolbar, EnhancedTableHead } from '../../../../components'
import CommentTip from '../../../../components/CommonTip'
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core'



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
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function EnhancedTable(props) {
  const { handleSearch, rows } = props
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('request')
  const [selected, setSelected] = React.useState([])
  const [loading, setLoading ] = React.useState(false)

  const formatDateTime = (str) => {
    return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
  }


  const handleDelete = () => {
    if (loading) return
    setLoading(true)
    LoggingApi.deleteMany({ idList: selected}).then(() => {
      CommentTip.success('success')
      handleSearch()
      setLoading(false)
      setSelected([])
    }).catch(() => {
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
      const newSelecteds = rows.map((n) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (_, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const headCells = [
    { id: 'logType', alignment: 'center', label: 'Log Type' },
    { id: 'request', alignment: 'center', label: 'Request' },
    { id: 'response', alignment: 'center', label: 'Response' },
    { id: 'createdAt', alignment: 'center', label: 'Created At' },
  ]

  return (
    <React.Fragment>
        <EnhancedTableToolbar
          numSelected={selected.length}
          tableName='Logging'
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
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
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
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell align="center">{ row.logType }</TableCell>
                      <TableCell align="center">{ row.request }</TableCell>
                      <TableCell align="center">{ row.response }</TableCell>
                      <TableCell align="center">{ row.createdAt ? formatDateTime(row.createdAt) : '' }</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
    </React.Fragment>
  )
}

export default EnhancedTable
