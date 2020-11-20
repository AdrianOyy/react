import React, { useEffect, useState } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { CommonTable } from "../../components"
import API from "../../api/workFlow"
import Paper from "@material-ui/core/Paper"
import formatDateTime from "../../utils/formatDateTime"
import ChatBox from "../ChatBox"
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import MButton from '@material-ui/core/Button'
import withStyles from "@material-ui/core/styles/withStyles"
import BorderColorIcon from "@material-ui/icons/BorderColorOutlined"
import AutorenewIcon from '@material-ui/icons/Autorenew'
import ChatIcon from '@material-ui/icons/Chat'
import { orange } from '@material-ui/core/colors'
import { L } from "../../utils/lang"
function HAStep(props) {
  const Button = withStyles((() => ({
    root: {
      width: '5vw',
    }
  })))(MButton)

  const [ shown, setShown ] = useState(false)
  const [ showChatBox, setShowChatBox ] = useState(false)
  const [ reason, setReason ] = useState('')
  const [ taskId, setTaskId ] = useState('')
  const [ showDisabled, setShowDisabled ] = useState(false)
  const handleDetail = (event, row) => {
    setReason(row.reason)
    setShown(true)
  }
  const handleChatBox = (event, row) => {
    setTaskId(row.taskId)
    if (row.endDate) {
      setShowDisabled(true)
    } else {
      setShowDisabled(false)
    }
    setShowChatBox(true)
  }
  const display = (row) => {
    if (row.taskId) {
      if (row.userName || row.groupName) {
        return true
      }
    }
    return false
  }

  const actionList = [
    { label: L('Reject Reason'), icon: <BorderColorIcon />, handleClick: handleDetail },
    { label: 'message', icon: <ChatIcon />, handleClick: handleChatBox, display }]

  const { processInstanceId } = props
  // const processInstanceId = 827520
  const [ steps, setSteps ] = useState([])
  const [ activeStep, setActiveStep ] = useState(0)
  const [ rows, setRows ] = useState([])

  useEffect(() => {
    API.getProcessPoint({ id: processInstanceId }).then(({ data }) => {
      const process = data.data
      console.log(data.data)
      if (process) {
        const pointList = []
        let active = 0
        for (const index in process.showProcessPointList) {
          const point = process.showProcessPointList[index]
          const model = {
            name: point.name,
            status: point.status ? point.status : 'completed'
          }
          pointList.push(model)
          if (point.id === process.processStatus) {
            active = index
          }
        }
        setSteps(pointList)
        setActiveStep(parseInt(active))
        const pointUserList = []
        for (const pointUser of process.processPointUser) {
          const pointRow = {
            taskId: pointUser.taskInstance.taskId,
            assignee: pointUser.assignee,
            userName: pointUser.user ? pointUser.user : null,
            groupName: pointUser.group ? pointUser.group : null,
            name: pointUser.taskInstance.activityName,
            endDate: pointUser.taskInstance.endTime ? formatDateTime(new Date(pointUser.taskInstance.endTime)) : null,
            status: pointUser.status ? null : L('Rejected'),
            reason: pointUser.rejectReason || '',
          }
          pointUserList.push(pointRow)
        }
        setRows(pointUserList)
      }
    })
  }, [ processInstanceId ])

  // const steps = [ 'Select master blaster campaign settings', 'Create an ad group', 'Create an ad' ]

  // 表头字段列表
  const headCells = [
    { id: 'name', alignment: 'center', label: L('Name') },
    { id: 'assignee', alignment: 'center', label: L('Assignee') },
    { id: 'userName', alignment: 'center', label: L('User') },
    { id: 'groupName', alignment: 'center', label: L('Group') },
    { id: 'status', alignment: 'center', label: L('Status') },
    { id: 'endDate', alignment: 'center', label: L('End Date') },
    { id: 'action', alignment: 'right', label: L('Action') }
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'name', align: 'center' },
    { field: 'assignee', align: 'center' },
    { field: 'userName', align: 'center' },
    { field: 'groupName', align: 'center' },
    { field: 'status', align: 'center' },
    { field: 'endDate', align: 'center' },
  ]

  return (
    <React.Fragment>
      <Paper style={{ justifyItems: 'center' }}>
        <Stepper style={{ width: '80%' }} activeStep={activeStep} alternativeLabel>
          {steps.map((label) => {
            let labelProps = {}
            if (label.status === 'processing') {
              labelProps = {
                icon: <AutorenewIcon style={{ color: orange[500] }}/>
              }
            }
            if (label.status === 'fail') {
              labelProps = {
                error: true
              }
            }
            return (
              <Step key={label.name}>
                <StepLabel {...labelProps}>{label.name}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <CommonTable
          rows={rows}
          tableName={L('History List')}
          hideCheckBox={true}
          hideUpdate={true}
          hideDetail={true}
          headCells={headCells}
          fieldList={fieldList}
          hideCreate={true}
          actionList={actionList}
        />
      </Paper>
      <ChatBox
        open={showChatBox}
        onClose={() => { setShowChatBox(false) }}
        disabled={showDisabled}
        taskId={taskId}
      />
      <Dialog
        open={shown}
        onClose={() => { setShown(false) }}
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="form-dialog-title">{L('Reject Reason')}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ wordBreak: 'break-word' }}>
            {reason}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            fullwidth
            variant="contained"
            onClick={() => { setShown(false) }}
            style={{ marginRight: '2ch' }} >{L('Close')}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment >
  )
}
export default HAStep
