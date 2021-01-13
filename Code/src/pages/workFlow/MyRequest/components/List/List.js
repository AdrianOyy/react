import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import {
  Grid
} from "@material-ui/core"
import { L } from '../../../../../utils/lang'

import { CommonTable, SearchBar, TablePagination, HAPaper } from '../../../../../components'
import API from "../../../../../api/workFlow"
import formatDateTime from "../../../../../utils/formatDateTime"
import formatDate from "../../../../../utils/formatDate"
import { getUser } from "../../../../../utils/auth"
import downloadFile from "../../../../../utils/downloadFile"
import GetAppIcon from '@material-ui/icons/GetApp'
import {
  BorderColorOutlined as BorderColorIcon,
  Reorder as ReorderIcon,
} from "@material-ui/icons"
import Loading from "../../../../../components/Loading"

const tableName = L('My Request')

function List(props) {
  const { path } = props
  const history = useHistory()
  const [ startTime, setStartTime ] = useState('')
  const [ endTime, setEndTime ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)

  useEffect(() => {
    Loading.show()
    API.getMyRequest({ ...query, userName: getUser() && getUser().id ? getUser().id.toString() : '0', limit: rowsPerPage, page: page + 1 })
      .then(response => {
        setTotal(response.data.data.total)
        handleData(response.data.data.list)
      })
      .finally(() => Loading.hide())
      .catch((e) => {
        console.log(e)
        Loading.hide()
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
    { id: 'procInstId', alignment: 'left', label: L('Id') },
    { id: 'name', alignment: 'left', label: L('Name') },
    { id: 'startTime', alignment: 'left', label: L('Start Date') },
    { id: 'endTime', alignment: 'left', label: L('End Date') },
    { id: 'state', alignment: 'left', label: L('State') },
    { id: 'action', alignment: 'left', label: L('Action') },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'id', align: 'left' },
    { field: 'name', align: 'left' },
    { field: 'startTime', align: 'left' },
    { field: 'endTime', align: 'left' },
    { field: 'state', align: 'left' },
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
      startTime: formatDate(startTime),
      endTime: formatDate(endTime),
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

  const handleDownload = (event, row) => {
    Loading.show()
    API.download({ processInstanceId: row.id })
      .then(({ data }) => {
        downloadFile(data, 'Account management.pdf')
      })
      .finally(() => {
        Loading.hide()
      })
      .catch(e => {
        console.log(e)
        Loading.hide()
      })
  }

  const display = (row) => {
    return row.name === 'Account management';

  }

  // 自定义action
  const actionList = [
    { label: L('Detail'), icon: <BorderColorIcon fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleDetail },
    { label: L('Process'), icon: <ReorderIcon fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleStep },
    { label: L('Download'), icon: <GetAppIcon fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleDownload, display },
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
          <HAPaper>
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
          </HAPaper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List
