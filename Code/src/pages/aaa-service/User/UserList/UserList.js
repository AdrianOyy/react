import React, {useEffect, useState} from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"
import {NaviHeader, SearchBar} from '../../../../components'
import EnhancedTable from './components/EnhancedTable'
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import UserApi from "../../../../api/user"

const Paper = styled(MuiPaper)(spacing)
const naviHeaderTitle = 'User Profile'
const breadcrumbsList = [{ title: 'AAA Service'}, { title: naviHeaderTitle }]

function List() {
  const [ surname, setSurname ] = React.useState('')
  const [ createdAt, setCreatedAt ] = React.useState('')
  const [ updatedAt, setUpdateAt ] = React.useState('')
  const [ query, setQuery ] = React.useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = React.useState(0)
  const [ rowsPerPage, setRowsPerPage ] = React.useState(10)
  const [ total, setTotal ] = React.useState(0)

  useEffect(() => {
    UserApi.list({ ...query, limit: rowsPerPage, page: page+1 })
      .then(response => {
        setTotal(response.data.data.count)
        setRows(response.data.data.rows)
      })
  }, [page, rowsPerPage, query])

  const handelFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "surname":
        setSurname(value)
        break
      case "createdAt":
        setCreatedAt(value)
        break
      case "updatedAt":
        setUpdateAt(value)
        break
      default:
        break
    }
  }
  const handleSearch = () => {
    setQuery({
      surname,
      createdAt,
      updatedAt,
    })
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const searchBarFieldList = [
    { id: 'surname', label: 'Surname', type: 'text', disabled: false, readOnly: false, value: surname },
    { id: 'createdAt', label: 'Created At', type: 'date', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: 'Updated At', type: 'date', disabled: false, readOnly: false, value: updatedAt },
  ]
  
  return (
    <React.Fragment>
      <NaviHeader title={naviHeaderTitle} breadcrumbsList={breadcrumbsList} />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SearchBar
            onSearchFieldChange={handelFieldChange}
            onSearchButton={handleSearch}
            fieldList = {searchBarFieldList}
          />
          <Paper>
            <EnhancedTable
              handleSearch={handleSearch}
              rows = {rows}
            />
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
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List
