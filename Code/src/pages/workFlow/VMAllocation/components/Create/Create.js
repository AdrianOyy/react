import React, { useEffect, useState } from "react"
import ComplexForm from "../../../../../components/ComplexForm"
// import DialogForm from "../../../../../components/DialogForm"
import Api from "../../../../../api/workFlow"
import vmApi from  "../../../../../api/vmLocation"
import { useParams, useHistory } from "react-router-dom"
import deepClone from "../../../../../utils/deepClone"
import getUser from  "../../../../../utils/user"
import dayjs from "dayjs"

const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
}

function Create() {
  const { id } = useParams()
  const history = useHistory()
  const [ formFieldList, setFormFieldList ] = useState([])
  // const [ dialogFormList, setDialogFormList ] = useState([])
  // const [ open, setOpen ] = useState(false)
  // const [ rows, setRows ] = useState([
  //   {
  //     id: 1, code: 'k1', name: 'r1', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()), temacnt: 'display',
  //   },
  //   {
  //     id: 2, code: 'row2', name: 'r2', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()), temacnt: 'display'
  //   }
  // ])
  useEffect(() => {
    Api.getStartFormJson(id).then(({ data }) => {
      const dist = data.data
      const form = []
      for (let i = 0; i < dist.length; i++) {
        const row = {
          id: dist[i].id, label: dist[i].columnKey, type: casttype(dist[i].type), readOnly: dist[i].isWritable === "FALSE", disabled: false, value: '',
        }
        form.push(row)
      }
      setFormFieldList(form)
    })
    // const itemList = [
    //   {
    //     id: 1,
    //     value: 'test1'
    //   },
    //   {
    //     id: 2,
    //     value: 'test2'
    //   }
    // ]
    //
    // const test = [
    //   {
    //     id: 'code', label: 'Code', type: 'text', readOnly: false, value: '',
    //   },
    //   {
    //     id: 'name', label: 'Name', type: 'text', required: true, readOnly: false,
    //     value: ''
    //   },
    //   {
    //     id: 'createdAt', label: 'Created At', type: 'date',
    //     readOnly: false, value: ''
    //   },
    //   {
    //     id: 'updatedAt', label: 'Updated At', type: 'date',
    //     readOnly: false, value: ''
    //   },
    //   {
    //     id: 'temacnt', label: 'temacnt', type: 'Select',
    //     readOnly: false, value: null, itemList, labelField: 'value', valueField: 'id'
    //   },
    // ]
    // setFormFieldList(test)
    // setDialogFormList(test)
  }, [ id ])

  const casttype = (type) => {
    let display = "text"
    switch (type) {
      case "string" :
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
    console.log(e)
    const { value } = e.target
    const values = deepClone(formFieldList)
    for (let i = 0; i < values.length; i++) {
      if (values[i].id === id) {
        if (values[i].type === 'date') {
          values[i].value = formatDateTime(value)
        } else {
          values[i].value = value
        }
      }
    }
    setFormFieldList(values)
  }

  // const onDialogFieldChange = (e, id) => {
  //   const { value } = e.target
  //   const values = deepClone(dialogFormList)
  //   console.log(values)
  //   for (let i = 0; i < values.length; i++) {
  //     if (values[i].id === id) {
  //       if (values[i].type === 'date') {
  //         values[i].value = formatDateTime(value)
  //       } else {
  //         values[i].value = value
  //       }
  //     }
  //   }
  //   console.log(values)
  //   setDialogFormList(values)
  // }

  // const handleClose = () => {
  //   setOpen(false)
  // }
  //
  // const customCreate = () => {
  //   setOpen(true)
  // }
  //
  // const handleSaveClick = () => {
  //   setOpen(false)
  //   const form = {
  //     id: dialogFormList.length + 1
  //   }
  //   console.log(dialogFormList)
  //   for (let i = 0; i < dialogFormList.length; i++) {
  //     form[dialogFormList[i].id] = dialogFormList[i].value
  //   }
  //   const values = deepClone(rows)
  //   values.push(form)
  //   console.log(values)
  //   setRows(values)
  // }

  const formProp = {
    type: 'form',
    title: 'Test Form',
    titleLevel: 3,
    formFieldList,
    onFormFieldChange
  }
  const tableProp = {
    // type: 'table',
    // headCells: [
    //   { id: 'code', alignment: 'center', label: 'Code' },
    //   { id: 'name', alignment: 'center', label: 'Name' },
    //   { id: 'createdAt', alignment: 'center', label: 'Created At' },
    //   { id: 'updatedAt', alignment: 'center', label: 'Updated At' },
    //   { id: 'temacnt', alignment: 'center', label: 'temacnt' },
    //   // { id: 'action', alignment: 'right', label: 'Actions' },
    // ],
    // fieldList: [
    //   { field: 'code', align: 'center' },
    //   { field: 'name', align: 'center' },
    //   { field: 'createdAt', align: 'center' },
    //   { field: 'updatedAt', align: 'center' },
    //   { field: 'temacnt', align: 'center' }
    // ],
    // // handleDelete,
    // customCreate,
    // rows,
  }

  const handleSubmitClick = () => {
    const form = {
      processDefinitionId: id,
      startUser: getUser().id.toString()
    }
    for (let i = 0; i < formFieldList.length; i++) {
      form[formFieldList[i].id] = formFieldList[i].value
    }
    vmApi.create(form).then(() => {
      history.push({ pathname: `/workflow/vm` })
    })
  }

  const handleClick = (_, id) => {
    alert(id)
  }

  const buttonList = [
    { id: 'check', label: 'Check', color: 'primary', onClick: handleClick, disabled: false },
    { id: 'submit', label: 'Submit', color: 'secondary', onClick: handleSubmitClick, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClick, disabled: false },
  ]

  // const dialogButtonList = [
  //   { id: 'save', label: 'Save', color: 'primary', onClick: handleSaveClick, disabled: false },
  //   { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClose, disabled: false },
  // ]
  return (
    <React.Fragment>
      <ComplexForm
        title={'Test'}
        titleLevel={1}
        moduleList={[ formProp, tableProp ]}
        buttonList={buttonList}
      />
      {/* <DialogForm*/}
      {/*  title={'text'}*/}
      {/*  handleClose={handleClose}*/}
      {/*  open={open}*/}
      {/*  titleLevel={1}*/}
      {/*  formFieldList = {dialogFormList}*/}
      {/*  onFormFieldChange = {onDialogFieldChange}*/}
      {/*  buttonList={dialogButtonList}*/}
      {/* />*/}
    </React.Fragment>
  )
}
export default Create
