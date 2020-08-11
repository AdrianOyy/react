import React, { useEffect, useState } from 'react'

import {
  Grid,
  TablePagination,
  Paper as MuiPaper,
} from "@material-ui/core"

import { CommonTable, SearchBar } from '../../../../../components'
import API from "../../../../../api/role"
import styled from "styled-components"
import { spacing } from "@material-ui/system"
import dayjs from "dayjs"
const Paper = styled(MuiPaper)(spacing)
const formatDateTime = (str) => {
  return dayjs(new Date(str)).format('YYYY-MM-DD HH:MM')
}

const tableName = 'Role List'

function List(props) {
  const { onMount, path } = props

  const [ label, setLabel ] = useState('')
  const [ value, setValue ] = useState('')
  const [ createdAt, setCreatedAt ] = useState('')
  const [ updatedAt, setUpdateAt ] = useState('')
  const [ query, setQuery ] = useState({})
  const [ rows, setRows ] = useState([])
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)
  const [ total, setTotal ] = useState(0)

  // 用于更新面包屑
  useEffect(() => {
    onMount('list')
    // eslint-disable-next-line
  }, [])

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
    { id: 'label', alignment: 'center', label: 'Label' },
    { id: 'value', alignment: 'center', label: 'Value' },
    { id: 'createdAt', alignment: 'center', label: 'Created At' },
    { id: 'updatedAt', alignment: 'center', label: 'Updated At' },
    { id: 'action', alignment: 'right', label: 'Actions' },
  ]

  // 每行显示的字段
  const fieldList = [
    { field: 'label', align: 'center' },
    { field: 'value', align: 'center' },
    { field: 'createdAt', align: 'center' },
    { field: 'updatedAt', align: 'center' }
  ]

  const searchBarFieldList = [
    { id: 'label', label: 'Label', type: 'text', disabled: false, readOnly: false, value: label },
    { id: 'value', label: 'Value', type: 'text', disabled: false, readOnly: false, value },
    { id: 'createdAt', label: 'Created At', type: 'date', disabled: false, readOnly: false, value: createdAt },
    { id: 'updatedAt', label: 'Updated At', type: 'date', disabled: false, readOnly: false, value: updatedAt },
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
          <Paper>
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
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default List