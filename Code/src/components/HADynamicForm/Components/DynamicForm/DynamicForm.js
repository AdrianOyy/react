import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography } from "@material-ui/core"
import { switchComponent } from "../../utils"
import ChildTable from "../ChildTable"
import { DynamicContext } from "../../HADynamicForm"
import Loading from "../../../Loading"

export default function DynamicForm() {
  const { logic, style } = useContext(DynamicContext)

  const [ initData, setInitData ] = useState({
    parentInitData: undefined,
    childInitDetail: undefined,
  })

  useEffect(() => {
    Loading.show()
    logic && logic.getInitData()
      .then((data) => {
        const { parentInitData, childInitData, callback } = data
        const pInitData = parentInitData ? parentInitData : new Map()
        logic.parentData = pInitData
        const parentInitDetail = logic.getParentInitDetail(pInitData)
        logic.childrenDataList = childInitData ? childInitData : []
        setInitData({
          parentInitDetail,
          childInitDetail: childInitData ? childInitData : [],
        })
        callback && callback()
        Loading.hide()
      })
      .catch(e => {
        console.log(e)
        Loading.hide()
      })
    if (logic) {
      console.log('logic=========================logic')
      console.log(logic)
      console.log('logic=========================logic')
    }
  }, [ logic ])

  const useStyles = makeStyles(style ? style : {})
  const classes = useStyles()

  const history = useHistory()

  const getComponent = useCallback((el, i) => switchComponent(el, i, logic, style, true), [ logic, style ])

  console.log(`%c${'child in'}`, 'background-color: black; color: red; font-size: 30px;')

  return (
    <Paper className={classes.container} id={'dynamic_form_container'}>
      <Typography variant='h4' id="tableTitle" className={classes.parentTitle}>
        { logic && logic.getParentTitle() }
      </Typography>
      <div className={classes.parent} id={'dynamic_form_parent'}>
        <div className={classes.parentRawData} id={'dynamic_form_parent_raw_data'}>
          {
            initData.parentInitDetail && initData.parentInitDetail.map((el, i) => (getComponent(el, i)))
          }
        </div>
      </div>
      {
        logic && logic.childFormDetail && logic.childFormDetail.length ? (
          <div className={classes.child} id={'dynamic_form_child'}>
            <ChildTable />
          </div>
        ) : null
      }
      <div className={classes.actions} id={'dynamic_form_actions'}>
        {
          logic && logic.getActions(history)
        }
      </div>
    </Paper>
  )
}
