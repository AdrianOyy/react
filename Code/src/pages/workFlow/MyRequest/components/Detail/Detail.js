import React, { useEffect, useState } from "react"
import ComplexForm from "../../../../../components/ComplexForm"
import Api from "../../../../../api/workFlow"
import { useLocation } from "react-router-dom"
// import { cloneDeep } from "lodash"

// const formatDateTime = (str) => {
//   return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
// }

function Detail() {
  // const [ rows, setRows ] = useState([
  //   {
  //     id: 1, name: 'row1', code: 'r1', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()),
  //   },
  //   {
  //     id: 2, name: 'row2', code: 'r2', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()),
  //   }
  // ])
  // const { id } = useParams()
  const { procDefId } = useLocation().state
  console.log(procDefId)
  const [ formFieldList, setFormFieldList ] = useState([])

  useEffect(() => {
    Api.getStartFormJson(procDefId).then(({ data }) => {
      const dist = data.data
      const form = []
      for (let i = 0; i < dist.length; i++) {
        const row = {
          id: dist[i].id, label: dist[i].columnKey, type: caseType(dist[i].type), readOnly: true, disabled: false, value: ''
        }
        form.push(row)
      }
      console.log(form)
      setFormFieldList(form)
    })
  }, [ procDefId ])

  const caseType = (type) => {
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

  // const handleDelete = (_, idList) => {
  //   let dist = cloneDeep(rows);
  //   console.log(dist)
  //   for (let i = 0; i < dist.length; i++) {
  //     for (let j = 0; j < idList.length; j++) {
  //       if (rows[i].id === idList[j]) {
  //         dist.splice(i, 1)
  //         console.log(dist)
  //         const a = Object.assign(dist);
  //         console.log(a)
  //         console.log(rows)
  //         setRows(dist)
  //         // let list = [
  //         //   {
  //         //     id: 2, name: 'row2', code: 'r2', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()),
  //         //   }]
  //         // setRows(rows)
  //         break
  //       }
  //     }
  //   }
  // }

  const formProp = {
    type: 'form',
    title: 'Test Form',
    titleLevel: 3,
    formFieldList,
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

  const handleClick = (_, id) => {
    alert(id)
  }

  const buttonList = [
    // { id: 'check', label: 'Check', color: 'primary', onClick: handleClick, disabled: false },
    // { id: 'submit', label: 'Submit', color: 'secondary', onClick: handleClick, disabled: false },
    { id: 'cancel', label: 'Cancel', color: 'default', onClick: handleClick, disabled: false },
  ]
  return (
    <React.Fragment>
      <ComplexForm
        title={'Test'}
        titleLevel={1}
        moduleList={[ formProp, tableProp ]}
        buttonList={buttonList}
      />
    </React.Fragment>
  )
}
export default Detail
