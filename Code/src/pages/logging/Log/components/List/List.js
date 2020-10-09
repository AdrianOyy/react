import React, { useEffect, useState } from 'react'
import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"

import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/log"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import dayjs from "dayjs"
import { L } from '../../../../../utils/lang'

const Paper = styled(MuiPaper)(spacing)
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
}
const tableName = L('Log List')

function List(props) {
  const { onMount, path } = props

  const [ logType, setLogType ] = useState('')
  const [ request, setRequest ] = useState('')
  const [ response, setResponse ] = useState('')
  const [ startDate, setStartDate ] = useState('')
  const [ endDate, setEndDate ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)

  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.list({ ...query, limit: rowsPerPage, page: page + 1 })
      .then(response => {
        setTotal(response.data.total)
        handleData(response.data.data)
      })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const rowModel = {
        id: el.id,
        logType: el.logType,
        request: el.request,
        response: el.response,
        createdAt: formatDateTime(el.createdAt),
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'logType', alignment: 'center', label: L('LogType') },
    { id: 'request', alignment: 'center', label: L('Request') },
    { id: 'response', alignment: 'center', label: L('Response') },
    { id: 'createdAt', alignment: 'center', label: L('Created At') },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'logType', align: 'center' },
    { field: 'request', align: 'center' },
    { field: 'response', align: 'center' },
    { field: 'createdAt', align: 'center' },
  ]

  const searchBarFieldList = [
    { id: 'logType', label: L('LogType'), type: 'text', disabled: false, value: logType },
    { id: 'request', label: L('Request'), type: 'text', disabled: false, value: request },
    { id: 'response', label: L('Response'), type: 'text', disabled: false, value: response },
    { id: 'startDate', label: L('Start Date'), type: 'date', disabled: false, readOnly: false, value: startDate },
    { id: 'endDate', label: L('End Date'), type: 'date', disabled: false, readOnly: false, value: endDate },
  ]

  const handleClear = () => {
    setLogType('')
    setRequest('')
    setResponse('')
    setStartDate('')
    setEndDate('')
    setQuery({
      logType: '',
      request: '',
      response: '',
      startDate: '',
      endDate: '',
    })
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

  const handleFieldChange = (e, id) => {
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

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SearchBar
            onSearchFieldChange={handleFieldChange}
            onSearchButton={handleSearch}
            onClearButton={handleClear}
            fieldList = {searchBarFieldList}
          />
          <Paper>
            <CommonTable
              rows={rows}
              tableName={tableName}
              deleteAPI={API.deleteMany}
              handleSearch={handleSearch}
              hideUpdate={true}
              hideDetail={true}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
              hideCreate={true}
            />
            <TablePagination
              rowsPerPageOptions={[ 10, 50, 100 ]}
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
