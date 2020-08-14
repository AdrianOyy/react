import React, { useState } from "react"
import dayjs from "dayjs"
import ComplexForm from "../../../components/ComplexForm"

const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:mm')
}

export default function Test() {
  const [ rows, setRows ] = useState([
    {
      id: 1, name: 'row1', code: 'r1', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()),
    },
    {
      id: 2, name: 'row2', code: 'r2', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()),
    }
  ])
  const handleDelete = (_, idList) => {
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < idList.length; j++) {
        if (rows[i].id === idList[j]) {
          // const list = rows
          // list.splice(i, 1)
          let list = [
            {
              id: 2, name: 'row2', code: 'r2', createdAt: formatDateTime(new Date()), updatedAt: formatDateTime(new Date()),
            }]
          setRows(list)
          break
        }
      }
    }
    console.log(rows)
  }

  const formProp = {
    type: 'form',
    title: 'Test Form',
    titleLevel: 3,
    formFieldList: [
      {
        id: 'code', label: 'Code', type: 'text', readOnly: true, disabled: true, value: 'code',
      },
      {
        id: 'name', label: 'Name', type: 'text', required: true, readOnly: false,
        value: 'name'
      },
      {
        id: 'createdAt', label: 'Created At', type: 'text', disabled: true,
        readOnly: true, value: formatDateTime(new Date())
      },
      {
        id: 'updatedAt', label: 'Updated At', type: 'text', disabled: true,
        readOnly: true, value: formatDateTime(new Date())
      },
    ]
  }
  const tableProp = {
    type: 'table',
    headCells: [
      { id: 'code', alignment: 'center', label: 'Code' },
      { id: 'name', alignment: 'center', label: 'Name' },
      { id: 'createdAt', alignment: 'center', label: 'Created At' },
      { id: 'updatedAt', alignment: 'center', label: 'Updated At' },
      { id: 'action', alignment: 'right', label: 'Actions' },
    ],
    fieldList: [
      { field: 'code', align: 'center' },
      { field: 'name', align: 'center' },
      { field: 'createdAt', align: 'center' },
      { field: 'updatedAt', align: 'center' }
    ],
    handleDelete,
  }

  const handleClick = (_, id) => {
    alert(id)
  }

  const buttonList = [
    { id: 'check', label: 'Check', color: 'primary', onClick: handleClick, disabled: false },
    { id: 'submit', label: 'Submit', color: 'secondary', onClick: handleClick, disabled: false },
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
