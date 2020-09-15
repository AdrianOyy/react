import React, { useEffect, useState } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import { CommonTable } from "../../components"
import API from "../../api/workFlow"
import Paper from "@material-ui/core/Paper"
import formatDateTime from "../../utils/formatDateTime"

function HAStep(props) {
  const { processInstanceId } = props
  // const processInstanceId = 827520
  const [ steps, setSteps ] = useState([])
  const [ activeStep, setActiveStep ] = useState(0)
  const [ rows, setRows ] = useState([])

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
        for  (const pointUser of process.processPointUser) {
          const pointRow = {
            groupName: pointUser.group.name,
            name: pointUser.taskInstance.name,
            startDate: formatDateTime(pointUser.taskInstance.startTime),
            endDate: pointUser.taskInstance.endTime ? formatDateTime(pointUser.taskInstance.endTime) : null,
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
    { id: 'groupName', alignment: 'center', label: 'Group' },
    { id: 'name', alignment: 'center', label: 'Name' },
    { id: 'startDate', alignment: 'center', label: 'Start Date' },
    { id: 'endDate', alignment: 'center', label: 'End Date' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'groupName', align: 'center' },
    { field: 'name', align: 'center' },
    { field: 'startDate', align: 'center' },
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
        />
      </Paper>
    </React.Fragment>
  )
}
export default HAStep
