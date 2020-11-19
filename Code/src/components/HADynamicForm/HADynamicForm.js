import React, { useEffect, useState, createContext } from 'react'
import Api from "../../api/HADynamicForm"
// import { getQueryString } from "../../utils/url"
import DynamicForm from "./Components/DynamicForm/DynamicForm"
import getStyle from "../../utils/dynamicForm/style"
import getLogic from "../../utils/dynamicForm/logic"
import Loading from "../Loading"

export const DynamicContext = createContext({})

export default function HADynamicForm(props) {
  const {
    deploymentId
  } = props
  const [ dynamic, setDynamic ] = useState({})
  useEffect(() => {
    Loading.show()
    Api.getDynamicForm({ deploymentId })
      .then(({ data }) => {
        let detail = {}
        if (data.data) {
          detail = data.data
        }
        const { workflowName } = data.data
        const style = getStyle(workflowName, { ...props })
        let logic
        return getLogic(workflowName, {
          deploymentId,
          ...props,
          ...detail,
          childHeaderLength: 5,
        }).then((data) => {
          logic = data
          setDynamic({
            initProps: props,
            logic,
            style
          })
        })
      })
      .finally(() => {
        Loading.hide()
      })
      .catch((e) => {
        console.log(e)
        Loading.hide()
      })
    // eslint-disable-next-line
  }, [])

  return (
    <DynamicContext.Provider value={{ ...dynamic }} >
      <DynamicForm />
    </DynamicContext.Provider>
  )
}
