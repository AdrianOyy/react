import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"
import { L } from '../../../../../utils/lang'

import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/workFlow"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import formatDateTime from "../../../../../utils/formatDateTime"
import { getUser } from "../../../../../utils/auth"
import downloadFile from "../../../../../utils/downloadFile"
import GetAppIcon from '@material-ui/icons/GetApp'
import {
  BorderColorOutlined as BorderColorIcon,
  Reorder as ReorderIcon,
} from "@material-ui/icons"

const Paper = styled(MuiPaper)(spacing)
const tableName = ''

function List(props) {
  const { onMount, path } = props
  const history = useHistory()
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
    API.getMyRequest({ ...query, userName: getUser() && getUser().id ? getUser().id.toString() : '0', limit: rowsPerPage, page: page + 1 })
      .then(response => {
        setTotal(response.data.data.total)
        handleData(response.data.data.list)
      })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const rowModel = {
        id: el.procInstId,
        procDefId: el.procDefId,
        deploymentId: el.deploymentId,
        name: el.name,
        startTime: formatDateTime(el.startTime),
        endTime: el.endTime ? formatDateTime(el.endTime) : '',
        state: el.endTime ? "completed" : "processing",
        assignee: el.assignee,
        status: el.status,
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'name', alignment: 'center', label: L('Name') },
    { id: 'procDefId', alignment: 'center', label: L('Id') },
    { id: 'startTime', alignment: 'center', label: L('Start Date') },
    { id: 'endTime', alignment: 'center', label: L('End Date') },
    { id: 'state', alignment: 'center', label: L('State') },
    { id: 'action', alignment: 'right', label: L('Action') },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'name', align: 'center' },
    { field: 'procDefId', align: 'center' },
    { field: 'startTime', align: 'center' },
    { field: 'endTime', align: 'center' },
    { field: 'state', align: 'center' },
  ]

  const searchBarFieldList = [
    { id: 'startTime', label: L('Start Date'), type: 'date', disabled: false, readOnly: false, value: startTime },
    { id: 'endTime', label: L('End Date'), type: 'date', disabled: false, readOnly: false, value: endTime },
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

  const handleDetail = (event, row) => {
    history.push({ pathname: `/detail/${row.id}`, search: `deploymentId=${row.deploymentId}` })
  }

  const handleStep = (event, row) => {
    history.push({ pathname: `/step/${row.id}`, search: `deploymentId=${row.deploymentId}` })
  }

  // const display = (row) => {
  //   if (row.state === 'completed') {
  //     return false
  //   }
  //   return true
  // }

  const handleDownload = (event, row) => {
    API.download({ processInstanceId: row.id }).then(({ data }) => {
      downloadFile(data, 'Account management.pdf')
    })
  }

  const display = (row) => {
    if (row.name === 'Account management') {
      return true
    }
    return false
  }

  // 自定义action
  const actionList = [
    { label: L('download'), icon: <GetAppIcon />, handleClick: handleDownload, display },
    { label: L('edit'), icon: <BorderColorIcon />, handleClick: handleDetail },
    { label: L('step'), icon: <ReorderIcon />, handleClick: handleStep },
  ]

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
              hideCheckBox={true}
              deleteAPI={API.deleteMany}
              handleSearch={handleSearch}
              hideUpdate={true}
              hideDetail={true}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
              hideCreate={true}
              actionList={actionList}
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
