import React, { useEffect, useState } from 'react'
import { L } from '../../../../../utils/lang'

import {
  Grid,
  Paper as MuiPaper,
} from "@material-ui/core"
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { useHistory } from 'react-router-dom'
import { CommonTable, TablePagination } from '../../../../../components'
import API from "../../../../../api/workFlow"
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined'
import UpdateIcon from '@material-ui/icons/Update'
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import formatDateTime from "../../../../../utils/formatDateTime"
import DialogTitle from "@material-ui/core/DialogTitle"

const Paper = styled(MuiPaper)(spacing)
const tableName = 'List'

function List(props) {
  const { path } = props
  const history = useHistory()
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)
  const [ shown, setShown ] = useState(false)
  const [ srow, setSrow ] = useState({})

  useEffect(() => {
    API.getProcessList({ name: 'VM Allocation', limit: rowsPerPage, page: page + 1 })
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
    // { id: 'id', alignment: 'center', label: L('Id' )},
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

  // const handleAltClick = (data) => {
  //   history.push({ pathname: `${path}/create/${srow.id}`, search: `deploymentId=${srow.deploymentId}&cpsId=${data}` })
  // }

  const handleUpdateClick = (e, row) => {
    setSrow(row)
    setShown(true)
  }

  // 自定义action
  const actionList = [
    { label: 'Run', icon: <PlayCircleFilledWhiteOutlinedIcon fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleRunClick },
    { label: 'Run with CPS ID', icon: <UpdateIcon fontSize="small" style={{ color: '#2553F4' }} />, handleClick: handleUpdateClick },
  ]

  const dialogReason = {
    title: L('cpsvm'),
    value: '',
    formField:
      {
        id: 'cpsid', label: L('cpsid'), type: 'text', disabled: false, readOnly: false, required: true, helperText: L('NotEmpty')
      },
    onSubmit: (value) => {
      if (!value) return
      submitActions(value)
    },
  }

  const handleReasonSubmit = () => {
    if (dialogReason.value && dialogReason.value.length > 0) {
      submitActions(dialogReason.value)
    }
  }

  const submitActions = (data) => {
    history.push({ pathname: `${path}/create/${srow.id}`, search: `deploymentId=${srow.deploymentId}&cpsId=${data}` })
  }

  const handleReasonChange = (event) => {
    dialogReason.value = event.target.value
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
          <Paper>
            <CommonTable
              rows={rows}
              tableName={tableName}
              deleteAPI={API.deleteMany}
              hideUpdate={true}
              hideDetail={true}
              hideImage={false}
              path={path}
              hideCheckBox={true}
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
                    onChange={!dialogReason.formField.readOnly ? (event) => handleReasonChange(event) : null}
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
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List
