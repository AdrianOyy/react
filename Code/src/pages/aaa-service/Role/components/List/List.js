import React, { useEffect, useState } from 'react'

import {
  Grid
} from "@material-ui/core"

import { CommonTable, SearchBar, TablePagination, HAPaper } from '../../../../../components'
import API from "../../../../../api/role"
import { L } from '../../../../../utils/lang'
import formatDateTime from "../../../../../utils/formatDateTime"
const tableName = L('List')


function List(props) {
  const { path } = props

  const [ label, setLabel ] = useState('')
  const [ value, setValue ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdateAt ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)


  useEffect(() => {
    API.list({ ...query, limit: rowsPerPage, page: page + 1 })
      .then(response => {
        setTotal(response.data.data.count)
        handleData(response.data.data.rows)
      })
  }, [ page, rowsPerPage, query ])

  const handleData = (rawDataList) => {
    const rows = []
    rawDataList.forEach((el) => {
      const rowModel = {
        id: el.id,
        label: el.label,
        value: el.value,
        createdAt: formatDateTime(el.createdAt),
        updatedAt: formatDateTime(el.updatedAt),
      }
      rows.push(rowModel)
    })
    setRows(rows)
  }

  // 表头字段列表
  const headCells = [
    { id: 'label', alignment: 'left', label: L('Tenant\'s Group') },
    { id: 'value', alignment: 'left', label: L('Right') },
    { id: 'createdAt', alignment: 'left', label: L('Created At') },
    { id: 'updatedAt', alignment: 'left', label: L('Updated At') },
    { id: 'action', alignment: 'center', label: L('Actions') },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'label', align: 'left' },
    { field: 'value', align: 'left' },
    { field: 'createdAt', align: 'left' },
    { field: 'updatedAt', align: 'left' }
  ]

  const searchBarFieldList = [
    { id: 'label', label: L('Tenant\'s Group'), type: 'text', disabled: false, readOnly: false, value: label },
    { id: 'value', label: L('Right'), type: 'text', disabled: false, value, isSelector: true,
      itemList: [
        { name: L("Read Only"), id: "Read Only" },
        { name: L("Read & Write"), id: "Read & Write" },
      ],
      labelField: 'name',
      valueField: 'id'
    },
    { id: 'createdAt', label: L('Created At'), type: 'dateRange', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: L('Updated At'), type: 'dateRange', disabled: false, readOnly: false, value: updatedAt },
  ]

  const handleClear = () => {
    setLabel('')
    setValue('')
    setCreatedAt('')
    setUpdateAt('')
    setQuery({
      label: '',
      value: '',
      createdAt: '',
      updatedAt: '',
    })
  }

  const handleSearch = () => {
    setQuery({
      label,
      value,
      createdAt,
      updatedAt,
    })
  }

  const handleFieldChange = (e, id) => {
    const { value } = e.target
    switch (id) {
      case "label":
        setLabel(value)
        break
      case "value":
        setValue(value)
        break
      case "createdAt":
        setCreatedAt(value)
        break
      case "updatedAt":
        setUpdateAt(value)
        break
      default:
        break
    }
  }


  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <SearchBar
            onSearchFieldChange={handleFieldChange}
            onSearchButton={handleSearch}
            onClearButton={handleClear}
            fieldList = {searchBarFieldList}
          />
          <HAPaper>
            <CommonTable
              rows={rows}
              tableName={tableName}
              deleteAPI={API.deleteMany}
              handleSearch={handleSearch}
              path={path}
              headCells={headCells}
              fieldList={fieldList}
            />
            <TablePagination
              rowsPerPageOptions={[ 10, 50, 100 ]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </HAPaper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List
