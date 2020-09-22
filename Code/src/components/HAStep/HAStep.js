import React, { useEffect, useState } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { CommonTable } from "../../components"
import API from "../../api/workFlow"
import Paper from "@material-ui/core/Paper"
import formatDateTime from "../../utils/formatDateTime"

import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import MButton from '@material-ui/core/Button'
import withStyles from "@material-ui/core/styles/withStyles"
import BorderColorIcon from "@material-ui/icons/BorderColorOutlined"
import { lang } from "../../lang/lang"
function HAStep(props) {
  const ex_us = lang.ex_us
  const Button = withStyles((() => ({
    root: {
      width: '5vw',
    }
  })))(MButton)

  const [shown, setShown] = useState(false)
  const [reason, setReason] = useState('')
  const handleDetail = (event, row) => {
    setReason(row.reason)
    setShown(true)
  }
  const actionList = [{ display: 'reason', label: 'Reject Reason', icon: <BorderColorIcon />, handleClick: handleDetail }]
  const { processInstanceId, actions } = props
  // const processInstanceId = 827520
  const [steps, setSteps] = useState([])
  const [activeStep, setActiveStep] = useState(0)
  const [rows, setRows] = useState([])

  useEffect(() => {
    API.getProcessPoint({ id: processInstanceId }).then(({ data }) => {
      const process = data.data
      if (process) {
        const pointList = []
        let active = 0
        for (const index in process.showProcessPointList) {
          const point = process.showProcessPointList[index]
          pointList.push(point.name)
          if (point.id === process.processStatus) {
            active = index
          }
        }
        setSteps(pointList)
        setActiveStep(parseInt(active))
        const pointUserList = []
        for (const pointUser of process.processPointUser) {
          const pointRow = {
            assignee: pointUser.assignee,
            groupName: pointUser.group ? pointUser.group.name : null,
            name: pointUser.taskInstance.activityName,
            endDate: pointUser.taskInstance.endTime ? formatDateTime(new Date(pointUser.taskInstance.endTime)) : null,
            status: pointUser.status ? null : 'Rejected',
            reason: pointUser.rejectReason || '',
          }
          pointUserList.push(pointRow)
        }
        setRows(pointUserList)
      }
    })
  }, [])

  // const steps = [ 'Select master blaster campaign settings', 'Create an ad group', 'Create an ad' ]

  // 表头字段列表
  const headCells = [
    { id: 'name', alignment: 'center', label: 'Name' },
    { id: 'assignee', alignment: 'center', label: 'Assignee' },
    { id: 'groupName', alignment: 'center', label: 'Group' },
    { id: 'status', alignment: 'center', label: 'Status' },
    { id: 'endDate', alignment: 'center', label: 'End Date' },
    { id: 'reason', alignment: 'right', label: 'Reject Reason' }
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'name', align: 'center' },
    { field: 'assignee', align: 'center' },
    { field: 'groupName', align: 'center' },
    { field: 'status', align: 'center' },
    { field: 'endDate', align: 'center' },
  ]

  return (
    <React.Fragment>
      <Paper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <CommonTable
          rows={rows}
          tableName='History List'
          hideCheckBox={true}
          hideUpdate={true}
          hideDetail={true}
          headCells={headCells}
          fieldList={fieldList}
          hideCreate={true}
          actionList={actionList}
        />
      </Paper>
      <Dialog
        open={shown}
        onClose={() => { setShown(false) }}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="form-dialog-title">{ex_us['RejectReason'] || 'Reject Reason'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {reason}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            fullwidth
            variant="contained"
            color="primary"
            onClick={() => { setShown(false) }}
            style={{ marginRight: '2ch' }} >{ex_us['Close'] || 'Close'}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
export default HAStep
