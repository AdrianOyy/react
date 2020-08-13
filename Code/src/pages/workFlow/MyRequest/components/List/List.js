import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"

import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/workFlow"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import dayjs from "dayjs"

const Paper = styled(MuiPaper)(spacing)
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:MM')
}
const tableName = 'Log List'

function List(props) {
  const { onMount, path } = props
  const [ startTime, setStartTime ] = useState('')
  const [ endTime, setEndTime ] = useState('')
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
    API.getMyRequest({ ...query, userName: 'kk', limit: rowsPerPage, page: page + 1 })
      .then(response => {
        setTotal(response.data.data.total)
        handleData(response.data.data.items)
      })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const rowModel = {
        name: el.name,
        startTime: formatDateTime(el.startTime),
        endTime: formatDateTime(el.endTime),
        state: el.state,
        assignee: formatDateTime(el.assignee),
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'name', alignment: 'center', label: 'Work Flow' },
    { id: 'startTime', alignment: 'center', label: 'Start Date' },
    { id: 'endTime', alignment: 'center', label: 'End Date' },
    { id: 'state', alignment: 'center', label: 'State' },
    { id: 'assignee', alignment: 'center', label: 'Assignee' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'name', align: 'center' },
    { field: 'startTime', align: 'center' },
    { field: 'endTime', align: 'center' },
    { field: 'state', align: 'center' },
    { field: 'assignee', align: 'center' },
  ]

  const searchBarFieldList = [
    { id: 'startTime', label: 'Start Date', type: 'date', disabled: false, readOnly: false, value: startTime },
    { id: 'endTime', label: 'End Date', type: 'date', disabled: false, readOnly: false, value: endTime },
  ]

  const handleClear = () => {
    setStartTime('')
    setEndTime('')
    setQuery({
      startTime: '',
      endTime: ''
    })
  }

  const handleSearch = () => {
    setQuery({
      startTime,
      endTime,
    })
  }

  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "startTime":
        setStartTime(value)
        break
      case "endTime":
        setEndTime(value)
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
