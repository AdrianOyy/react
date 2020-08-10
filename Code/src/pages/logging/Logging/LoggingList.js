import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"

import { NaviHeader, SearchBar} from '../../../components'
import EnhancedTable from './components/EnhancedTable'
import loggingApi from "../../../api/logging"
import styled from "styled-components"
import {spacing} from "@material-ui/system"
const Paper = styled(MuiPaper)(spacing)
const breadcrumbsList = [{ title: 'Log'}, { title: 'Logging Service' }]
function ManagementList() {
  const [logType, setLogType] = useState('')
  const [request, setRequest] = useState('')
  const [response, setResponse] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [query, setQuery] = useState({})
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [total, setTotal] = useState(0)


  useEffect(() => {
    loggingApi.list({ ...query, limit: rowsPerPage, page: page+1 })
      .then(response => {
        setTotal(response.data.data.count)
        setRows(response.data.data.rows)
      })
  }, [page, rowsPerPage, query])

  const handelFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "logType":
        setLogType(value)
        break
      case "request":
        setRequest(value)
        break
      case "response":
        setResponse(value)
        break
      case "startDate":
        setStartDate(value)
        break
      case "endDate":
        setEndDate(value)
        break
      default:
        break
    }
  }
  const handleSearch = () => {
    setQuery({
      logType,
      request,
      response,
      startDate,
      endDate,
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
    { id: 'logType', label: 'LogType', type: 'text', disabled: false, value: logType },
    { id: 'request', label: 'Request', type: 'text', disabled: false, value: request },
    { id: 'response', label: 'Response', type: 'text', disabled: false, value: response },
    { id: 'startDate', label: 'Start Date', type: 'date', disabled: false, readOnly: false, value: startDate },
    { id: 'endDate', label: 'End Date', type: 'date', disabled: false, readOnly: false, value: endDate },
  ]
  return (
    <React.Fragment>
      <NaviHeader title="Logging Service" breadcrumbsList={ breadcrumbsList } />
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SearchBar
            onSearchFieldChange={handelFieldChange}
            onSearchButton={handleSearch}
            fieldList = { searchBarFieldList }
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

export default ManagementList
