import React, { useEffect, useState } from 'react'

import {
  Grid,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
} from "@material-ui/core"
import { L } from '../../../../../utils/lang'

import { CommonTable, SearchBar, ChatBox, TablePagination, HAPaper } from '../../../../../components'
import API from "../../../../../api/workFlow"
import { useHistory } from "react-router-dom"
import { getUserGroupList } from "../../../../../utils/auth"
import formatDateTime from "../../../../../utils/formatDateTime"
import formatDate from "../../../../../utils/formatDate"
import {
  BorderColorOutlined as BorderColorIcon,
  Reorder as ReorderIcon,
  Chat as ChatIcon
} from "@material-ui/icons"

const tableName = ''

function List(props) {
  const {  path } = props
  const history = useHistory()
  const [ startTime, setStartTime ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)
  const [ open, setOpen ] = useState(false)
  const [ image, setImage ] = useState('')
  const [ taskId, setTaskId ] = useState('')
  const [ showChatBox, setShowChatBox ] = useState(false)

  useEffect(() => {
    const groupList = getUserGroupList()
    API.getTaskListByGroup({ ...query, groupList, limit: rowsPerPage, page: page + 1 }).then(response => {
      setTotal(response.data.data.total)
      handleData(response.data.data.list)
    })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    console.log(rawDataList)
    rawDataList.forEach((el) => {
      const rowModel = {
        id: el.processInstanceId,
        taskId: el.id,
        workflowName: el.processName,
        name: el.name,
        deploymentId: el.deploymentId,
        processDefinitionId: el.processDefinitionId,
        createBy: el.createBy,
        createTime: formatDateTime(el.createTime),
        stepName: el.taskDefinitionKey,
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'id', alignment: 'left', label: L('Id') },
    { id: 'workflowName', alignment: 'left', label: L('Workflow Name') },
    { id: 'name', alignment: 'left', label: L('Name') },
    { id: 'createBy', alignment: 'left', label: L('Create By') },
    { id: 'createTime', alignment: 'left', label: L('Create Time') },
    { id: 'action', alignment: 'center', label: L('Action') },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'id', align: 'left' },
    { field: 'workflowName', align: 'left' },
    { field: 'name', align: 'left' },
    { field: 'createBy', align: 'left' },
    { field: 'createTime', align: 'left' },
  ]

  const searchBarFieldList = [
    { id: 'startTime', label: L('Create Time'), type: 'date', disabled: false, readOnly: false, value: startTime },
    // { id: 'endTime', label: L('End Date'), type: 'date', disabled: false, readOnly: false, value: endTime },
  ]

  const handleClear = () => {
    setStartTime('')
    setQuery({
      startTime: '',
      endTime: ''
    })
  }

  const handleSearch = () => {
    setQuery({
      createTime: formatDate(startTime),
    })
  }

  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "startTime":
        setStartTime(value)
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
    history.push({ pathname: `/detail/${row.id}`, search: `processDefinitionId=${row.processDefinitionId}&deploymentId=${row.deploymentId}&stepName=${row.stepName}&taskId=${row.taskId}` })
  }

  const handleStep = (event, row) => {
    history.push({ pathname: `/step/${row.id}` })
  }

  const handleChatBox = (event, row) => {
    setTaskId(row.taskId)
    setShowChatBox(true)
  }

  const actionList = [
    { label: L('step'), icon: <ReorderIcon fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleStep },
    { label: L('edit'), icon: <BorderColorIcon fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleDetail },
    { label: L('message'), icon: <ChatIcon fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleChatBox },
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
          <HAPaper>
            <CommonTable
              rows={rows}
              tableName={null}
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
            <ChatBox
              open={showChatBox}
              onClose={() => { setShowChatBox(false) }}
              taskId={taskId}
            />
            <Dialog
              open={open}
              aria-labelledby="image-modal-title"
              aria-describedby="iamge-modal-description"
            >
              <DialogTitle id="form-dialog-title">{L('Activity')}</DialogTitle>
              <DialogContent>
                <img alt="" src={image} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {L('Close')}
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
          </HAPaper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List
