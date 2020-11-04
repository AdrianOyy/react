import React from 'react'
import {
  TablePagination,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

const StyledTablePagination = withStyles(() => ({
  actions: {
    "& .MuiIconButton-root": {
      backgroundColor: '#D3DCFC',
      color: '#325df4',
      padding: '3px',
      fontSize: '1.125rem',
      marginRight: 8
    }
  }
}))(TablePagination)

export default function TablePagin(props) {
  const {
    rowsPerPageOptions,
    count,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage
  } = props
  return (
    <StyledTablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  )
}
