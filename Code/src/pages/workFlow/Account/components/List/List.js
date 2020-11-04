import React, { useEffect, useState } from 'react'

import {
  Grid,
  Button,
} from "@material-ui/core"
import { L } from '../../../../../utils/lang'

import { useHistory } from 'react-router-dom'
import { CommonTable, TablePagination, HAPaper } from '../../../../../components'
import API from "../../../../../api/workFlow"
import UpdateIcon from '@material-ui/icons/Update'
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined'
import formatDateTime from "../../../../../utils/formatDateTime"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"

const tableName = 'List'

function List(props) {
  const { path } = props
  const history = useHistory()
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)
  const [ shown, setShown ] = useState(false)
  const [ cuIdRow, setCuIdRow ] = useState({})

  useEffect(() => {
    API.getProcessList({ name: 'Account management', limit: rowsPerPage, page: page + 1 })
      .then(({ data }) => {
        setTotal(data.total)
        handleData(data.list)
      })
  }, [ page, rowsPerPage ])

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
    { id: 'workflowName', alignment: 'left', label: L('Workflow name') },
    { id: 'deploymentId', alignment: 'left', label: L('Deployment Id') },
    { id: 'version', alignment: 'left', label: L('Version') },
    { id: 'deployTime', alignment: 'left', label: L('Deploy Time') },
    { id: 'action', alignment: 'center', label: L('Action') },
  ]

  // 每行显示的字段
  const fieldList = [
    // { field: 'id', align: 'center' },
    { field: 'workflowName', align: 'left' },
    { field: 'deploymentId', align: 'left' },
    { field: 'version', align: 'left' },
    { field: 'deployTime', align: 'left' },
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
    { label: 'run', icon: <PlayCircleFilledWhiteOutlinedIcon  fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleRunClick },
    { label: 'update', icon: <UpdateIcon fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleUpdateClick },
  ]

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
  const handleReasonChange = (event) => {
    dialogReason.value = event.target.value
  }

  const rejectActions = (data) => {
    history.push({ pathname: `${path}/create/${cuIdRow.id}`, search: `deploymentId=${cuIdRow.deploymentId}&cuId=${data}` })
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <HAPaper>
            <CommonTable
              rows={rows}
              tableName={tableName}
              deleteAPI={API.deleteMany}
              hideUpdate={true}
              hideDetail={true}
              hideImage={false}
              hideCheckBox={true}
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
          </HAPaper>
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
