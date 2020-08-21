import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button
} from "@material-ui/core"

import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/workFlow"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import dayjs from "dayjs"
import { getUser } from "../../../../../utils/user"
import {
  EventAvailable as EventAvailableIcon,
  BorderColorOutlined as BorderColorIcon,
} from "@material-ui/icons"

const Paper = styled(MuiPaper)(spacing)
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:MM')
}
const tableName = 'My Request'

function List(props) {
  const { onMount, path } = props
  const history = useHistory()
  const [ startTime, setStartTime ] = useState('')
  const [ open, setOpen ] = useState(false)
  const [ endTime, setEndTime ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)
  const [ image, setImage ] = useState('')

  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.getMyRequest({ ...query, userName: getUser().id.toString(), limit: rowsPerPage, page: page + 1 })
      .then(response => {
        console.log(response)
        setTotal(response.data.data.total)
        handleData(response.data.data.items)
      })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const rowModel = {
        procInstId: el.procInstId,
        procDefId: el.procDefId,
        name: el.name,
        startTime: formatDateTime(el.startTime),
        endTime: el.endTime ? formatDateTime(el.endTime) : '',
        state: el.endTime ?  "已完成" : "进行中",
        assignee: el.assignee,
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  const handleClose = () => {
    setOpen(false)
  }
  // 表头字段列表
  const headCells = [
    { id: 'name', alignment: 'center', label: 'Work Flow' },
    { id: 'startTime', alignment: 'center', label: 'Start Date' },
    { id: 'endTime', alignment: 'center', label: 'End Date' },
    { id: 'state', alignment: 'center', label: 'State' },
    { id: 'assignee', alignment: 'center', label: 'Assignee' },
    { id: 'action', alignment: 'right', label: 'Action' },
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

  const handleImage = (event, row) => {
    console.log(event)
    console.log(row.procInstId)
    API.getDiagram(row.procInstId).then(response => {
      let blob = new Blob([ response.data ])
      setImage(window.URL.createObjectURL(blob))
      setOpen(true)
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
    history.push({ pathname: `/detail/${row.procInstId}`, state: { procDefId: row.procDefId } })
  }

  // 自定义action
  const actionList = [
    { label: 'edit', icon: <BorderColorIcon />, handleClick: handleDetail  },
    { label: 'image', icon: <EventAvailableIcon />, handleClick: handleImage },
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
              deleteAPI={API.deleteMany}
              handleSearch={handleSearch}
              hideUpdate={true}
              hideDetail={true}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
              hideCreate={false}
              actionList={actionList}
            />
            <Dialog
              open={open}
              aria-labelledby="image-modal-title"
              aria-describedby="iamge-modal-description"
            >
              <DialogTitle id="form-dialog-title">Activiti</DialogTitle>
              <DialogContent>
                <img alt="" src={image} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
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
