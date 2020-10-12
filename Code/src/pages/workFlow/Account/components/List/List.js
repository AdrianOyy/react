import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
  Button,
} from "@material-ui/core"
import { L } from '../../../../../utils/lang'

import { useHistory } from 'react-router-dom'
import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/workFlow"
import UpdateIcon from '@material-ui/icons/Update'
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined'
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import formatDateTime from "../../../../../utils/formatDateTime"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"

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
  const [ shown, setShown ] = useState(false)
  const [ cuIdRow, setCuIdRow ] = useState({})


  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    API.getProcessList({ ...query, name: 'Account management', limit: rowsPerPage, page: page + 1 })
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
    { id: 'workflowName', alignment: 'center', label: L('Workflow name') },
    { id: 'deploymentId', alignment: 'center', label: L('Deployment Id') },
    { id: 'version', alignment: 'center', label: L('Version') },
    { id: 'deployTime', alignment: 'center', label: L('Deploy Time') },
    { id: 'action', alignment: 'right', label: L('Action') },
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
    history.push({ pathname: `${path}/create/${row.id}`, search: `deploymentId=${row.deploymentId}` })
  }

  const handleUpdateClick = (e, row) => {
    setCuIdRow(row)
    setShown(true)
  }


  // 自定义action
  const actionList = [
    { label: 'run', icon: <PlayCircleFilledWhiteOutlinedIcon />, handleClick: handleRunClick },
    { label: 'update', icon: <UpdateIcon />, handleClick: handleUpdateClick },
  ]

  const searchBarFieldList = [
    { id: 'name', label: L('name'), type: 'text', disabled: false, readOnly: false, value: name },
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

  const dialogReason = {
    title: L('changeAccount'),
    value: '',
    formField:
      {
        id: 'cu_id', label: L('cuid'), type: 'text', disabled: false, readOnly: false, required: true, helperText: L('NotEmpty')
      },
    onSubmit: (value) => {
      if (!value) return
      rejectActions(value)
    },
  }
  const handleReasonSubmit = () => {
    if (dialogReason.value && dialogReason.value.length > 0) {
      rejectActions(dialogReason.value)
    }
  }
  const handleReasonChange = (event, id) => {
    dialogReason.value = event.target.value
  }

  const rejectActions = (data) => {
    history.push({ pathname: `${path}/create/${cuIdRow.id}`, search: `deploymentId=${cuIdRow.deploymentId}&cuId=${data}` })
    // workflowApi.actionTask(data)
    //   .then(() => {
    //     setShown(false)
    //     CommonTip.success(L('Success'))
    //     history.push({ pathname: `/MyApproval` })
    //   })
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
          </Paper>
          <Dialog
            open={shown}
            fullWidth={true}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">{dialogReason.title}</DialogTitle>
            <DialogContent>
              <form autoComplete="off">
                <TextField
                  fullWidth={true}
                  id={dialogReason.formField.id.toString()}
                  key={dialogReason.formField.id + dialogReason.formField.label}
                  label={dialogReason.formField.label}
                  type={dialogReason.formField.type}
                  error={dialogReason.formField.error || false}
                  helperText={dialogReason.formField.helperText || ''}
                  disabled={dialogReason.formField.disabled || false}
                  required={dialogReason.formField.required || false}
                  onChange={!dialogReason.formField.readOnly ? (event) => handleReasonChange(event, dialogReason.formFieldId) : null}
                  value={dialogReason.formField.value}
                  multiline
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                fullwidth
                onClick={() => { setShown(false) }}>{L('Cancel')}</Button>
              <Button
                fullwidth
                variant="contained"
                color="primary"
                style={{ marginRight: '2ch' }}
                onClick={handleReasonSubmit}>{L('Submit')}</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List
