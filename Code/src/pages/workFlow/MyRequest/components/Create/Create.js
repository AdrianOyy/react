import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import ComplexForm from "../../../../../components/ComplexForm"
import Api from "../../../../../api/workFlow"
import vmApi from "../../../../../api/vmLocation"
import { useParams } from "react-router-dom"
// import { cloneDeep } from "lodash"

// const formatDateTime = (str) => {
//   return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
// }
import { L } from '../../../../../utils/lang'

function Create() {
  // const [ rows, setRows ] = useState([
  //   {
  //     id: 1, name: 'row1', code: 'r1', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()),
  //   },
  //   {
  //     id: 2, name: 'row2', code: 'r2', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()),
  //   }
  // ])
  const { id } = useParams()
  const [ formFieldList, setFormFieldList ] = useState([])
  const [ valueFieldList, setValueFieldList ] = useState([])
  useEffect(() => {
    Api.getStartFormJson(id).then(({ data }) => {
      const dist = data.data
      const form = []
      for (let i = 0; i < dist.length; i++) {
        const row = {
          id: dist[i].id, label: dist[i].columnKey, type: caseType(dist[i].type), readOnly: dist[i].isWritable === "FALSE", disabled: false, value: '',
        }
        form.push(row)
      }
      console.log(form)
      setFormFieldList(form)
      setValueFieldList(form)
    })
  }, [ id ])

  const caseType = (type) => {
    let display = "text"
    switch (type) {
      case "string":
        display = "text"
        break
      case "long":
        display = "number"
        break
      case "date":
        display = "date"
        break
      default:
        break
    }
    return display
  }

  const onFormFieldChange = (e, id) => {
    const { value } = e.target
    console.log(e)
    console.log(id)
    console.log(valueFieldList)
    for (let i = 0; i < valueFieldList.length; i++) {
      if (valueFieldList[i].id === id) {
        if (valueFieldList[i].type === "date") {
          console.log(dayjs(value).format('YYYY/MM/DD'))
          valueFieldList[i].value = dayjs(value).format('YYYY/MM/DD')
        } else {
          valueFieldList[i].value = value
        }
      }
    }
    setValueFieldList(valueFieldList)
    setFormFieldList(valueFieldList)
  }

  const formProp = {
    type: 'form',
    title: 'Test Form',
    titleLevel: 3,
    formFieldList,
    onFormFieldChange
    // formFieldList: [
    //   {
    //     id: 'code', label: 'Code', type: 'text', readOnly: true, disabled: true, value: 'code',
    //   },
    //   {
    //     id: 'name', label: 'Name', type: 'text', required: true, readOnly: false,
    //     value: 'name'
    //   },
    //   {
    //     id: 'createdAt', label: 'Created At', type: 'text', disabled: true,
    //     readOnly: true, value: formatDateTime(new Date())
    //   },
    //   {
    //     id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true,
    //     readOnly: true, value: formatDateTime(new Date())
    //   },
    // ]
  }
  const tableProp = {
    // type: 'table',
    // headCells: [
    //   { id: 'code', alignment: 'center', label: 'Code' },
    //   { id: 'name', alignment: 'center', label: 'Name' },
    //   { id: 'createdAt', alignment: 'center', label: 'Created At' },
    //   { id: 'updatedAt', alignment: 'center', label: 'Updated At' },
    //   { id: 'action', alignment: 'right', label: 'Actions' },
    // ],
    // fieldList: [
    //   { field: 'code', align: 'center' },
    //   { field: 'name', align: 'center' },
    //   { field: 'createdAt', align: 'center' },
    //   { field: 'updatedAt', align: 'center' }
    // ],
    // handleDelete,
    // rows,
  }

  const handleSubmitClick = () => {
    const form = {}
    for (let i = 0; i < valueFieldList.length; i++) {
      form[valueFieldList[i].id] = valueFieldList[i].value
    }
    vmApi.create(form).then(({ data }) => {
      console.log(data)
      Api.startProcess(data).then(() => {})
    })
  }

  const handleClick = (_, id) => {
    alert(id)
  }

  const buttonList = [
    { id: 'check', label: L('Check'), color: 'primary', onClick: handleClick, disabled: false },
    { id: 'submit', label: L('Submit'), color: 'secondary', onClick: handleSubmitClick, disabled: false },
    { id: 'cancel', label: L('Cancel'), color: 'default', onClick: handleClick, disabled: false },
  ]
  return (
    <React.Fragment>
      <ComplexForm
        title={L('Test')}
        titleLevel={1}
        moduleList={[ formProp, tableProp ]}
        buttonList={buttonList}
      />
    </React.Fragment>
  )
}
export default Create
