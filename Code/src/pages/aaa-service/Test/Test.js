import React, { useEffect, useState } from "react"
import CommonForm from '../../../components/CommonForm'
import dayjs from "dayjs"
import FormTable from "../../../components/FormTable"

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
    formTitle: 'Test Form',
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
  return (
    <React.Fragment>
      <CommonForm
        {...formProp}
      />
      <FormTable
        rows={rows}
        {...tableProp}
      />
    </React.Fragment>
  )
}
