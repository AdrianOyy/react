import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useHistory } from 'react-router-dom'
import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/workFlow"
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined'
import ListAltIcon from '@material-ui/icons/ListAlt'
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import formatDateTime from "../../../../../utils/formatDateTime"
import { getUser } from "../../../../../utils/user"
import CommonTip from "../../../../../components/CommonTip"
import Loading from "../../../../../components/Loading"

const Paper = styled(MuiPaper)(spacing)
const tableName = ''

function List(props) {
  const { onMount, path } = props
  const history = useHistory()
  const [ name, setName ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)
  const [ open, setOpen ] = useState(false)
  const [ srow, setSrow ] = useState({})

  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.getProcessList({ ...query, name: 'Move-in', limit: rowsPerPage, page: page + 1 })
      .then(({ data }) => {
        setTotal(data.total)
        handleData(data.list)
      })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList && rawDataList.forEach((el) => {
      const rowModel = {
        id: el.id,
        deploymentId: el.deploymentId,
        version: el.version,
        workflowName: el.name,
        deployTime: formatDateTime(el.deployTime)
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }


  // 表头字段列表
  const headCells = [
    // { id: 'id', alignment: 'center', label: 'Id' },
    { id: 'workflowName', alignment: 'center', label: 'Workflow name' },
    { id: 'deploymentId', alignment: 'center', label: 'Deployment Id' },
    { id: 'version', alignment: 'center', label: 'Version' },
    { id: 'deployTime', alignment: 'center', label: 'Deploy Time' },
    { id: 'action', alignment: 'right', label: 'Action' },
  ]

  // 每行显示的字段
  const fieldList = [
    // { field: 'id', align: 'center' },
    { field: 'workflowName', align: 'center' },
    { field: 'deploymentId', align: 'center' },
    { field: 'version', align: 'center' },
    { field: 'deployTime', align: 'center' },
  ]

  const handleRunClick = (e, row) => {
    Loading.show()
    const groupList = getUser().groupList
    const userId = getUser().id.toString()
    const data = {
        processDefinitionId : row.id,
        variables : { manager_group_id : groupList },
        startUser : userId
    }
    API.startProcess(data).then(() => {
        CommonTip.success("Success")
        Loading.hide()
    })
  }

  const handleAltClick = () => {
    history.push({ pathname: `${path}/create/${srow.id}`, search: `deploymentId=${srow.deploymentId}&altCheck=20` })
  }

  const openDiaglo = (e, row) => {
    setSrow(row)
    setOpen(true)
  }

  const closeOpen = () => {
    setOpen(false)
  }

  // 自定义action
  const actionList = [
    { label: 'run', icon: <PlayCircleFilledWhiteOutlinedIcon />, handleClick: handleRunClick },
    { label: 'run', icon: <ListAltIcon />, handleClick: openDiaglo },
  ]


  const searchBarFieldList = [
    { id: 'name', label: 'name', type: 'text', disabled: false, readOnly: false, value: name },
  ]

  const handleClear = () => {
    setName('')
    setQuery({
      name: '',
    })
  }

  const handleSearch = () => {
    setQuery({
      name,
    })
  }


  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "name":
        setName(value)
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
              hideImage={false}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
              actionList={actionList}
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
            <Dialog open={open} fullWidth={true}  aria-labelledby="form-dialog-title">
              <DialogContent>
                <DialogContentText>
                  Please input CPS ID
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="CPS ID"
                  type="email"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={closeOpen} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAltClick}  color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List