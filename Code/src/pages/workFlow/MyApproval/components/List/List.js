import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper, Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from "@material-ui/core"

import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/workFlow"
// import { user } from "../../../../../api/workFlow"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import { getUser } from "../../../../../utils/user"
import { spacing } from "@material-ui/system"
import dayjs from "dayjs"
import { BorderColorOutlined as BorderColorIcon } from "@material-ui/icons"

const Paper = styled(MuiPaper)(spacing)
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:MM')
}
const tableName = 'My Approval'

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
  const [ open, setOpen ] = useState(false)
  const [ image, setImage ] = useState('')

  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const groupList = getUser().groupList
    // const groupList = [ "yang666" ]
    API.getTaskListByGroup({ groupList }).then(response => {
      setTotal(response.data.data.length)
      handleData(response.data.data)
    })
    // API.getMyApproval({ ...query, userName: 'kk', limit: rowsPerPage, page: page + 1 })
    //   .then(response => {
    //     setTotal(response.data.data.total)
    //     handleData(response.data.data.items)
    //   })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const rowModel = {
        id: el.id,
        name: el.name,
        processDefinitionId: el.processDefinitionId,
        createTime: formatDateTime(el.createTime),
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'id', alignment: 'center', label: 'Id' },
    { id: 'name', alignment: 'center', label: 'name' },
    { id: 'createTime', alignment: 'center', label: 'Create Time' },
    { id: 'action', alignment: 'right', label: 'Action' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'id', align: 'center' },
    { field: 'name', align: 'center' },
    { field: 'createTime', align: 'center' },
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

  const handleImage = (event, row) => {
    console.log(event)
    console.log(row.procInstId)
    API.getDiagram('260008').then(response => {
      let blob = new Blob([ response.data ])
      setImage(window.URL.createObjectURL(blob))
      setOpen(true)
    })
  }

  const handleDetail = (event, row) => {
    history.push({ pathname: `/detail/${row.id}`, search: `processDefinitionId=${row.processDefinitionId}` })
  }

  const actionList = [
    { label: 'edit', icon: <BorderColorIcon />, handleClick: handleDetail  },
  ]

  const handleClose = () => {
    setOpen(false)
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
              hideCheckBox={true}
              hideUpdate={true}
              hideDetail={true}
              hideImage={true}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
              handleImage={handleImage}
              actionList={actionList}
              hideCreate={true}
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
